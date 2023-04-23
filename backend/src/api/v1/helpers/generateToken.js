const jwt = require("jsonwebtoken")

module.exports.generateActiveToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: "5m",
  })
}

module.exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_DURATION,
  })
}

module.exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_DURATION,
  })
}

module.exports.generateAuthenticateToken = (payload) => {
  return jwt.sign(payload, `${process.env.AUTHENTICATE_TOKEN_SECRET}`, {
    expiresIn: "30s",
  })
}
