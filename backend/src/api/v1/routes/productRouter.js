const router = require("express").Router()
const productRouter = require("../controllers/productController")
const authenticate = require("../middlewares/authenticate")
const {
  uploadFile
} = require("../middlewares/upload")
router.post(
  "/createProduct",
  authenticate.authenticate,
  uploadFile.single("file"),
  productRouter.createProduct
)
router.get("/getAll", productRouter.getAll)

router.get("/getProduct/:id", productRouter.getProduct)
router.patch(
  "/updateProduct/:id",
  authenticate.authenticate,
  uploadFile.single("file"),
  productRouter.updateProduct
)
router.delete(
  "/deleteProduct/:id",
  authenticate.authenticate,
  productRouter.deleteProduct
)

module.exports = router
