const router = require("express").Router()
const sliderRouter = require("../controllers/sliderController")
const authenticate = require("../middlewares/authenticate")
const {
  uploadFile
} = require("../middlewares/upload")

router.post(
  "/createSlider",
  authenticate.authenticate,
  uploadFile.single("file"),
  sliderRouter.createSlider
)
router.get("/getAll", sliderRouter.getAll)

router.get("/getSlider/:id", sliderRouter.getSlider)
router.patch(
  "/updateSlider/:id",
  authenticate.authenticate,
  uploadFile.single("file"),
  sliderRouter.updateSlider
)
router.delete(
  "/deleteSlider/:id",
  authenticate.authenticate,
  sliderRouter.deleteSlider
)

module.exports = router
