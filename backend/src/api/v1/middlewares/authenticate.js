const { users } = require("../models")
const jwt = require("jsonwebtoken")
const createError = require("http-errors")

exports.authenticate = async (req, res, next) => {
  try {
    // console.log(process.env.AUTHENTICATE_TYPE)
    if (process.env.AUTHENTICATE_TYPE == "test") {
      req.user = { id: 1 }
    } else {
      const token = req.header("Authorization")
      if (!token) {
        return res.status(400).json({
          status: 400,
          message: "Xác thực không hợp lệ",
        })
      }

      const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      if (!decoded) {
        return res.status(400).json({
          status: 400,
          message: "Xác thực không hợp lệ",
        })
      }

      const user = await users.findOne({
        where: { id: decoded.id },
        attributes: {
          exclude: ["password"],
        },
      })
      if (!user) throw createError.BadRequest("Người dùng không tồn tại.")
      req.user = user
    }

    return next()
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 401,
        message: "Hết hạn phiên đăng nhập",
      })
    }
    return res.status(500).json({
      status: 500,
      message: error.message,
    })
  }
}
