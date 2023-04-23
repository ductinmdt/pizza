const { logCreate, logUpdate } = require("../helpers/logQuery");
const {
  order_details,
} = require("../models");
const createError = require("http-errors");
const orderDetailService = {
  createOrderDetail: async (orderDetail, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        await order_details.create({ ...orderDetail, ...logCreate(createBy) });
        resolve({
          status: 201,
          message: "Create new orderDetail successfully !",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const orderDetail = await order_details.findAll({
          where: {
            is_deleted: false,
          },
        });
        resolve({
          status: 200,
          orderDetail,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getOrderDetail: async (orderDetailId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const orderDetail = await order_details.findOne({
          where: {
            id: orderDetailId,
            is_deleted: false,
          },
        });
        if (orderDetail) {
          resolve({
            status: 200,
            message: "Get orderDetail successful!",
            elements: orderDetail,
          });
        } else {
          reject({
            status: 400,
            message: "OrderDetail does not exist!",
            elements: undefined,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateOrderDetail: async (
    orderDetail,
    orderDetailId,
    updateBy
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if the code is existed or not
        // const exist = await order_details.findOne({
        //   where: {
        //     CD,
        //     is_deleted: false,
        //   },
        // })
        // if (exist && exist.id != orderDetailId) {
        //   throw createError.NotFound("OrderDetail CD already exists")
        // }
        const [response] = await order_details.update(
          {
            ...orderDetail,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: orderDetailId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "OrderDetail doesn't exist !",
          });
        } else {
          resolve({
            status: 200,
            message: "Update orderDetail successfully !",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteOrderDetail: async (orderDetailId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await order_details.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: orderDetailId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "OrderDetail doesn't exist !",
          });
        } else {
          resolve({
            status: 200,
            message: "Delete orderDetail successfully !",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findOrderDetailById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        const orderDetail = await order_details.findOne({
          where: {
            id,
            is_deleted: false,
          },
        });
        resolve(orderDetail);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = orderDetailService;
