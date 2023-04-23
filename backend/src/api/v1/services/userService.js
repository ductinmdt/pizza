const { generateAccessToken } = require("../helpers/generateToken");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { Op } = require("sequelize");
const {
  users,
  roles
} = require("../models");
const sendMail = require("../helpers/sendMail");
// const roleservice = require("./roleservice");
const createError = require("http-errors");
const {
  removeDuplicatesFromObject,
} = require("../helpers/removeDuplicatesFromObject");
const { array } = require("joi");

const URL_IMAGE = process.env.BASE_URL + "/uploads/files";

const authService = {
  createUser: async (user, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await users.create({ ...user, ...logCreate(createBy) });
        resolve({
          status: 201,
          message: "Create new user successfully !",
          elements: res,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  afterCreateUser: async (user, userId, updatedBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await users.update(
          {
            ...user,
            ...logUpdate(updatedBy),
          },
          {
            where: {
              id: userId,
              is_deleted: false,
            },
          }
        );

        resolve({
          status: 200,
          message: "Tạo người dùng thành công!",
          element: {
            id: userId,
            ...user,
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllUsers: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users.findAll({
          where: { is_deleted: false },
          attributes: { exclude: ["password"] },
          include: {
            model: roles,
            required: false,
            where: { is_deleted: false },
          },
        });
        const newData = [];
        user.forEach((el) => {
          if (el?.avatar && !el.avatar?.startsWith("http")) {
            el.avatar = `${URL_IMAGE}/${el.avatar}`;
          }
          newData.push(el);
        });
        resolve({
          status: 200,
          users: newData,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getOldPwUsers: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await users.findAll({
          where: {
            password: { [Op.notLike]: "$2b$%" },
            is_deleted: false,
          },
          attributes: { exclude: ["password"] },
        });
        const newData = [];
        users.forEach((el) => {
          if (el.avatar && el.avatar.startsWith("http")) {
            el.avatar = `${el.avatar}`;
          } else {
            el.avatar = `${URL_IMAGE}/${el.avatar}`;
          }
          newData.push(el);
        });
        resolve({
          status: 200,
          users: newData,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getProfile: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users.findOne({
          where: {
            id: userId,
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
        if (user?.avatar && !user?.avatar?.startsWith("http")) {
          user.avatar = `${URL_IMAGE}/${user.avatar}`;
        }
        if (user) {
          resolve({
            status: 200,
            message: "Get profile successful!",
            elements: {
              user,
            },
          });
        } else {
          resolve({
            status: 404,
            message: "User does not exist!",
            elements: {
              user: null,
            },
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getUser: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users.findOne({
          where: {
            id: userId,
            is_deleted: false,
          },
          include: {
            model: roles,
            required: false,
            where: { is_deleted: false },
          },
        });
        if (user?.avatar && !user?.avatar?.startsWith("http")) {
          user.avatar = `${URL_IMAGE}/${user.avatar}`;
        }
        if (user) {
          resolve(user);
        } else {
          resolve(undefined);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  forgotPassword: async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const access_token = generateAccessToken({ id: user.id });

        const url = `${CLIENT_URL}/reset_password/${access_token}`;

        if (validateEmail(user.EMAIL)) {
          sendMail(user.EMAIL, url, "Forgot password?");
          resolve({
            status: 200,
            message: "Success! Please check your email.",
          });
        } else {
          resolve({
            status: 400,
            message: "Email không hợp lệ!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  resetPassword: async (userId, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await users.update(
          { password, ...logUpdate(userId) },
          {
            where: {
              id: userId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Người dùng không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Đặt lại mật khẩu thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateUser: async (user, userId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await users.update(
          {
            ...user,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: userId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Người dùng không tồn tại !",
          });
        } else {
          resolve({
            status: 200,
            message: "Cập nhật người dùng thành công !",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findUserById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users.findOne({
          where: {
            id,
            is_deleted: false,
          },
          attributes: {
            exclude: ["password"],
          },
          // include: {
          //   model: roles,
          //   attributes: ["id", "NAME"],
          // },
        });

        // console.log(user)
        if (user) {
          resolve(user);
        } else {
          resolve(undefined);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findUserByUsername: async (username) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users.findOne({
          where: {
            username,
            is_deleted: false,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: Employees,
              // attributes: ["id", "CD"],
              required: false,
              where: { is_deleted: false },
            },
            {
              model: roles,
              required: false,
              attributes: ["id", "NAME"],
              where: { is_deleted: false },
            }]
        });

        // console.log(user)
        if (user) {
          resolve(user);
        } else {
          resolve(undefined);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteUser: async (userId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await users.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: userId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "User doesn't exist !",
          });
        } else {
          resolve({
            status: 200,
            message: "Xóa người dùng thành công !",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  // assignRoleIdsToUserId: async ({ roleIds, user }) => {
  //   return new Promise(async (resolve, reject) => {
  //     roleIds = JSON.parse(roleIds);
  //     try {
  //       let role;
  //       for (let i = 0; i < roleIds.length; i++) {
  //         role = await roleservice.findRoleById(roleIds[i]);
  //         if (!role)
  //           throw createError.NotFound(
  //             `This role does not exist: ${roleIds[i]}`
  //           );
  //       }
  //       let result = await user.addroles(roleIds);
  //       if (result) {
  //         resolve({
  //           status: 201,
  //           message: "Assign roles successfully !",
  //         });
  //       } else {
  //         resolve({
  //           status: 400,
  //           message: "roles are already assigned to user !",
  //         });
  //       }
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // },
  // unassignRoleIdsFromUserId: async ({ roleIds, user }) => {
  //   return new Promise(async (resolve, reject) => {
  //     roleIds = JSON.parse(roleIds);
  //     try {
  //       let role;
  //       for (let i = 0; i < roleIds.length; i++) {
  //         role = await roleservice.findRoleById(roleIds[i]);
  //         if (!role)
  //           throw createError.NotFound(
  //             `This role does not exist: ${roleIds[i]}`
  //           );
  //       }
  //       let result = await user.removeroles(roleIds);
  //       if (result) {
  //         resolve({
  //           status: 201,
  //           message: "Unassign roles successfully !",
  //         });
  //       } else {
  //         resolve({
  //           status: 400,
  //           message: "roles are already unassigned from user !",
  //         });
  //       }
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // },
  // getAppsByUserId: async ({ userId }) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       //get user roles
  //       const user = await authService.findUserById(userId);
  //       // console.log(user)
  //       let roles = user.roles;
  //       // console.log(roles)
  //       //get apps from roles
  //       let apps = [];
  //       let role;
  //       for (let i = 0; i < roles.length; i++) {
  //         role = await roleservice.findRoleById(roles[i].dataValues.id);
  //         // console.log(role.Apps)
  //         apps = apps.concat(role.Apps);
  //       }
  //       // console.log("apps: ", apps)
  //       apps = await removeDuplicatesFromObject(apps, "id");
  //       let defaultModule;
  //       for (let i = 0; i < apps.length; i++) {
  //         delete apps[i].dataValues.App_Role;
  //         //get default module
  //         defaultModule = await moduleService.getDefaultModuleIdByAppId(
  //           apps[i].dataValues.id
  //         );
  //         // console.log("defaultModule: ", defaultModule)
  //         apps[i].dataValues.defaultModule = defaultModule;
  //       }

  //       // console.log("apps: ", apps)
  //       // console.log("apps.length: ", apps.length)
  //       resolve({
  //         status: 201,
  //         message: "Get user permissions successfully !",
  //         result: apps,
  //       });
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // },
  getPermissionsByUserId: async ({ user }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let roles = user.roles;
        //get roleModulePermissions[]
        let roleModulePermissions = [];
        let result = [];
        //get all modules from roles
        for (let i = 0; i < roles.length; i++) {
          roleModulePermissions = await Role_Module_Permission.findAll({
            where: {
              ROLE_ID: roles[i].id,
              is_deleted: false,
            },
            attributes: ["MODULE_ID", "PERMISSION_ID"],
          });
          //get module name and permission name
          let module, permission;
          for (let j = 0; j < roleModulePermissions.length; j++) {
            module = await Modules.findOne({
              where: {
                id: roleModulePermissions[j].dataValues.MODULE_ID,
                is_deleted: false,
              },
              attributes: ["NAME"],
            });
            permission = await Permissions.findOne({
              where: {
                id: roleModulePermissions[j].dataValues.PERMISSION_ID,
                is_deleted: false,
              },
              attributes: ["id", "NAME"],
            });
            if (module)
              roleModulePermissions[j].dataValues.MODULE_NAME =
                module.dataValues.NAME;
            if (permission)
              roleModulePermissions[j].dataValues.PERMISSION_NAME =
                permission.dataValues.NAME;
            result.push(roleModulePermissions[j]);
          }
          console.log(`roleModulePermissions ${i}`, roleModulePermissions);
        }
        result = result.reduce(function (r, a) {
          r[a.MODULE_ID] = r[a.MODULE_ID] || [];
          r[a.MODULE_ID].push(a);
          return r;
        }, Object.create(null));
        // console.log(result)
        resolve({
          status: 201,
          message: "Get user permissions successfully !",
          result: result,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  // getPermissionsByUserId: async ({ userId, appId }) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       console.log(userId)
  //       console.log(appId)
  //       let apps = await authService.getAppsByUserId({ userId })
  //       apps = apps.result
  //       for (let i = 0; i < apps.length; i++) {
  //         if (apps[i].id == appId) {
  //           break
  //         } else {
  //           reject({
  //             status: 400,
  //             message: `User doesn't have any permission with this app. AppID: ${appId}`,
  //             result: appId,
  //           })
  //         }
  //       }
  //       result = await moduleService.getAllModulesByAppId(appId)
  //       result = JSON.parse(JSON.stringify(result))
  //       console.log(result)
  //       const permisisons = result.modules
  //       resolve({
  //         status: 201,
  //         message: "Get user permissions successfully !",
  //         result: permisisons,
  //       })
  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // },
};
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = authService;
