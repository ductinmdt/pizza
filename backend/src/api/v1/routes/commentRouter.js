const router = require("express").Router()
const commentRouter = require("../controllers/commentController")
const authenticate = require("../middlewares/authenticate")

router.post(
  "/createComment",
  authenticate.authenticate,
  commentRouter.createComment
)
router.get("/getAll", commentRouter.getAll)

router.get("/getComment/:id", commentRouter.getComment)
router.patch(
  "/updateComment/:id",
  authenticate.authenticate,
  commentRouter.updateComment
)
router.delete(
  "/deleteComment/:id",
  authenticate.authenticate,
  commentRouter.deleteComment
)

module.exports = router
