const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const commentService = require("../services/commentService");

const commentController = {
  createComment: async (req, res, next) => {
    try {
      const {
        product_id,
        user_id,
        rate,
        description,
      } = req.body;

      const { status, message } = await commentService.createComment(
        {
          product_id,
          user_id,
          rate,
          description,
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
      const { status, comment } = await commentService.getAll();
      res
        .status(status)
        .json(createSucess(status, "Get all comment successfully !", comment));
    } catch (error) {
      next(error);
    }
  },
  getComment: async (req, res, next) => {
    try {
      const { status, message, elements } = await commentService.getComment(
        req.params.id
      );
      res.status(status).json(createSucess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateComment: async (req, res, next) => {
    try {
      const {
        product_id,
        user_id,
        rate,
        description,
      } = req.body;
      const { id } = req.params;
      const updateBy = req.user.id;
      const comment = await commentService.findCommentById(id);
      if (!comment) throw createError.NotFound("This comment does not exist.");

      const { status, message } = await commentService.updateComment(
        {
          product_id,
          user_id,
          rate,
          description,
        },
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBy = req.user.id;

      const comment = await commentService.findCommentById(id);
      if (!comment) throw createError.NotFound("This comment does not exist.");

      const { status, message } = await commentService.deleteComment(
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
