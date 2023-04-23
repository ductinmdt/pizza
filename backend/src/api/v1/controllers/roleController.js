const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const roleService = require("../services/roleService");

const roleController = {
  createRole: async (req, res, next) => {
    try {
      const {
        cd,
        name,
      } = req.body;

      const { status, message } = await roleService.createRole(
        {
          cd,
        name,
        },
        req.user.id
      );

      return res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const { status, role } = await roleService.getAll();
      res
        .status(status)
        .json(createSucess(status, "Get all role successfully !", role));
    } catch (error) {
      next(error);
    }
  },
  getRole: async (req, res, next) => {
    try {
      const { status, message, elements } = await roleService.getRole(
        req.params.id
      );
      res.status(status).json(createSucess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateRole: async (req, res, next) => {
    try {
      let role = req.body;
      const { id } = req.params;
      const updateBy = req.user.id;
      const isExist = await roleService.findRoleById(id);
      if (!isExist) throw createError.NotFound("Vai trò không tồn tại!");

      const { status, message } = await roleService.updateRole(
        role,
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteRole: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBy = req.user.id;

      const role = await roleService.findRoleById(id);
      if (!role) throw createError.NotFound("Vai trò không tồn tại!");

      const { status, message } = await roleService.deleteRole(
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = roleController;
