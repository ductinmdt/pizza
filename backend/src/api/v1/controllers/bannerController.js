const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const bannerService = require("../services/bannerService");

const bannerController = {
  createBanner: async (req, res, next) => {
    try {
      const { title, description} = req.body;
      let url = "";

      if (req.file) {
        url = req.file.filename;
      }

      const { status, message } = await bannerService.createBanner(
        {
          title,
          description,
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
      const { status, banner } = await bannerService.getAll();
      res
        .status(status)
        .json(createSucess(status, "Get all banner successfully !", banner));
    } catch (error) {
      next(error);
    }
  },
  getBanner: async (req, res, next) => {
    try {
      const { status, message, elements } = await bannerService.getBanner(
        req.params.id
      );
      res.status(status).json(createSucess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateBanner: async (req, res, next) => {
    try {
      let banner = req.body;
      if(req.file){
        banner.url = req.file.filename
      }
      const { id } = req.params;
      const updateBy = req.user.id;
      const isExist = await bannerService.findBannerById(id);
      if (!isExist) throw createError.NotFound("This banner does not exist.");

      const { status, message } = await bannerService.updateBanner(
        banner,
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteBanner: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBy = req.user.id;

      const banner = await bannerService.findBannerById(id);
      if (!banner) throw createError.NotFound("This banner does not exist.");

      const { status, message } = await bannerService.deleteBanner(
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bannerController;
