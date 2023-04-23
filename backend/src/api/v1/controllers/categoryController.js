const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const categoryService = require("../services/categoryService");
// const { Diseases } = require("../models")

const categoryController = {
  createCategory: async (req, res, next) => {
    try {
      const { product_id, categoryName, description,  } = req.body;

      let url = "";

      if (req.file) {
        url = req.file.filename;
      }

      const { status, message } = await categoryService.createCategory(
        {
          product_id,
          categoryName,
          description,
          url,
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
      const { status, category } = await categoryService.getAll();
      res
        .status(status)
        .json(
          createSucess(status, "Get all category successfully !", category)
        );
    } catch (error) {
      next(error);
    }
  },
  getCategory: async (req, res, next) => {
    try {
      const { status, message, elements } = await categoryService.getCategory(
        req.params.id
      );
      res.status(status).json(createSucess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateCategory: async (req, res, next) => {
    try {
      let category = req.body;
      if(req.file){
        category.url = req.file.filename
      }
      const { id } = req.params;
      const updateBy = req.user.id;
      const isExist = await categoryService.findCategoryById(id);
      if (!isExist)
        throw createError.NotFound("This category does not exist.");

      const { status, message } = await categoryService.updateCategory(
        category,
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBy = req.user.id;

      const category = await categoryService.findCategoryById(id);
      if (!category)
        throw createError.NotFound("This category does not exist.");

      const { status, message } = await categoryService.deleteCategory(
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
