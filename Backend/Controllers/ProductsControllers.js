const data = require("../Data");
const GetProducts = (req, res) => {
  res.send(data.products);
};
const GetProductOne = (req, res) => {
  const { id } = req.params;
  const product = data.products.find((x) => x._id === id);
  if (product) {
    res.send({
      success: true,
      product,
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};
module.exports = {
  GetProducts,
  GetProductOne,
};
