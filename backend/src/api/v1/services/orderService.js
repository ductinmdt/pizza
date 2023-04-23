const { logCreate, logUpdate } = require("../helpers/logQuery");
const { orders, order_details, products, users } = require("../models");
const createError = require("http-errors");
const URL_FILE = process.env.BASE_URL + "/uploads/files";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $or: Op.or,
}

const orderService = {
  createOrder: async (order, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await orders.create({
          ...order,
          ...logCreate(createBy),
        });
        resolve({
          status: 201,
          message: "Đặt hàng thành công!",
          elements: result,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await orders.findAll({
          where: {
            is_deleted: false,
          },
          include: [
            {
              model: order_details,
              required: false,
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
        // console.log('order :>> ', order);
        const orderNew = JSON.parse(JSON.stringify(order));
        const newData = [];
        orderNew.forEach((el) => {
          const newOrderDetail = [];
          el?.order_details.forEach((order_detail) => {
            if (
              order_detail.product?.url &&
              !order_detail.product.url.startsWith("http")
            ) {
              order_detail.product.url = `${URL_FILE}/${order_detail.product.url}`;
            }
            newOrderDetail.push({
              ...order_detail.product,
              ...order_detail,
              product: undefined,
            });
          });
          newData.push({
            ...el,
            cartProducts: newOrderDetail,
            order_details: undefined,
          });
        });
        resolve({
          status: 200,
          order: newData,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getOrder: async (orderId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await orders.findOne({
          where: {
            id: orderId,
            is_deleted: false,
          },
          include: [
            {
              model: order_details,
              required: false,
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
        const orderNew = JSON.parse(JSON.stringify(order));
        const newOrderDetail = [];
        orderNew?.order_details.forEach((order_detail) => {
          if (
            order_detail.product?.url &&
            !order_detail.product.url.startsWith("http")
          ) {
            order_detail.product.url = `${URL_FILE}/${order_detail.product.url}`;
          }
          newOrderDetail.push({
            ...order_detail.product,
            ...order_detail,
            product: undefined,
          });
        });
        if (order) {
          resolve({
            status: 200,
            message: "Get order successful!",
            elements: {
              ...orderNew,
              cartProducts: newOrderDetail,
              order_details: undefined,
            },
          });
        } else {
          reject({
            status: 400,
            message: "Order does not exist!",
            elements: undefined,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateOrder: async (order, orderId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if the code is existed or not
        // const exist = await orders.findOne({
        //   where: {
        //     CD,
        //     is_deleted: false,
        //   },
        // })
        // if (exist && exist.id != orderId) {
        //   throw createError.NotFound("Order CD already exists")
        // }
        const [response] = await orders.update(
          {
            ...order,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: orderId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Đơn hàng không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Cập nhật đơn hàng thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteOrder: async (orderId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await orders.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: orderId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Đơn hàng không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Xóa đơn hàng thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findOrderById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await orders.findOne({
          where: {
            id,
            is_deleted: false,
          },
        });
        resolve(order);
      } catch (error) {
        reject(error);
      }
    });
  },
  getRevenueByDay: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await orders.findAll({
          where: {
            is_deleted: false,
            status: {
              [Op.or]: ["Chờ xác nhận", "Đang chuẩn bị", "Đang vận chuyển", "Giao thành công"]
            }
          },
        });
        resolve({
          status: 200,
          order
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getRevenueByYear: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await orders.findAll({
          where: {
            is_deleted: false,
            status: {
              [Op.or]: ["Chờ xác nhận", "Đang chuẩn bị", "Đang vận chuyển", "Giao thành công"]
            }
          },
        });
        resolve({
          status: 200,
          order
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = orderService;
