import initKnex from "knex";
import configuration from "../knexfile.js";
import { v4 as uuidv4 } from "uuid";
const knex = initKnex(configuration);

const calcAverageRating = async (productId) => {
  const ratings = await knex("user_rating")
    .where({ product_id: productId })
    .select("rating");
  if (ratings.length === 0) {
    return 0;
  }
  const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return (sum / ratings.length).toFixed(1);
};

const getProducts = async (_req, res) => {
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
    // if (products.length === 0) {
    //   return res.status(404).json({ message: `Product not found` });
    // }
    const product = products[0];
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: `Unable to find product` });
  }
};

const validatePrice = (price) => {
  const numPrice = Number(price);
  return !isNaN(numPrice) && numPrice >= 0;
};

const newProduct = async (req, res) => {
  try {
    if (
      !req.body.user_id ||
      !req.body.title ||
      req.body.price_per_hour === undefined ||
      req.body.price_per_day === undefined
    ) {
      return res
        .status(400)
        .json({ message: `Please fill out all fields to list a new product` });
    }

    const price_per_hour = Number(req.body.price_per_hour);
    const price_per_day = Number(req.body.price_per_day);

    if (!validatePrice(price_per_day) || !validatePrice(price_per_hour)) {
      return res.status(400).json({ message: `Invalid price` });
    }
    const id = uuidv4();
    const productData = {
      id,
      user_id: req.body.user_id,
      title: req.body.title,
      description: req.body.description,
      price_per_hour: parseFloat(price_per_hour),
      price_per_day: parseFloat(price_per_day),
      is_available: req.body.is_available || true,
    };
    console.error({ message: "Product Data", product: productData });
    const [newProductId] = await knex("product").insert(productData);
    const createdProduct = await knex("product")
      .where({ id: newProductId })
      .first();

    if (!createdProduct) {
      return res
        .status(404)
        .json({ message: `Product not found after creation` });
    }
    console.log(createdProduct);
    return res.status(201).json({
      message: "Successfully created product",
      product: createdProduct,
    });
  } catch (error) {
    console.error("Error creating new product:", error);
    res.status(500).json({ message: `Unable to create new product listing` });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (
      !validatePrice(req.body.price_per_day) ||
      !validatePrice(req.body.price_per_hour)
    ) {
      return res.status(400).json({ message: `Invalid price` });
    }

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
  const productId = req.body.id;
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

const findProductRating = async (req, res) => {
  try {
    const productId = req.params.id;
    const averageRating = await calcAverageRating(productId);
    res.status(200).json({ product_rating: averageRating });
  } catch (error) {
    res.status(500).send(`Error finding product ratings: ${error.message}`);
  }
};

const searchProducts = async (req, res) => {
  const searchQuery = req.query.searchQuery;
  if (searchQuery === undefined || searchQuery.trim() === "") {
    return res.status(400).json({ message: "Search to see results" });
  }
  console.log("Search Query:", searchQuery);
  try {
    const results = await knex("product")
      .select("*")
      .where(function () {
        this.where("title", "like", `%${searchQuery}%`)
          .orWhere("description", "like", `%${searchQuery}%`)
          .orWhereRaw("LOWER(title) LIKE ?", [`%${searchQuery.toLowerCase()}%`])
          .orWhereRaw("LOWER(description) LIKE ?", [
            `%${searchQuery.toLowerCase()}%`,
          ]);
      });
    if (results.length === 0) {
      return res.status(200).json({ message: "No products found" });
    }
    console.log("Search Results:", results);
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error retrieving products", error);
    return res
      .status(500)
      .json({ message: "Error retrieving products", error });
  }
};

export {
  getProducts,
  getOneProduct,
  newProduct,
  updateProduct,
  deleteProduct,
  findProductRating,
  searchProducts,
};
