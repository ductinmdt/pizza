const { logCreate, logUpdate } = require("../helpers/logQuery");
const {
  roles,
  // categories
} = require("../models");
const createError = require("http-errors");
const URL_FILE = process.env.BASE_URL + "/uploads/files";
const roleService = {
  createRole: async (role, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await roles.findOne({
          where: {
            cd: role?.cd,
            is_deleted: false,
          },
        })
        if (exist) {
          throw createError.NotFound("Mã quyền đã tồn tại")
        }
        await roles.create({ ...role, ...logCreate(createBy) });
        resolve({
          status: 201,
          message: "Tạo quyền mới thành công!",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await roles.findAll({
          where: {
            is_deleted: false,
          },
        });
        resolve({
          status: 200,
          role,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getRole: async (roleId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await roles.findOne({
          where: {
            id: roleId,
            is_deleted: false,
          },
        });
        if (role) {
          resolve({
            status: 200,
            message: "Get role successful!",
            elements: role
          });
        } else {
          reject({
            status: 400,
            message: "Role does not exist!",
            elements: undefined,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateRole: async (
    role,
    roleId,
    updateBy
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if the code is existed or not
        const exist = await roles.findOne({
          where: {
            cd: role?.cd,
            is_deleted: false,
          },
        })
        if (exist && exist.id != roleId) {
          throw createError.NotFound("Mã quyền đã tồn tại")
        }
        const [response] = await roles.update(
          {
            ...role,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: roleId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Quyền không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Cập nhập quyền thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteRole: async (roleId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await roles.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: roleId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Quyền không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Xóa quyền thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findRoleById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        const role = await roles.findOne({
          where: {
            id,
            is_deleted: false,
          },
        });
        resolve(role);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = roleService;
