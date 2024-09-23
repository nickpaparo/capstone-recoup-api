/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("product_rating").del();
  await knex("product_rating").insert([
    {
      rating_id: 1,
      reservation_id: 1,
      user_id: 2,
      product_id: 2,
      rating: 5,
      rating_text: "",
      created_at: "",
      updated_at: "",
    },
    {
      rating_id: 2,
      reservation_id: 2,
      user_id: 1,
      product_id: 3,
      rating: 5,
      rating_text: "",
      created_at: "",
      updated_at: "",
    },
    {
      rating_id: 3,
      reservation_id: 3,
      user_id: 2,
      product_id: 2,
      rating: 5,
      rating_text: "",
      created_at: "",
      updated_at: "",
    },
  ]);
};
