const router = require("express").Router()
const categoryRouter = require("../controllers/categoryController")
const authenticate = require("../middlewares/authenticate")
const {
  uploadFile
} = require("../middlewares/upload")

router.post(
  "/createCategory",
  authenticate.authenticate,
  uploadFile.single("file"),
  categoryRouter.createCategory
)
router.get("/getAll", categoryRouter.getAll)

router.get("/getCategory/:id", categoryRouter.getCategory)
router.patch(
  "/updateCategory/:id",
  authenticate.authenticate,
  uploadFile.single("file"),
  categoryRouter.updateCategory
)
router.delete(
  "/deleteCategory/:id",
  authenticate.authenticate,
  categoryRouter.deleteCategory
)

module.exports = router
