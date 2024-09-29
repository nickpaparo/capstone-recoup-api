import { v4 as uuidv4 } from "uuid";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await knex("user");
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send(`Unable to retrieve data`);
  }
};

const userLogin = async (req, res) => {
  if (!req.body.email && !isValidEmail(req.body.email)) {
    return res.status(400).json({ message: `Invalid email format` });
  }
  try {
    const user = await knex("user")
      .where({
        email: req.body.email,
      })
      .first();
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Please use a valid email and password to sign in` });
    }
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    console.log(user);
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ message: `Error logging in` });
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

const addUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill out all fields to create an account" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const existingUser = await knex("user").where({ email }).first();
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Account with this email already exists" });
    }
    const id = uuidv4();
    const newUser = await knex("user").insert({
      id,
      first_name,
      last_name,
      email,
      password,
    });
    const { password: _, ...userWithoutPassword } = newUser[0];
    res
      .status(201)
      .json({
        message: "Successfully created new Recoup account",
        user: userWithoutPassword,
      });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ message: "Error creating user account" });
  }
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
      .leftJoin("reservation", function () {
        this.on("user.id", "=", "reservation.user_id").orOn(
          "user.id",
          "=",
          "reservation.owner_id"
        );
      })
      .leftJoin("product", "reservation.product_id", "=", "product.id")
      .where({ "user.id": req.params.id })
      .select(
        "reservation.id",
        "reservation.product_id",
        "reservation.user_id",
        "reservation.owner_id",
        "reservation.total_price",
        "reservation.reservation_start",
        "reservation.reservation_end",
        "reservation.duration_days",
        "reservation.duration_hrs",
        "product.title as product_title"
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
      return res
        .status(404)
        .json({ message: `User not found in list of owners` });
    }

    const userProducts = await knex("product")
      .where({ user_id: req.params.id })
      .select(
        "id",
        "user_id",
        "title",
        "description",
        "price_per_hour",
        "price_per_day",
        "is_available"
      );
    res.status(200).json(userProducts);
  } catch (error) {
    return res.status(500).send("Error occured while fetcing data");
  }
};

export {
  userLogin,
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  findUserReservations,
  findUserProduct,
  findOwnerReservations,
};
