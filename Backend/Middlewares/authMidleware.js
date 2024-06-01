const JWT = require("jsonwebtoken");
const userModel = require("../Models/User");
//
const Verifysign = (req, res, next) => {
  // try {
  //   const decode = JWT.verify(
  //     req.headers.authorization,
  //     process.env.JWT_SECRET
  //   );
  //   req.user = decode;
  //   next();
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No se proporcionó un token de autorización" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ message: "Token de autorización inválido" });
  }
};
module.exports = {
  Verifysign,
};
