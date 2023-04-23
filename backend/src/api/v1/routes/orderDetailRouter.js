const router = require("express").Router()
const orderDetailRouter = require("../controllers/orderDetailController")
const authenticate = require("../middlewares/authenticate")

router.post(
  "/createOrderDetail",
  authenticate.authenticate,
  orderDetailRouter.createOrderDetail
)
router.get("/getAll", orderDetailRouter.getAll)

router.get("/getOrderDetail/:id", orderDetailRouter.getOrderDetail)
router.patch(
  "/updateOrderDetail/:id",
  authenticate.authenticate,
  orderDetailRouter.updateOrderDetail
)
router.delete(
  "/deleteOrderDetail/:id",
  authenticate.authenticate,
  orderDetailRouter.deleteOrderDetail
)

module.exports = router
