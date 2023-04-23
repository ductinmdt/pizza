const createError = require("http-errors");
const createSucess = require("../helpers/createSuccess");
const contactService = require("../services/contactService");
// const { Diseases } = require("../models")

const contactController = {
  createContact: async (req, res, next) => {
    try {
      const { fullname, email, phone, description } = req.body;

      const { status, message } = await contactService.createContact(
        {
          fullname, email, phone, description
        },
        // req.user.id
      );

      return res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const { status, contact } = await contactService.getAll();
      res
        .status(status)
        .json(
          createSucess(status, "Get all contact successfully !", contact)
        );
    } catch (error) {
      next(error);
    }
  },
  getContact: async (req, res, next) => {
    try {
      const { status, message, elements } = await contactService.getContact(
        req.params.id
      );
      res.status(status).json(createSucess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateContact: async (req, res, next) => {
    try {
      let contact = req.body;
      // if(req.file){
      //   contact.url = req.file.filename
      // }
      const { id } = req.params;
      const updateBy = req.user.id;
      const isExist = await contactService.findContactById(id);
      if (!isExist)
        throw createError.NotFound("This contact does not exist.");

      const { status, message } = await contactService.updateContact(
        contact,
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteContact: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBy = req.user.id;

      const contact = await contactService.findContactById(id);
      if (!contact)
        throw createError.NotFound("This contact does not exist.");

      const { status, message } = await contactService.deleteContact(
        id,
        updateBy
      );

      res.status(status).json(createSucess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = contactController;
