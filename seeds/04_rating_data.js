/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_rating").del();
  await knex("user_rating").insert([
    {
      id: 1,
      reservation_id: 1,
      user_id: 2,
      product_id: 2,
      rating: 5,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 2,
      reservation_id: 2,
      user_id: 1,
      product_id: 3,
      rating: 5,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 3,
      reservation_id: 3,
      user_id: 2,
      product_id: 2,
      rating: 5,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
  ]);
};
