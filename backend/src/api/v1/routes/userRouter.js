const router = require("express").Router()
const { userController } = require("../controllers")
// const { validRegister, validUpdateUser } = require("../middlewares/valid")
const authenticate = require("../middlewares/authenticate")
const { prevCreateUser } = require("../controllers/userController")
const {
  uploadAvatarUser,
  uploadFile,
} = require("../middlewares/upload")

router.post(
  "/create-user",
  authenticate.authenticate,
  // validRegister,
  prevCreateUser,
  uploadFile.single("avatar"),
  userController.createUser
)
router.patch(
  "/reset-password-user/:id",
  authenticate.authenticate,
  userController.resetPasswordUser
)
router.get(
  "/getUsers",
  authenticate.authenticate,
  userController.getAllUsers
)
router.get(
  "/getOldPwUsers",
  authenticate.authenticate,
  userController.getOldPwUsers
)
router.get("/get-profile", authenticate.authenticate, userController.getProfile)
router.get("/get-user/:id", authenticate.authenticate, userController.getUser)
router.post(
  "/reset-password/:id",
  authenticate.authenticate,
  userController.resetPassword
)
router.patch(
  "/update-user/:id",
  authenticate.authenticate,
  uploadFile.single("avatar"),
  userController.updateUser
)
router.delete(
  "/delete-user/:id",
  authenticate.authenticate,
  userController.deleteUser
)

module.exports = router
