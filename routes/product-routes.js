import express from "express";
import * as productController from "../controllers/product-controller.js";
import * as ratingController from "../controllers/rating-controller.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getProducts)
  .post(productController.newProduct);
productRouter.route("/search").get(productController.searchProducts);
productRouter.route("/delete").post(productController.deleteProduct);
productRouter
  .route("/:id")
  .get(productController.getOneProduct)
  .put(productController.updateProduct);
productRouter
  .route("/:id/rating")
  .get(productController.findProductRating)
  .post(ratingController.newProductRating);

export default productRouter;
