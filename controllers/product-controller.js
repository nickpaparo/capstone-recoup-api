import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getProducts = async () => {
    try {
        const { data } = await knex("product");
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: `Unable to find products`});
    }
};

const getOneProduct = async () => {
    try {
        const { data } = await knex("product").where({ id: req.params.id });
        res.status(200).json({ data });
    } catch (error) {
        res.status(404).json({ message: `Unable to find that product`})
    }
};

const newProduct = async () => {
    
}

export {getProducts, getOneProduct}