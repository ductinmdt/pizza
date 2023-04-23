const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const authService = require("../services/authService");
const userService = require("../services/userService");
const { users } = require("../models");
const { sendNewPassword } = require("../helpers/sendMail");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
  try {
    const {
      fullname,
      username,
      email,
      password,
      birthday,
      address,
      phone,
      gender,
      role_id,
    } = req.body;

    let avatar = "default.jpg";

    if (req.file) {
      avatar = req.file.filename;
    }

    const isExist = await authService.checkUserExistWhenCreate(
      username,
      email,
      phone
    );
    if (isExist) {
      await users.destroy({
        where: {
          id: req.userId,
        },
      });
      throw createError.Conflict(isExist);
    }
    const passwordHash = await authService.hashPassword(password);

    const { status, message, element } = await userService.afterCreateUser(
      {
        fullname,
        username,
        email,
        phone,
        password: passwordHash,
        birthday,
        address,
        gender,
        role_id,
        avatar,
      },
      req.userId,
      req.user.id
    );

    return res.status(status).json(createSucess(status, message, element));
  } catch (error) {
    next(error);
  }
};
exports.prevCreateUser = async (req, res, next) => {
  try {
    const { elements } = await userService.createUser(
      {
        fullname: "Ok",
      },
      req.user.id
    );
    req.userId = elements.id;
    next();
  } catch (error) {
    next(error);
  }
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const { status, users } = await userService.getAllUsers();
    res
      .status(status)
      .json(createSucess(status, "Get all users successfully !", users));
  } catch (error) {
    next(error);
  }
};
exports.getOldPwUsers = async (req, res, next) => {
  try {
    const { status, users } = await userService.getOldPwUsers();
    res
      .status(status)
      .json(createSucess(status, "Get all users successfully !", users));
  } catch (error) {
    next(error);
  }
};
exports.getProfile = async (req, res, next) => {
  try {
    const { status, message, elements } = await userService.getProfile(
      req.user.id
    );
    res.status(status).json(createSucess(status, message, elements));
  } catch (error) {
    next(error);
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const { status, message, elements } = await userService.getProfile(
      req.params.id
    );
    res.status(status).json(createSucess(status, message, elements));
  } catch (error) {
    next(error);
  }
};
exports.forgotPassword = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await authService.checkUserExist(username);

    if (!user) throw createError.NotFound("Người dùng không tồn tại!");

    const { status, message } = await userService.forgotPassword(user);

    return res.status(status).json(createSucess(status, message));
  } catch (err) {
    next(err);
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { id } = req.params;
    const passwordHash = await bcrypt.hash(password, 12);
    const { status, message } = await userService.resetPassword(
      id,
      passwordHash
    );

    res.status(status).json(createSucess(status, message));
  } catch (err) {
    next(err);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const user = req.body;
    const { id } = req.params;
    const updateBy = req.user.id;
    const isExist = await userService.findUserById(id);

    if (!isExist) throw createError.NotFound("Người dùng đã tồn tại!");

    if (user.email) {
      const isExistEmail = await users.findOne({
        where: {
          email: user.email,
          is_deleted: false,
        },
      });
      if (isExistEmail && Number(id) !== isExistEmail.id)
        throw createError.NotFound("Email đã tồn tại!");
    }

    if (user.phone) {
      const isExistPhone = await users.findOne({
        where: {
          phone: user.phone,
          is_deleted: false,
        },
      });
      if (isExistPhone && Number(id) !== isExistPhone.id)
        throw createError.NotFound("SĐT đã tồn tại!");
    }

    if (req.file) {
      user.avatar = req.file.filename;
    }
    // user.BOD = "2002/01/10";
    const { status, message } = await userService.updateUser(
      user,
      id,
      updateBy
    );

    res.status(status).json(createSucess(status, message));
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateBy = req.user.id;

    const user = await userService.findUserById(id);

    if (!user) throw createError.NotFound("Người dùng không tồn tại!");

    const { status, message } = await userService.deleteUser(id, updateBy);

    res.status(status).json(createSucess(status, message));
  } catch (error) {
    next(error);
  }
};
exports.assignRoleIdsToUserId = async (req, res, next) => {
  try {
    const { roleIds, userId } = req.body;

    const user = await userService.findUserById(userId);

    if (!user) throw createError.NotFound("Người dùng không tồn tại!");

    const { status, message } = await userService.assignRoleIdsToUserId({
      roleIds,
      user,
    });

    return res.status(status).json(createSucess(status, message));
  } catch (error) {
    next(error);
  }
};

exports.convertPwStringToHashByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.getUser(userId);
    if (!user) throw createError.NotFound("Người dùng không tồn tại!");

    const hashPassword = await authService.hashPassword(user.password);
    const { status } = await userService.resetPassword(user.id, hashPassword);
    return res
      .status(status)
      .json(createSucess(status, "password is successfully converted."));
  } catch (error) {
    next(error);
  }
};

exports.unassignRoleIdsFromUserId = async (req, res, next) => {
  try {
    const { roleIds, userId } = req.body;

    const user = await userService.findUserById(userId);

    if (!user) throw createError.NotFound("Người dùng không tồn tại!");

    const { status, message } = await userService.unassignRoleIdsFromUserId({
      roleIds,
      user,
    });

    return res.status(status).json(createSucess(status, message));
  } catch (error) {
    next(error);
  }
};

exports.getAppsByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    const { status, message, result } = await userService.getAppsByUserId({
      userId,
    });

    return res.status(status).json(createSucess(status, message, result));
  } catch (error) {
    next(error);
  }
};

exports.getPermissionsByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userService.findUserById(userId);

    if (!user) throw createError.NotFound("Người dùng không tồn tại!");
    const { status, message, result } =
      await userService.getPermissionsByUserId({
        user,
      });

    return res.status(status).json(createSucess(status, message, result));
  } catch (error) {
    next(error);
  }
};
exports.resetPasswordUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { id } = req.params;
    const user = await users.findOne({
      where: {
        id,
        is_deleted: false,
      },
    });
    if (!user) throw createError.NotFound("Người dùng không tồn tại!");
    if (!user?.email) {
      throw createError.NotFound("This user has not email to send.");
    }
    const passwordHash = await bcrypt.hash(password, 12);

    const ifUser = {
      fullName: `${user?.FIRST_NAME} ${user?.LAST_NAME}`,
      primaryPhone: `${user?.phone}`,
      secondPhone: `${user?.SECOND_PHONE}`,
      email: `${user?.email}`,
      personalEmail: `${user?.PERSONAL_email}`,
      password,
    };

    await users.update(
      {
        password: passwordHash,
      },
      {
        where: {
          id,
          is_deleted: false,
        },
      }
    );

    sendNewPassword(user?.email, process.env.CLIENT_URL, ifUser);

    res.status(200).json(
      createSucess(200, "Password successfully changed!", {
        ifUser,
      })
    );
  } catch (err) {
    next(err);
  }
};
