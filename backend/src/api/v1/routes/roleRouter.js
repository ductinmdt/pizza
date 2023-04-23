const router = require("express").Router()
const roleRouter = require("../controllers/roleController")
const authenticate = require("../middlewares/authenticate")
const {
  uploadFile
} = require("../middlewares/upload")
router.post(
  "/createRole",
  authenticate.authenticate,
  // uploadFile.single("file"),
  roleRouter.createRole
)
router.get("/getAll", roleRouter.getAll)

router.get("/getRole/:id", roleRouter.getRole)
router.patch(
  "/updateRole/:id",
  authenticate.authenticate,
  // uploadFile.single("file"),
  roleRouter.updateRole
)
router.delete(
  "/deleteRole/:id",
  authenticate.authenticate,
  roleRouter.deleteRole
)

module.exports = router
