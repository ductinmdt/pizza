const bcrypt = require("bcrypt");
const { logCreate } = require("../helpers/logQuery");
const { users, roles,} = require("../models");
const URL_IMAGE = process.env.BASE_URL + "/uploads/files";

const authService = {
  checkUserExist: async (username, email, phone) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await users.findOne({
          where: {
            username,
            is_deleted: false,
          },
          include: [
            {
              model: roles,
              required: false,
              // attributes: ["id", "NAME"],
              where: { is_deleted: false },
            },
          ],
        });
        if (!user && email) {
          user = await users.findOne({
            where: {
              email,
              is_deleted: false,
            },
            include: [
              {
                model: roles,
                required: false,
                // attributes: ["id", "NAME"],
                where: { is_deleted: false },
              },
            ],
          });
        }
        if (!user && phone) {
          user = await users.findOne({
            where: {
              phone,
              is_deleted: false,
            },
            include: [
              {
                model: roles,
                required: false,
                // attributes: ["id", "NAME"],
                where: { is_deleted: false },
              },
            ],
          });
        }
        if (!user && !email) {
          user = await users.findOne({
            where: {
              email: username,
              is_deleted: false,
            },
            include: [
              {
                model: roles,
                required: false,
                // attributes: ["id", "NAME"],
                where: { is_deleted: false },
              },
            ],
          });
        }
        if (!user && !phone) {
          user = await users.findOne({
            where: {
              phone: username,
              is_deleted: false,
            },
            include: [
              {
                model: roles,
                required: false,
                // attributes: ["id", "NAME"],
                where: { is_deleted: false },
              },
            ],
          });
        }
        if (user?.avatar && !user?.avatar?.startsWith("http")) {
          user.avatar = `${URL_IMAGE}/${user.avatar}`;
        }
        if (!user) {
          resolve(false);
        } else {
          resolve(user);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  hashPassword: async (password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = 12
        const passwordHash = await bcrypt.hash(password, salt);
        resolve(passwordHash);
      } catch (error) {
        reject(error);
      }
    });
  },
  createUser: async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await users.create(user);
        await users.update(
          { ...logCreate(res.id) },
          {
            where: {
              id: res.id,
            },
          }
        );
        resolve({
          status: 201,
          message: "Đăng ký người dùng mới thành công !",
          data: res,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  checkMatchPassword: async (password, userPassword) => {
    return new Promise(async (resolve, reject) => {
      try {
        const isMatch = await bcrypt.compare(password, userPassword);
        resolve(isMatch);
      } catch (error) {
        reject(error);
      }
    });
  },
  checkUserExistWhenCreate: async (username, email, phone) => {
    return new Promise(async (resolve, reject) => {
      try {
        let message;
        let user = await users.findOne({
          where: {
            username,
            is_deleted: false,
          },
        });
        if (user) {
          message = "Người dùng đã tồn tại.";
        }
        if (!user && email) {
          user = await users.findOne({
            where: {
              email,
              is_deleted: false,
            },
          });
          if (user) {
            message = "Email đã tồn tại.";
          }
        }
        if (!user && phone) {
          user = await users.findOne({
            where: {
              phone,
              is_deleted: false,
            },
          });
          if (user) {
            message = "Số điện thoại đã tồn tại.";
          }
        }
        if (!user && !email) {
          user = await users.findOne({
            where: {
              email: username,
              is_deleted: false,
            },
          });
        }
        if (!user && !phone) {
          user = await users.findOne({
            where: {
              phone: username,
              is_deleted: false,
            },
          });
        }
        if (user?.AVATAR && !user?.AVATAR?.startsWith("http")) {
          user.AVATAR = `${URL_IMAGE}/${user.AVATAR}`;
        }
        if (!user) {
          resolve(false);
        } else {
          resolve(message);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = authService;
