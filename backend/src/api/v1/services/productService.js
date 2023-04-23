const { logCreate, logUpdate } = require("../helpers/logQuery");
const {
  products,
  categories
} = require("../models");
const createError = require("http-errors");
const URL_FILE = process.env.BASE_URL + "/uploads/files";
const productService = {
  createProduct: async (product, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await products.findOne({
          where: {
            cd: product?.cd,
            is_deleted: false,
          },
        })
        if (exist) {
          throw createError.NotFound("Mã sản phẩm đã tồn tại")
        }
        await products.create({ ...product, ...logCreate(createBy) });
        resolve({
          status: 201,
          message: "Tạo sản phẩm thành công!",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await products.findAll({
          where: {
            is_deleted: false,
          },
          include: [
            {
              model: categories,
              required: false,
              attribute: ["id", "categoryName"],
              where: {
                is_deleted: false,
              },
            },
          ],
        });
        const newData = [];
        product.forEach((el) => {
          if (el?.url && !el?.url?.startsWith("http")) {
            el.url = `${URL_FILE}/${el.url}`;
          }
          newData.push(el);
        });
        resolve({
          status: 200,
          product: newData,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getProduct: async (productId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await products.findOne({
          where: {
            id: productId,
            is_deleted: false,
          },
          include: [
            {
              model: categories,
              required: false,
              attribute: ["id", "categoryName"],
              where: {
                is_deleted: false,
              },
            },
          ],
        });
        if (product?.url && !product?.url?.startsWith("http")) {
          product.url = `${URL_FILE}/${product.url}`;
        }
        if (product) {
          resolve({
            status: 200,
            message: "Get product successful!",
            elements: product
          });
        } else {
          reject({
            status: 400,
            message: "Product does not exist!",
            elements: undefined,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateProduct: async (
    product,
    productId,
    updateBy
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if the code is existed or not
        const exist = await products.findOne({
          where: {
            cd: product?.cd,
            is_deleted: false,
          },
        })
        if (exist && exist.id != productId) {
          throw createError.NotFound("Mã sản phẩm đã tồn tại")
        }
        const [response] = await products.update(
          {
            ...product,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: productId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Sản phẩm không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Cập nhật sản phẩm thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteProduct: async (productId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await products.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: productId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Sản phẩm không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Xóa sản phẩm thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findProductById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        const product = await products.findOne({
          where: {
            id,
            is_deleted: false,
          },
        });
        resolve(product);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = productService;
