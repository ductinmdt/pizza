const { logCreate, logUpdate } = require("../helpers/logQuery");
const { comments, products, users } = require("../models");
const createError = require("http-errors");
const URL_FILE = process.env.BASE_URL + "/uploads/files";
const commentService = {
  createComment: async (comment, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        await comments.create({ ...comment, ...logCreate(createBy) });
        resolve({
          status: 201,
          message: "Tạo bình luận thành công!",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const comment = await comments.findAll({
          where: {
            is_deleted: false,
          },
          include: [
            {
              model: products,
              required: false,
              where: {
                is_deleted: false,
              },
            },
            {
              model: users,
              required: false,
              where: {
                is_deleted: false,
              },
            },
          ],
        });
        const newData = [];
        comment.forEach((el) => {
          if (el?.user?.avatar && !el?.user?.avatar?.startsWith("http")) {
            el.user.avatar = `${URL_FILE}/${el.user.avatar}`;
          }
          if (el?.product?.url && !el?.product?.url?.startsWith("http")) {
            el.product.url = `${URL_FILE}/${el.product.url}`;
          }
          newData.push(el);
        });
        resolve({
          status: 200,
          comment: newData,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getComment: async (commentId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comment = await comments.findOne({
          where: {
            id: commentId,
            is_deleted: false,
          },
          include: [
            {
              model: products,
              required: false,
              where: {
                is_deleted: false,
              },
            },
            {
              model: users,
              required: false,
              where: {
                is_deleted: false,
              },
            },
          ],
        });
        if (comment) {
          resolve({
            status: 200,
            message: "Get comment successful!",
            elements: comment,
          });
        } else {
          reject({
            status: 400,
            message: "Comment does not exist!",
            elements: undefined,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateComment: async (comment, commentId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if the code is existed or not
        // const exist = await comments.findOne({
        //   where: {
        //     CD,
        //     is_deleted: false,
        //   },
        // })
        // if (exist && exist.id != commentId) {
        //   throw createError.NotFound("Comment CD already exists")
        // }
        const [response] = await comments.update(
          {
            ...comment,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: commentId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Bình luận không tồn tại !",
          });
        } else {
          resolve({
            status: 200,
            message: "Cập nhật bình luận thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteComment: async (commentId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await comments.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: commentId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Bình luận không tồn tại !",
          });
        } else {
          resolve({
            status: 200,
            message: "xóa bình luận thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findCommentById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        const comment = await comments.findOne({
          where: {
            id,
            is_deleted: false,
          },
        });
        resolve(comment);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = commentService;
