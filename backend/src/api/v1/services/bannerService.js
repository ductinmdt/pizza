const { logCreate, logUpdate } = require("../helpers/logQuery");
const {
  banners,
} = require("../models");
const createError = require("http-errors");
const URL_FILE = process.env.BASE_URL + "/uploads/files";
const bannerService = {
  createBanner: async (banner, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        await banners.create({ ...banner, ...logCreate(createBy) });
        resolve({
          status: 201,
          message: "Tạo banner mới thành công!",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const banner = await banners.findAll({
          where: {
            is_deleted: false,
          },
        });
        const newData = [];
        banner.forEach((el) => {
          if (el?.url && !el?.url?.startsWith("http")) {
            el.url = `${URL_FILE}/${el.url}`;
          }
          newData.push(el);
        });
        resolve({
          status: 200,
          banner: newData,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getBanner: async (bannerId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const banner = await banners.findOne({
          where: {
            id: bannerId,
            is_deleted: false,
          },
        });
        if (banner?.url && !banner?.url?.startsWith("http")) {
          banner.url = `${URL_FILE}/${banner.url}`;
        }
        if (banner) {
          resolve({
            status: 200,
            message: "Get banner successful!",
            elements:banner,
          });
        } else {
          reject({
            status: 400,
            message: "Banner does not exist!",
            elements: undefined,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateBanner: async (
    banner,
    bannerId,
    updateBy
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if the code is existed or not
        // const exist = await banners.findOne({
        //   where: {
        //     CD,
        //     is_deleted: false,
        //   },
        // })
        // if (exist && exist.id != bannerId) {
        //   throw createError.NotFound("Banner CD already exists")
        // }
        const [response] = await banners.update(
          {
            ...banner,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: bannerId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Banner không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Cập nhật banner mới thành công !",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteBanner: async (bannerId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await banners.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: bannerId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Banner không tồn tại!",
          });
        } else {
          resolve({
            status: 200,
            message: "Xóa banner thành công!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findBannerById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        const banner = await banners.findOne({
          where: {
            id,
            is_deleted: false,
          },
        });
        resolve(banner);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = bannerService;
