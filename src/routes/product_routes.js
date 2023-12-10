const ProductRoutes = require("express").Router();
const ProductController = require("./../controllers/product_controller");

ProductRoutes.get("/",ProductController.fetchAllProducts);
ProductRoutes.post("/",ProductController.createProduct);
ProductRoutes.get("/:id",ProductController.fetchProductById);
ProductRoutes.get("/category/:id",ProductController.fetchProductByCateogory)
ProductRoutes.get("/provider/:id",ProductController.fetchProductByProvider)
module.exports = ProductRoutes;