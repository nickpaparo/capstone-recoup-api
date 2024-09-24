import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

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

export { getUser, addUser, updateUser, deleteUser };
