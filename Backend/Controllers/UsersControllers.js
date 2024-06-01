const userModel = require("../Models/User");
const JWT = require("jsonwebtoken");
const createAdmin = async (req, res) => {
  try {
    const newuser = new userModel({
      name: "admin",
      email: "admin@example.com",
      password: "jsamazona",
    });
    await newuser.save();
    res.status(201).send({
      success: true,
      user: newuser,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const signuser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, error: "email or password invalidate" });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .send({ success: false, error: "email not register" });
  }
  const token = await JWT.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return res.status(200).send({
    success: true,
    message: "Login success",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    token,
  });

  //
  // return res.status(201).send(
  //   {
  //     success: true,
  //     message: "User registered successfully",
  //     user: NewUser,
  //   },
  //   token
  // );

  //
};
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already registered",
      });
    }

    const newUser = new userModel({
      name,
      email,
      password,
    });

    const userR = await newUser.save();

    const token = JWT.sign(
      {
        _id: userR._id,
        name: userR.name,
        email: userR.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: {
        id: userR._id,
        name: userR.name,
        email: userR.email,
        isAdmin: userR.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const { name, email, password, token } = req.body;
    const { id } = req.params;
    const userA = await userModel.findById(id);
    if (!userA) {
      res.status(404).send({
        message: "User Not Found",
      });
    } else {
      userA.name = name || userA.name;
      userA.email = email || userA.email;
      userA.password = password || userA.password;
      const userUpdate = await userA.save();
      res.status(201).send({
        success: true,
        message: "User update successfully",
        user: {
          id: userUpdate._id,
          name: userUpdate.name,
          email: userUpdate.email,
          isAdmin: userUpdate.isAdmin,
        },
        token,
      });
    }
    // return res.status(201).send({
    //   success: true,
    //   message: "User registered successfully",
    //   user: {
    //     id: userR._id,
    //     name: userR.name,
    //     email: userR.email,
    //     isAdmin: userR.isAdmin,
    //   },
    //   token,
    // });
    // return res.status(201).send({
    //   user: user,
    // });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).send({
      message: "Error al actualizar el usuario",
    });
  }
};
module.exports = {
  createAdmin,
  signuser,
  createUser,
  UpdateUser,
};
