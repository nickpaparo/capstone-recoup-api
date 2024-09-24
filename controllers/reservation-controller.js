import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getOneReservation = async (req, res) => {
  try {
    const reservations = await knex("reservation").where({ id: req.params.id });
    if (reservations.length === 0) {
      res.status(404).json({ message: `Unable to find rental` });
    }
    const reservation = reservations[0];
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: `Unable to find rental` });
  }
};

const validateRental = (start, end) => {
  return start !== end;
};

const newReservation = async (req, res) => {
  if (
    req.body.reservation_start &&
    !validateRental(req.body.reservation_start)
  ) {
    return res.status(404).json({
      message: `Please provide a valid start time for rental. Can not be same as End.`,
    });
  }

  if (req.body.reservation_end && !validateRental(req.body.reservation_end)) {
    return res.status(404).json({
      message: `Please provide a valid end time for rental. Can not be same time as Start`,
    });
  }
  try {
    const [newReservationId] = await knex("reservation").insert(req.body);
    const createdReservation = await knex("reservation")
      .where({ id: newReservationId })
      .first();
    res.status(201).json(createdReservation);
  } catch (error) {
    res.status(404).json({ message: `Unable to reserve product` });
  }
};

const updateReservation = async (req, res) => {
  if (
    req.body.reservation_start &&
    !validateRental(req.body.reservation_start)
  ) {
    return res.status(404).json({
      message: `Please provide a valid start time for rental. Can not be same as End.`,
    });
  }

  if (req.body.reservation_end && !validateRental(req.body.reservation_end)) {
    return res.status(404).json({
      message: `Please provide a valid end time for rental. Can not be same time as Start`,
    });
  }
  try {
    const reservationRowsUpdated = await knex("reservation")
      .where({ id: req.params.id })
      .update(req.body);
    if (reservationRowsUpdated === 0) {
      return res.status(404).json({ message: `Rental not found` });
    }
    const updatedReservation = await knex("reservation")
      .where({ id: req.body.id })
      .first();
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: `Unable to update rental` });
  }
};

const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;
  if (!reservationId) {
    return res.status(404).json({ message: `Unable to find rental` });
  }
  try {
    const reservationRowsDeleted = await knex("reservation")
      .where({ id: reservationId })
      .delete();
    if (reservationRowsDeleted === 0) {
      return res.status(404).json({ message: `Unable to find rental` });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to perform action on rental: ${reservationId}`,
    });
  }
};

const findUserReservations = async (req, res) => {
  try {
    const userReservations = await knex("user")
      .join("reservation", "reservation.user_id", "reservation.id")
      .where({ id: req.params.id })
      .select(
        "reservation.id",
        "reservation.product_id",
        "reservation.user_id",
        "reservation.owner_id",
        "reservation.reservation_start",
        "reservation.reservation_end"
      );
    res.status(200).json(userReservations);
  } catch (error) {
    res.status(400).json({ message: `Unable to retrieve data` });
  }
};

export {
  getOneReservation,
  newReservation,
  updateReservation,
  deleteReservation,
  findUserReservations,
};
