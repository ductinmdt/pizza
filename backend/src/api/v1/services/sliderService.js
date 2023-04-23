const { logCreate, logUpdate } = require("../helpers/logQuery");
const {
  sliders,
} = require("../models");
const createError = require("http-errors");
const URL_FILE = process.env.BASE_URL + "/uploads/files";
const sliderService = {
  createSlider: async (slider, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        await sliders.create({ ...slider, ...logCreate(createBy) });
        resolve({
          status: 201,
          message: "Create new slider successfully !",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const slider = await sliders.findAll({
          where: {
            is_deleted: false,
          },
        });
        const newData = [];
        slider.forEach((el) => {
          if (el?.url && !el?.url?.startsWith("http")) {
            el.url = `${URL_FILE}/${el.url}`;
          }
          newData.push(el);
        });
        resolve({
          status: 200,
          slider: newData,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getSlider: async (sliderId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const slider = await sliders.findOne({
          where: {
            id: sliderId,
            is_deleted: false,
          },
        });
        if (slider?.url && !slider?.url?.startsWith("http")) {
          slider.url = `${URL_FILE}/${slider.url}`;
        }
        if (slider) {
          resolve({
            status: 200,
            message: "Get slider successful!",
            elements: slider,
          });
        } else {
          reject({
            status: 400,
            message: "Slider does not exist!",
            elements: undefined,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateSlider: async (
    slider,
    sliderId,
    updateBy
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check if the code is existed or not
        // const exist = await sliders.findOne({
        //   where: {
        //     CD,
        //     is_deleted: false,
        //   },
        // })
        // if (exist && exist.id != sliderId) {
        //   throw createError.NotFound("Slider CD already exists")
        // }
        const [response] = await sliders.update(
          {
            ...slider,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: sliderId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Slider doesn't exist !",
          });
        } else {
          resolve({
            status: 200,
            message: "Update slider successfully !",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteSlider: async (sliderId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await sliders.update(
          {
            is_deleted: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: sliderId,
              is_deleted: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Slider doesn't exist !",
          });
        } else {
          resolve({
            status: 200,
            message: "Delete slider successfully !",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  findSliderById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(id);
        const slider = await sliders.findOne({
          where: {
            id,
            is_deleted: false,
          },
        });
        resolve(slider);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = sliderService;
