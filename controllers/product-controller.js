import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getProducts = async () => {
  try {
    const products = await knex("product");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: `Unable to find products` });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const products = await knex("product").where({ id: req.params.id });
    if (products.length === 0) {
      res.status(404).json({ message: `Product not found` });
    }
    const product = products[0];
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: `Unable to find product` });
  }
};

const validatePrice = (price) => {
  return price >= 0;
};

const newProduct = async (req, res) => {
  if (!req.body.title || !req.body.price_per_hour || !req.body.price_per_day) {
    return res
      .status(400)
      .json({ message: `Please fill out all fields to list a new product` });
  }

  if (req.body.price_per_day && !validatePrice(req.body.price_per_day)) {
    return res.status(400).json({ message: `Invalid price` });
  }

  if (req.body.price_per_hour && !validatePrice(req.body.price_per_hour)) {
    return res.status(400).json({ message: `Invalid price` });
  }

  try {
    const [newProductId] = await knex("product").insert(req.body);
    const [createdProduct] = await knex("product").where({ id: newProductId });

    if (!createdProduct) {
      return res
        .status(404)
        .json({ message: `Product not found after creation` });
    }
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: `Unable to create new product listing` });
  }
};

const updateProduct = async (req, res) => {
  if (req.body.price_per_day && !validatePrice(req.body.price_per_day)) {
    return res.status(400).json({ message: `Invalid price` });
  }

  if (req.body.price_per_hour && !validatePrice(req.body.price_per_hour)) {
    return res.status(400).json({ message: `Invalid price` });
  }
  try {
    const productRowsUpdated = await knex("product")
      .where({ id: req.params.id })
      .update(req.body);

    if (productRowsUpdated === 0) {
      return res.status(404).json({ message: `Product could not be found` });
    }
    const updatedProduct = await knex("product")
      .where({ id: req.body.id })
      .first();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: `Unable to update product` });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(404).json({ message: `Unable to perform function` });
  }
  try {
    const productRowsDeleted = await knex("product")
      .where({ id: productId })
      .delete();
    if (productRowsDeleted === 0) {
      return res.status(404).json({ message: `Unable to perform action` });
    }
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to perform action on ${productId}` });
  }
};

const findUserProduct = async (req, res) => {
  try {
    const products = await knex("users")
      .join("product", "product.user_id", "user.user_id")
      .where({ user_id: req.params.id })
      .select(
        "product.product_id",
        "product.title",
        "product.image",
        "product.price_per_hour",
        "product.price_per_day",
        "product.is_available"
      );
    if (products.length === 0) {
      res.status(404).json({
        message: `There are no products associated with that user`,
      });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(404);
  }
};

const findProductRating = async (req, res) => {
  try {
    const productRating = await knex("rating")
      .join("product", "product.")
      .where({ product_id: req.params.id });
    if (productRating === 0) {
      res
        .status(404)
        .json({ message: `There are no ratings for this product` });
    } else {
      res.status(200).json(productRating);
    }
  } catch (error) {
    res.statu(404);
  }
};

export {
  getProducts,
  getOneProduct,
  newProduct,
  updateProduct,
  deleteProduct,
  findUserProduct,
  findProductRating,
};
