import initKnex from "knex";
import configuration from "../knexfile.js";
import { timeStamp } from "console";
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
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate < endDate;
};

const convertToMySQLDatetime = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date input: ${dateInput}`);
  }
  return date.toISOString().slice(0, 19).replace("T", " ");
};

const newReservation = async (req, res) => {
  const reservationStartDatetime = convertToMySQLDatetime(
    req.body.reservation_start
  );
  const reservationEndDatetime = convertToMySQLDatetime(
    req.body.reservation_end
  );
  try {
    if (
      !req.body.product_id ||
      !req.body.user_id ||
      !req.body.owner_id ||
      !reservationStartDatetime ||
      !reservationEndDatetime
    ) {
      return res.status(400).json({
        message: `Missing required fields. Unable to complete reservation.`,
      });
    }
    if (!validateRental(req.body.reservation_start, req.body.reservation_end)) {
      return res.status(400).json({
        message: `Invalid reservation times. The end time must be after the start time.`,
      });
    }

    const [newReservationId] = await knex("reservation").insert(req.body);
    const createdReservation = await knex("reservation")
      .where({ id: newReservationId })
      .first();
    if (!createdReservation) {
      return res.status(404).json({ message: `Data not found after creation` });
    }
    res.status(201).json(createdReservation);
  } catch (error) {
    res.status(500).json({ message: `Unable to reserve product`, error });
  }
};

const updateReservation = async (req, res) => {
  try {
    let reservationStartDatetime, reservationEndDatetime;
    try {
      reservationStartDatetime = convertToMySQLDatetime(
        req.body.reservation_start
      );
      reservationEndDatetime = convertToMySQLDatetime(req.body.reservation_end);
    } catch (dateError) {
      return res.status(400).json({ message: dateError.message });
    }

    if (
      !req.body.product_id ||
      !req.body.user_id ||
      !req.body.owner_id ||
      !reservationStartDatetime ||
      !reservationEndDatetime
    ) {
      return res.status(400).json({
        message: `Missing required fields. Unable to update rental`,
        error,
      });
    }
    if (!validateRental(req.body.reservation_start, req.body.reservation_end)) {
      return res.status(404).json({
        message: `Please provide a valid end time for rental. Can not be same time as Start`,
        error,
      });
    }
    const reservationId = req.params.id;
    const reservationRowsUpdated = await knex("reservation")
      .where({ id: reservationId })
      .update({
        product_id: req.body.product_id,
        user_id: req.body.user_id,
        owner_id: req.body.owner_id,
        reservation_start: reservationStartDatetime,
        reservation_end: reservationEndDatetime,
      });

    if (reservationRowsUpdated === 0) {
      return res.status(404).json({ message: `Rental not found` });
    }
    const updatedReservation = await knex("reservation")
      .where({ id: reservationId })
      .first();
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: `Unable to update rental`, error });
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

export {
  getOneReservation,
  newReservation,
  updateReservation,
  deleteReservation,
};
