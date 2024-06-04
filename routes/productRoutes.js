let express = require("express")
let routes = express.Router()
let mycontroller = require("../controller/productController");

routes.post("/addproduct", mycontroller.addProduct);

routes. get("/viewproducts", mycontroller.getAllProducts);
module.exports = routes