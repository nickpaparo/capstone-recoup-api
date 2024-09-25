import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await knex("user");
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send(`Unable to retrieve data`);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await knex("user").where({ id: req.params.id });
    if (users.length === 0) {
      return res.status(404).json({ message: `User not found` });
    }
    const user = users[0];
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving user` });
  }
};

const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const addUser = async (req, res) => {
  if (req.body.email && !isValidEmail(req.body.email)) {
    return res.status(400).json({ message: `Invalid email format` });
  }

  try {
    if (!req.body.username && !req.body.password && !req.body.email) {
      return res
        .status(400)
        .json({ message: `Please fill out all fields to createa an account` });
    } else {
      res
        .status(200)
        .json({ message: `Successfully created new Recoup account` });
    }
  } catch (error) {}
};

const updateUser = async (req, res) => {
  if (req.body.email && !isValidEmail(req.body.email)) {
    return res.status(400).json({ message: `Invalid email format` });
  }
  try {
    const userRowsUpdated = await knex("user")
      .where({ id: req.params.id })
      .update(req.body);
    if (userRowsUpdated === 0) {
      return res.status(404).json({ message: `data could not be found` });
    }
    const updatedUser = await knex("user").where({ id: req.params.id }).first();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: `issue performing function` });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(404).json({ message: `Unable to find data` });
  }
  try {
    const userRowsDeleted = await knex("user").where({ id: userId }).delete();
    if (userRowsDeleted === 0) {
      return res.status(404).json({ message: `Unable to perform action` });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: `Unable to perform action` });
  }
};

const findUserReservations = async (req, res) => {
  try {
    const userReservations = await knex("user")
      .join("reservation", "user.id", "reservation.user_id")
      .where({ "user.id": req.params.id })
      .select(
        "reservation.id",
        "reservation.product_id",
        "reservation.user_id",
        "reservation.owner_id",
        "reservation.reservation_start",
        "reservation.reservation_end"
      );
    if (userReservations.length === 0) {
      res.status(404).send(`Unable to find data`);
    }
    res.status(200).json(userReservations);
  } catch (error) {
    res.status(400).json({ message: `Unable to retrieve data` });
  }
};

const findOwnerReservations = async (req, res) => {
  try {
    const ownerReservations = await knex("user")
      .join("reservation", "user.id", "reservation.owner_id")
      .where({ "user.id": req.params.id })
      .select(
        "reservation.id",
        "reservation.product_id",
        "reservation.user_id",
        "reservation.owner_id",
        "reservation.reservation_start",
        "reservation.reservation_end"
      );
    if (ownerReservations.length === 0) {
      res.status(404).send(`Unable to find data`);
    }
    res.status(200).json(ownerReservations);
  } catch (error) {
    res.status(400).json({ message: `Unable to retrieve data` });
  }
};

const findUserProduct = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await knex("user").where({ id: req.params.id }).first();
    if (!user) {
      return res.status(404).json({ message: `User not found in list of owners` });
    }

    const userProducts = await knex("product")
      .where({ user_id: req.params.id })
      .select(
        "user_id",
        "title",
        "price_per_hour",
        "price_per_day",
        "is_available"
      );
    if (userProducts.length === 0) {
      return res.status(404).json({
        message: "There are no products associated with that user"
      });
    }
    res.status(200).json(userProducts);
  } catch (error) {
    return res.status(500).send("Error occured while fetcing data");
  }
};

export {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  findUserReservations,
  findUserProduct,
  findOwnerReservations,
};
