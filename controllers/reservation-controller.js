import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getOneReservation = async () => {
    try {
        const { data } = await knex("reservation");
        res.status(200).json({ data });
    } catch (error) {
        res.status(404).json({ message: `Unable to find reservation`})
    }
}

const newReservation = async () => {
    try {
        const response = await knex("reservation").insert(req.body);
        const newReservationId = response[0];
        const createdReservation = await knex("reservation").insert({ id: newReservationId });
        res.status(201).json(createdReservation);
    } catch (error) {
        res.status(404).json({message: `Unable to reserve product`});
    }
}

export {getOneReservation, newReservation}