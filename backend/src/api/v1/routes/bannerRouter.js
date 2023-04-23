const router = require("express").Router()
const bannerRouter = require("../controllers/bannerController")
const authenticate = require("../middlewares/authenticate")
const {
  uploadFile
} = require("../middlewares/upload")

router.post(
  "/createBanner",
  authenticate.authenticate,
  uploadFile.single("file"),
  bannerRouter.createBanner
)
router.get("/getAll", bannerRouter.getAll)

router.get("/getBanner/:id", bannerRouter.getBanner)
router.patch(
  "/updateBanner/:id",
  authenticate.authenticate,
  uploadFile.single("file"),
  bannerRouter.updateBanner
)
router.delete(
  "/deleteBanner/:id",
  authenticate.authenticate,
  bannerRouter.deleteBanner
)

module.exports = router
