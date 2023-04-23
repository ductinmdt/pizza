const { logCreate, logUpdate } = require("../helpers/logQuery");
const {
  categories,
  products,
} = require("../models");
const URL_FILE = process.env.BASE_URL + "/uploads/files";
const createError = require("http-errors");
const categoryService = {
  createCategory: async (category, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        await categories.create({ ...category, ...logCreate(createBy) });
        resolve({
          status: 201,
          message: "Tạo danh mục thành công!",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await categories.findAll({
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
          ],
        });
        const newcategory = JSON.parse(JSON.stringify(category));
        const newData = [];
        newcategory.forEach((el) => {
          const newProduct = []
          el.products.forEach((product) => {
            if (product?.url && !product?.url?.startsWith("http")) {
              product.url = `${URL_FILE}/${product.url}`;
            }
            newProduct.push(product)
          })
          if (el?.url && !el?.url?.startsWith("http")) {
            el.url = `${URL_FILE}/${el.url}`;
          }
          
          newData.push({...el, products: newProduct});
        });
        resolve({
          status: 200,
          category: newData,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getCategory: async (categoryId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await categories.findOne({
          where: {
            id: categoryId,
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
          ],
        });
        if (category?.url && !category?.url?.startsWith("http")) {
          category.url = `${URL_FILE}/${category.url}`;
        }
        if (category) {
          resolve({
            status: 200,
            message: "Get category successful!",
            elements: category,
          });
        } else {
          reject({
            status: 400,
            message: "Categories does not exist!",
            elements: undefined,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateCategory: async (
    category,
    categoryId,
    updateBy
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if the code is existed or not
        // const exist = await categories.findOne({
        //   where: {
        //     CD,
        //     is_deleted: false,
        //   },
        // })
        // if (exist && exist.id != categoryId) {
        //   throw createError.NotFound("Categories CD already exists")
        // }
        const [response] = await categories.update(
          {
            ...category,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: categoryId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Danh mục không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Cập nhật danh mục thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteCategory: async (categoryId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await categories.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: categoryId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Danh mục không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Xóa danh mục thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findCategoryById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        const category = await categories.findOne({
          where: {
            id,
            is_deleted: false,
          },
        });
        resolve(category);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = categoryService;
