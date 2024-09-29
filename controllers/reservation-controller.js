import initKnex from "knex";
import configuration from "../knexfile.js";
import { v4 as uuidv4 } from "uuid";
import { timeStamp } from "console";
const knex = initKnex(configuration);

const validateRental = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate < endDate;
};

const validateCurrentRental = (start, end, currentTime) => {
  const currentStartDate = new Date(start);
  const currentEndDate = new Date(end);
  const now = currentTime || new Date();
  return currentStartDate <= now && now <= currentEndDate;
};

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

const findProductReservation = async (req, res) => {
  try {
    const currentTime = new Date();
    const productReservation = await knex("reservation")
      .join("product", "product.id", "reservation.product_id")
      .where({ "reservation.user_id": req.params.id })
      .select(
        "reservation.id as reservation.id",
        "reservation.reservation_start",
        "reservation.reservation_end",
        "product.id as product.id",
        "product.title",
        "product.price_per_day",
        "product.price_per_hour"
      );
    const currentReservations = productReservation.filter((reservation) =>
      validateCurrentRental(
        reservation.reservation_start,
        reservation.reservation_end,
        currentTime
      )
    );
    if (currentReservations.length === 0) {
      res
        .status(404)
        .send({ message: `Unable to find product details`, error });
    }
    res.status(200).json(currentReservations);
  } catch (error) {
    res.status(400).json({ message: `Unable to retreive data`, error });
  }
};

const convertToMySQLDatetime = (dateInput) => {
  if (!dateInput) {
    throw new Error(`Invalid date input: ${dateInput}`);
  }
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date input: ${dateInput}`);
  }

  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return localDate.toISOString().slice(0, 19).replace("T", " ");
};

const newReservation = async (req, res) => {
  console.log("received data", req.body);
  try {
    const reservationStartLocal = new Date(req.body.reservation_start);
    const reservationEndLocal = new Date(req.body.reservation_end);

    const localReservationStart = new Date(
      reservationStartLocal.toLocaleString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    );

    const localReservationEnd = new Date(
      reservationEndLocal.toLocaleString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    );

    const reservationStartDatetime = convertToMySQLDatetime(
      localReservationStart
    );
    const reservationEndDatetime = convertToMySQLDatetime(localReservationEnd);

    console.log("Start datetime:", reservationStartDatetime);
    console.log("End datetime:", reservationEndDatetime);
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
    if (!validateRental(reservationStartDatetime, reservationEndDatetime)) {
      return res.status(400).json({
        message: `Invalid reservation times. The end time must be after the start time.`,
      });
    }

    const durationMins =
      new Date(reservationEndDatetime) - new Date(reservationStartDatetime);
    const durationHrs = Math.floor(durationMins / (1000 * 60 * 60));
    const durationDays = Math.floor(durationHrs / 24);
    const remainingHrs = durationHrs % 24;

    console.log(
      "start",
      reservationStartDatetime,
      "end",
      reservationEndDatetime
    );
    const reservationData = {
      id: uuidv4(),
      product_id: req.body.product_id,
      user_id: req.body.user_id,
      owner_id: req.body.owner_id,
      total_price: req.body.total_price,
      reservation_start: reservationStartDatetime,
      reservation_end: reservationEndDatetime,
      duration_days: durationDays,
      duration_hrs: remainingHrs,
    };
    console.log(durationDays, remainingHrs);
    console.log(reservationData);
    const [newReservationId] = await knex("reservation").insert(
      reservationData
    );
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
  // const reservationStartDatetime = convertToMySQLDatetime(
  //   req.body.reservation_start
  // );
  // const reservationEndDatetime = convertToMySQLDatetime(
  //   req.body.reservation_end
  // );

  // try {
  // if (
  //   !req.body.product_id ||
  //   !req.body.user_id ||
  //   !req.body.owner_id ||
  //   !reservationStartDatetime ||
  //   !reservationEndDatetime
  // ) {
  //   return res.status(400).json({
  //     message: `Missing required fields. Unable to complete reservation.`,
  //   });
  // }
  // if (!validateRental(reservationStartDatetime, reservationEndDatetime)) {
  //   return res.status(400).json({
  //     message: `Invalid reservation times. The end time must be after the start time.`,
  //   });
  // }

  // const durationMins = new Date(reservationEndDatetime) - new Date(reservationStartDatetime);
  // const durationHrs = Math.floor(durationMins / (1000 * 60 * 60));
  // const durationDays = Math.floor(durationHrs / 24);
  // const remainingHrs = durationHrs % 24;

  // console.log("start", reservationStartDatetime, "end", reservationEndDatetime)
  // const reservationData = {
  //   id: uuidv4(),
  //   product_id: req.body.product_id,
  //   user_id: req.body.user_id,
  //   owner_id: req.body.owner_id,
  //   total_price: req.body.total_price,
  //   reservation_start: reservationStartDatetime,
  //   reservation_end: reservationEndDatetime,
  //   duration_days: durationDays,
  //   duration_hrs: remainingHrs,
  // };
  // console.log(durationDays, remainingHrs)
  // console.log(reservationData)
  // const [newReservationId] = await knex("reservation").insert(reservationData);
  // const createdReservation = await knex("reservation")
  //   .where({ id: newReservationId })
  //   .first();
  // if (!createdReservation) {
  //   return res.status(404).json({ message: `Data not found after creation` });
  // }
  // res.status(201).json(createdReservation);
  // } catch (error) {
  //   // res.status(500).json({ message: `Unable to reserve product`, error });
  // }
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
  console.log("Received reservation ID:", reservationId);
  if (!reservationId) {
    return res.status(404).json({ message: `Unable to find rental` });
  }
  try {
    console.log("Reservation ID to delete:", reservationId)
    const reservationRowsDeleted = await knex("reservation")
      .where({ id: reservationId })
      .delete();
      console.log(reservationId)
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
  findProductReservation,
};
