const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const productService = require("../services/productService");

const productController = {
  createProduct: async (req, res, next) => {
    try {
      const {
        productName,
        cd,
        description,
        priceNew,
        priceOld,
        stock,
        category_id,
      } = req.body;

      let url = "";

      if (req.file) {
        url = req.file.filename;
      }

      const { status, message } = await productService.createProduct(
        {
          productName,
          cd,
          description,
          priceNew,
          priceOld,
          stock,
          category_id,
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
      const { status, product } = await productService.getAll();
      res
        .status(status)
        .json(createSucess(status, "Get all product successfully !", product));
    } catch (error) {
      next(error);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const { status, message, elements } = await productService.getProduct(
        req.params.id
      );
      res.status(status).json(createSucess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      let product = req.body;
      if(req.file){
        product.url = req.file.filename
      }
      const { id } = req.params;
      const updateBy = req.user.id;
      const isExist = await productService.findProductById(id);
      if (!isExist) throw createError.NotFound("This product does not exist.");

      const { status, message } = await productService.updateProduct(
        product,
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBy = req.user.id;

      const product = await productService.findProductById(id);
      if (!product) throw createError.NotFound("This product does not exist.");

      const { status, message } = await productService.deleteProduct(
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
