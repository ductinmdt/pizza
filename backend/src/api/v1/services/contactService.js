const { logCreate, logUpdate } = require("../helpers/logQuery");
const { contacts } = require("../models");
const createError = require("http-errors");
const URL_FILE = process.env.BASE_URL + "/uploads/files";
const contactService = {
  createContact: async (contact) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await contacts.create({
          ...contact,
          // ...logCreate(createBy),
        });
        resolve({
          status: 201,
          message: "Gửi yêu cầu thành công!",
          // elements: result,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const contact = await contacts.findAll({
          where: {
            is_deleted: false,
          },
        });
        resolve({
          status: 200,
          contact,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getContact: async (contactId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const contact = await contacts.findOne({
          where: {
            id: contactId,
            is_deleted: false,
          },
        });
        if (contact) {
          resolve({
            status: 200,
            message: "Get contact successful!",
            elements: {
              ...contact,
            },
          });
        } else {
          reject({
            status: 400,
            message: "Contact does not exist!",
            elements: undefined,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateContact: async (contact, contactId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if the code is existed or not
        // const exist = await contacts.findOne({
        //   where: {
        //     CD,
        //     is_deleted: false,
        //   },
        // })
        // if (exist && exist.id != contactId) {
        //   throw createError.NotFound("Contact CD already exists")
        // }
        const [response] = await contacts.update(
          {
            ...contact,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: contactId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Phiếu liên hệ không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Cập nhật phiếu liên hệ thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteContact: async (contactId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await contacts.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: contactId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Phiếu liên hệ không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Xóa phiếu liên hệ thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findContactById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        const contact = await contacts.findOne({
          where: {
            id,
            is_deleted: false,
          },
        });
        resolve(contact);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = contactService;
