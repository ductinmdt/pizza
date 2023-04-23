const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const orderService = require("../services/orderService");
const moment = require("moment");

const orderController = {
  createOrder: async (req, res, next) => {
    try {
      const {
        user_id,
        status,
        totalPrice,
        phoneNumber,
        address,
        note,
        cd,
        type_payment,
      } = req.body;

      const {
        status: statusServer,
        message,
        elements,
      } = await orderService.createOrder(
        {
          user_id,
          status,
          totalPrice,
          phoneNumber,
          address,
          note,
          cd,
          type_payment,
        },
        req.user.id
      );

      return res
        .status(statusServer)
        .json(createSucess(statusServer, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const { status, order } = await orderService.getAll();
      res
        .status(status)
        .json(createSucess(status, "Get all order successfully !", order));
    } catch (error) {
      next(error);
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const { status, message, elements } = await orderService.getOrder(
        req.params.id
      );
      res.status(status).json(createSucess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateOrder: async (req, res, next) => {
    try {
      const {
        user_id,
        status,
        totalPrice,
        phoneNumber,
        address,
        note,
        cd,
        type_payment,
      } = req.body;
      const { id } = req.params;
      const updateBy = req.user.id;
      const order = await orderService.findOrderById(id);
      if (!order) throw createError.NotFound("This order does not exist.");

      const { status: statusServer, message } = await orderService.updateOrder(
        {
          user_id,
          status,
          totalPrice,
          phoneNumber,
          address,
          note,
          cd,
          type_payment,
        },
        id,
        updateBy
      );

      res.status(statusServer).json(createSucess(statusServer, message));
    } catch (error) {
      next(error);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBy = req.user.id;

      const order = await orderService.findOrderById(id);
      if (!order) throw createError.NotFound("This order does not exist.");

      const { status, message } = await orderService.deleteOrder(id, updateBy);

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getRevenueByDay: async (req, res, next) => {
    try {
      const { startDay, endDay } = req.body;

      const { status, order } = await orderService.getRevenueByDay();
      let newOrders = JSON.parse(JSON.stringify(order));

      // sort by day
      newOrders.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      // get Average for order
      let ordersAVG = newOrders.map((item) => {
        let count = newOrders.filter(
          (order) =>
            moment(order.createdAt).format("YYYY-MM-DD") ===
            moment(item.createdAt).format("YYYY-MM-DD")
        );
        let totalPrice = 0;
        count.forEach((countItem, index) => {
          totalPrice += countItem.totalPrice;
        });
        item.totalPrice = Math.round(totalPrice / count.length);
        return {
          ...item,
          key: moment(item.createdAt).format("DD-MM-YYYY"),
          value: item.totalPrice,
        };
      });

      // truncate the elements that are the same about the date
      for (let i = 0; i < ordersAVG.length - 1; i++) {
        for (let j = i + 1; j < ordersAVG.length; j++) {
          if (
            moment(ordersAVG[i].createdAt).format("YYYY-MM-DD") ===
            moment(ordersAVG[j].createdAt).format("YYYY-MM-DD")
          ) {
            ordersAVG.splice(j, 1);
            j--;
          }
        }
      }

      // compare date
      let result = ordersAVG.filter((item) => {
        return (
          new Date(item?.createdAt) >=
            new Date(moment(startDay).format("MM/DD/YYYY 00:00:00")) &&
          new Date(item?.createdAt) <=
            new Date(moment(endDay).format("MM/DD/YYYY 23:59:59"))
        );
      });

      res
        .status(status)
        .json(createSucess(status, "Get data for chart success !", result));
    } catch (error) {
      next(error);
    }
  },
  getRevenueByYear: async (req, res, next) => {
    try {
      const { yearSelect} = req.body;

      const { status, order } = await orderService.getRevenueByYear();
      let newOrders = JSON.parse(JSON.stringify(order));

      // sort by day
      newOrders.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      // get Average for order
      let ordersAVG = newOrders.map((item) => {
        let count = newOrders.filter(
          (order) =>
            moment(order.createdAt).format("YYYY-MM") ===
            moment(item.createdAt).format("YYYY-MM")
        );
        let totalPrice = 0;
        count.forEach((countItem, index) => {
          totalPrice += countItem.totalPrice;
        });
        item.totalPrice = Math.round(totalPrice / count.length);
        return {
          ...item,
          key: moment(item.createdAt).format("MM-YYYY"),
          value: item.totalPrice,
        };
      });

      // truncate the elements that are the same about the month
      for (let i = 0; i < ordersAVG.length - 1; i++) {
        for (let j = i + 1; j < ordersAVG.length; j++) {
          if (
            moment(ordersAVG[i].createdAt).format("YYYY-MM") ===
            moment(ordersAVG[j].createdAt).format("YYYY-MM")
          ) {
            ordersAVG.splice(j, 1);
            j--;
          }
        }
      }

      // compare year
      let result = ordersAVG.filter((item) => {
        return (
          moment(item?.createdAt).format("YYYY") === yearSelect
        );
      });

      res
        .status(status)
        .json(createSucess(status, "Get data for chart success !", result));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
