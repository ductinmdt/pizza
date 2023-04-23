const router = require("express").Router()
const contactRouter = require("../controllers/contactController")
const authenticate = require("../middlewares/authenticate")
const {
  uploadFile
} = require("../middlewares/upload")

router.post(
  "/createContact",
  // authenticate.authenticate,
  // uploadFile.single("file"),
  contactRouter.createContact
)
router.get("/getAll", contactRouter.getAll)

router.get("/getContact/:id", contactRouter.getContact)
router.patch(
  "/updateContact/:id",
  authenticate.authenticate,
  uploadFile.single("file"),
  contactRouter.updateContact
)
router.delete(
  "/deleteContact/:id",
  authenticate.authenticate,
  contactRouter.deleteContact
)

module.exports = router
