const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
/////////
const port = process.env.PORT || 3000;
const uri = process.env.DB_URI;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({
    message: "hola puto",
  });
});
//
const Products = require("./Routes/Products");

app.use("/api", Products);
const User = require("./Routes/UserRoute");
app.use("/apiu", User);
app.listen(port, () => {
  console.log(`servidor corriendo ${port}`);
});
//conexion a la base de datos:
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
