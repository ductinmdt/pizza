const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const orderDetailService = require("../services/orderDetailService");

const orderDetailController = {
  createOrderDetail: async (req, res, next) => {
    try {
      const { product_id, order_id, quantity } = req.body;

      const { status, message } = await orderDetailService.createOrderDetail(
        {
          product_id,
          order_id,
          quantity,
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
      const { status, orderDetail } = await orderDetailService.getAll();
      res
        .status(status)
        .json(
          createSucess(
            status,
            "Get all orderDetail successfully !",
            orderDetail
          )
        );
    } catch (error) {
      next(error);
    }
  },
  getOrderDetail: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await orderDetailService.getOrderDetail(req.params.id);
      res.status(status).json(createSucess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateOrderDetail: async (req, res, next) => {
    try {
      const { product_id, order_id, quantity } = req.body;
      const { id } = req.params;
      const updateBy = req.user.id;
      const orderDetail = await orderDetailService.findOrderDetailById(id);
      if (!orderDetail)
        throw createError.NotFound("This orderDetail does not exist.");

      const { status, message } = await orderDetailService.updateOrderDetail(
        {
          product_id,
          order_id,
          quantity,
        },
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteOrderDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBy = req.user.id;

      const orderDetail = await orderDetailService.findOrderDetailById(id);
      if (!orderDetail)
        throw createError.NotFound("This orderDetail does not exist.");

      const { status, message } = await orderDetailService.deleteOrderDetail(
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderDetailController;
