const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const {
  generateActiveToken,
  generateRefreshToken,
  generateAccessToken,
  generateAuthenticateToken,
} = require("../helpers/generateToken");
const authService = require("../services/authService");
const userService = require("../services/userService");
const checkRequireData = require("../helpers/checkRequireDataRequest");
const { forgotPassword } = require("../helpers/sendMail");
const fetch = require("node-fetch");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { CLIENT_URL } = process.env;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const bcrypt = require("bcrypt");
const { users } = require("../models");
const ldapjs = require("ldapjs");

const ldapOptions = {
  url: process.env.AD_DOMAIN,
  // url: "ldap://10.235.102.228",
  connectionTimeOut: 30000,
  timeout: 5000,
  reconnect: false,
};

const setRefreshToken = async (res, refreshToken) => {
  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 60 * 1000, // 30m
    path: "/",
    // secure: true,
    // sameSite: "Lax",
  });
};

let refreshTokenStore = [];
const loginAD = (username, password) => {
  return new Promise((resolve, reject) => {
    const ldapClient = ldapjs.createClient(ldapOptions);
    ldapClient.bind(username, password, (error) => {
      if (error) {
        console.log(error);
        resolve(false);
      } else {
        resolve(true);
      }
      ldapClient.destroy();
      console.log("ldap cliend disconnected");
    });
  });
};
const authController = {
  registerUser: async (req, res, next) => {
    try {
      const {
        fullname,
        username,
        email,
        password,
        birthday,
        address,
        phone,
        avatar,
        gender,
        role,
      } = req.body;

      const isExist = await authService.checkUserExist(
        username,
        email,
        phone
      );

      if (isExist) {
        throw createError.Conflict("This user already exists.");
      }
      const passwordHash = await authService.hashPassword(password);

      const { status, message, data } = await authService.createUser({
        fullname,
        username,
        email,
        birthday,
        address,
        phone,
        avatar,
        gender,
        role,
        password: passwordHash,
      });

      return res.status(status).json(createSucess(status, message, data));
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      let user;
      //connect AD to login
      // if (
      //   process.env.LOGIN_BY_AD == "true" &&
      //   username != process.env.SA_USERNAME
      // ) {
      //   let usernameToCheck = username.split("@");
      //   usernameToCheck = usernameToCheck[0];
      //   const result = await loginAD(username, password);
      //   if (!result) {
      //     res
      //       .status(404)
      //       .json(
      //         createSucess(
      //           404,
      //           "Login failed. Please check username, password and try again",
      //           {}
      //         )
      //       );
      //     return;
      //   }
      // } else {
        user = await authService.checkUserExist(username);
        // if (!user) throw createError.NotFound("Người dùng không tồn tại.")
        if (!user) {
          res
            .status(400)
            .json(createSucess(400, "Người dùng không tồn tại.", {}));
          return;
        }
        // console.log("User: ", user);
        //login by user database
        const isMatch = await authService.checkMatchPassword(
          password,
          user.password
        );
        if (!isMatch) {
          throw createError.BadRequest("Mật khẩu không chính xác.");
        }
        // check user status
        if (user?.User_Status && !user?.User_Status?.IS_LOGIN) {
          throw createError.BadRequest(user?.User_Status?.DESC);
        }
      // }
      // if (
      //   process.env.LOGIN_BY_AD == "true" &&
      //   username != process.env.SA_USERNAME
      // ) {
      //   let usernameToCheck = username.split("@");
      //   usernameToCheck = usernameToCheck[0];
      //   user = await authService.checkUserExist(usernameToCheck);
      //   if (!user) {
      //     res
      //       .status(400)
      //       .json(
      //         createSucess(400, "Người dùng không tồn tại in WNS system.", {
      //           username: username,
      //         })
      //       );
      //     return;
      //   }
      // }

      // let storedRefreshToken = refreshTokenStore.find(x => x.userId == user.id)

      // if (storedRefreshToken == undefined) {
      //   refreshTokenStore.push({
      //     userId: user.id,
      //     refreshToken: refresh_token
      //   })
      // } else {
      //   refreshTokenStore[refreshTokenStore.findIndex(x => x.userId == user.id)].refreshToken = refresh_token;
      // }
      const access_token = generateAccessToken({ id: user.id });
      const refresh_token = generateRefreshToken({ id: user.id });
      user.password = undefined;
      await setRefreshToken(res, refresh_token);

      res.status(200).json(
        createSucess(200, "Login successfully !", {
          user,
          access_token,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      res.clearCookie("refreshtoken", { path: `/` });
      res.clearCookie("refreshtoken", { path: `/login` });
      return res.status(200).json(createSucess(200, "Logged out!"));
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const userId = req.userId;
      // let storedRefreshToken = refreshTokenStore.find(x => x.userId == userId)

      // if (storedRefreshToken == undefined) throw createError.BadRequest("Please login now!")
      const user = await userService.getUser(userId);
      if (!user) throw createError.BadRequest("Người dùng không tồn tại.");
      const access_token = generateAccessToken({ id: user.id });
      const refresh_token = generateRefreshToken({ id: user.id });
      await setRefreshToken(res, refresh_token);
      user.password = undefined;

      res.status(200).json(
        createSucess(200, "Get new access_token successfully !", {
          access_token,
          user,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const { FIRST_NAME, LAST_NAME, email, username, phone } =
        req.body;

      // const isValid = checkRequireData(req.body)
      // if (!isValid) throw createError.BadRequest("Invalid Data.")
      const id = req.user.id;
      const updateBy = req.user.id;
      const user = await userService.findUserById(id);

      if (!user) throw createError.NotFound("Người dùng không tồn tại.");

      const { status, message } = await userService.updateUser(
        FIRST_NAME,
        LAST_NAME,
        email,
        username,
        phone,
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  googleLogin: async (req, res, next) => {
    try {
      const { tokenId } = req.body;

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      const { email_verified, email, given_name, family_name, picture } =
        verify.payload;

      const password = email + process.env.GOOGLE_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified)
        return res
          .status(400)
          .json({ message: "Xác thực email không thành công.", status: 400 });

      const user = await users.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Email này đã được sử dụng trong hệ thống.",
            status: 400,
          });

        const refresh_token = generateRefreshToken({ id: user.id });
        const access_token = generateAccessToken({ id: user.id });
        await setRefreshToken(res, refresh_token);

        return res.status(200).json(
          createSucess(200, "Get new access_token successfully !", {
            access_token,
            user,
            oldPassword: password
          })
        );
      } else {
        const user = await users.create({
          fullname: family_name +" "+ given_name,
          username: email,
          role_id: 2,
          email: email,
          avatar: picture,
          password: passwordHash,
        });

        const refresh_token = generateRefreshToken({ id: user.id });
        const access_token = generateAccessToken({ id: user.id });
        await setRefreshToken(res, refresh_token);

        return res.status(200).json(
          createSucess(200, "Get new access_token successfully !", {
            access_token,
            user,
            oldPassword: password
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },
  facebookLogin: async (req, res, next) => {
    try {
      const { accessToken, userID } = req.body;

      const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,first_name,last_name,middle_name,email,picture&access_token=${accessToken}`;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      const {
        email,
        first_name,
        last_name,
        picture: {
          data: { url },
        },
      } = data;

      const password = email + process.env.FACEBOOK_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      const user = await users.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "This email is already used in app.",
            status: 400,
          });

        const refresh_token = generateRefreshToken({ id: user.id });
        const access_token = generateAccessToken({ id: user.id });
        await setRefreshToken(res, refresh_token);

        return res.status(200).json(
          createSucess(200, "Get new access_token successfully !", {
            access_token,
            user,
          })
        );
      } else {
        const user = await users.create({
          FIRST_NAME: last_name,
          LAST_NAME: first_name,
          email: email,
          AVATAR: url,
          password: passwordHash,
        });

        const refresh_token = generateRefreshToken({ id: user.id });
        const access_token = generateAccessToken({ id: user.id });
        await setRefreshToken(res, refresh_token);

        return res.status(200).json(
          createSucess(200, "Get new access_token successfully !", {
            access_token,
            user,
          })
        );
      }
    } catch (err) {
      next(err);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await users.findOne({
        where: {
          email: email,
          is_deleted: false,
        },
      });
      if (!user)
        return res
          .status(404)
          .json(createSucess(404, "Email này không tồn tại."));

      const access_token = generateAccessToken({ id: user.id });
      const url = `${CLIENT_URL}/auth/reset-password/${access_token}`;

      const resp = await forgotPassword(email, url);

      if (resp) {
        res
          .status(200)
          .json(
            createSucess(200, "Gửi lại mật khẩu, vui lòng kiểm tra email của bạn.")
          );
      } else {
        res
          .status(400)
          .json(createSucess(400, "Gửi lại mật khẩu không thành công, hãy thử lại."));
      }
    } catch (err) {
      next(err);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { password } = req.body;
      console.log(req.body);
      const passwordHash = await bcrypt.hash(password, 12);

      await users.update(
        {
          password: passwordHash,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      res.status(200).json(createSucess(200, "Mật khẩu đã được thay đổi thành công!"));
    } catch (err) {
      next(err);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const { password, oldPassword } = req.body;
      const user = await users.findOne({
        where: {
          id: req.user.id,
          is_deleted: false,
        },
      });
      if (!user) throw createError.NotFound("Người dùng không tồn tại.");
      const isMatch = await authService.checkMatchPassword(
        oldPassword,
        user.password
      );

      if (!isMatch) throw createError.BadRequest("Mật khẩu cũ không đúng.");
      const passwordHash = await bcrypt.hash(password, 12);

      await users.update(
        {
          password: passwordHash,
        },
        {
          where: {
            id: req.user.id,
            is_deleted: false,
          },
        }
      );

      res.status(200).json(createSucess(200, "Mật khẩu đã được thay đổi thành công!"));
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
