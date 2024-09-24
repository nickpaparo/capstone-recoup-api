import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const newRating = async (req, res) => {
  try {
    const [newRatingId] = await knex("rating").insert(req.body);
    const createdRating = await knex("rating").where({ id: newRatingId });
    if (!createdRating) {
      return res
        .status(404)
        .json({ message: `Rating not found after creation` });
    }
    res.status(201).json(createdRating);
  } catch (error) {
    res.status(500).json({ message: `Issue creating product` });
  }
};

export { newRating };
