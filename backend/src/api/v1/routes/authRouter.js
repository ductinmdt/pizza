const router = require("express").Router()
const { authController } = require("../controllers")
// const { validRegister, validLogin } = require("../middlewares/valid")
const { verifyRefreshToken } = require("../middlewares/verify")
const authenticate = require("../middlewares/authenticate")

router.post("/register", authController.registerUser)
router.post("/login", authController.login)
router.get("/refresh_token", verifyRefreshToken, authController.refreshToken)
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-your-password",authenticate.authenticate, authController.resetPassword)
router.post("/change-password", authenticate.authenticate, authController.changePassword)
router.get("/logout", authController.logout)
router.patch("/update-profile",authenticate.authenticate, authController.updateProfile);
router.post("/google-login", authController.googleLogin);
router.post("/facebook-login", authController.facebookLogin);


module.exports = router
