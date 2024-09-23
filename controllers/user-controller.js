import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getUser = async (req, res) => {
  try {
    const { data } = await knex("user").where({ id: req.params.id });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: `Unable to login` });
  }
};

const addUser = async (req, res) => {
  try {
    if (!req.body.username && !req.body.password && !req.body.email) {
      return res
        .status(400)
        .json({ message: `Please fill out all fields to createa an account` });
    } else {
        res.status(200).json({ message: `Successfully created new Recoup account`})
    }
  } catch (error) {}
};

const updateUser = async (req, res) => {};

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
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(404);
  }
};

export { getUser, addUser, findUserProduct };
