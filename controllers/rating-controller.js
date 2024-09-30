import initKnex from "knex";
import configuration from "../knexfile.js";
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

const newProductRating = async (req, res) => {
  try {
    const { reservation_id, user_id, product_id, rating, rating_text } = req.body;
    const [newRatingId] = await knex("user_rating").insert({
      id: knex.raw('UUID()'),
      reservation_id,
      user_id,
      product_id,
      rating,
      rating_text
    });
    const createdRating = await knex("user_rating")
      .where({
        id: newRatingId,
      })
      .first();
    if (!createdRating) {
      return res
        .status(404)
        .json({ message: `Rating not found after creation` });
    }
    const averageRating = await calcAverageRating(createdRating.product_id);
    res.status(201).json({ ...createdRating, averageRating });
  } catch (error) {
    res.status(500).json({ message: `Issue creating product` });
  }
};

export { newProductRating };
