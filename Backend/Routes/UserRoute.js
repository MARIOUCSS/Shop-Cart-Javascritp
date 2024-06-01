const express = require("express");
const router = express.Router();
const {
  createAdmin,
  signuser,
  createUser,
  UpdateUser,
} = require("../Controllers/UsersControllers");
const { Verifysign } = require("../Middlewares/authMidleware");
router.get("/Createadmin", createAdmin);
router.post("/signin", signuser);
router.post("/registeru", createUser);
router.put("/update/:id", Verifysign, UpdateUser);
module.exports = router;
