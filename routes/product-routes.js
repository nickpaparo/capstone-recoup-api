import express from "express";
import * as productController from "../controllers/product-controller.js";
const productRouter = express.Router();

productRouter.route("/").get(productController.getProducts);
productRouter.route("/:product_id").get(productController.getOneProduct);

export default productRouter;