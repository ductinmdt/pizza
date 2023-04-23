const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const sliderService = require("../services/sliderService");

const sliderController = {
  createSlider: async (req, res, next) => {
    try {
      const {
        title,
      } = req.body;
      let url = "";

      if (req.file) {
        url = req.file.filename;
      }

      const { status, message } = await sliderService.createSlider(
        {
          title,
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
      const { status, slider } = await sliderService.getAll();
      res
        .status(status)
        .json(createSucess(status, "Get all slider successfully !", slider));
    } catch (error) {
      next(error);
    }
  },
  getSlider: async (req, res, next) => {
    try {
      const { status, message, elements } = await sliderService.getSlider(
        req.params.id
      );
      res.status(status).json(createSucess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateSlider: async (req, res, next) => {
    try {
      let slider = req.body;
      if(req.file){
        slider.url = req.file.filename
      }
      const { id } = req.params;
      const updateBy = req.user.id;
      const isExist = await sliderService.findSliderById(id);
      if (!isExist) throw createError.NotFound("This slider does not exist.");

      const { status, message } = await sliderService.updateSlider(
        slider,
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteSlider: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBy = req.user.id;

      const slider = await sliderService.findSliderById(id);
      if (!slider) throw createError.NotFound("This slider does not exist.");

      const { status, message } = await sliderService.deleteSlider(
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = sliderController;
