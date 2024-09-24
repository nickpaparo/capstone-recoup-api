/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex("product").del();
  await knex("product").insert([
    {
      id: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description: "works like a charm.",
      price_per_day: 20,
      price_per_hour: 10,
      title: "dyson vaccuum",
      user_id: 1,
    },
    {
      id: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description: "can carry the whole family.",
      price_per_day: 75,
      price_per_hour: 20,
      title: "cargo bike",
      user_id: 2,
    },
    {
      id: 3,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description: "Like new skis",
      price_per_day: 40,
      price_per_hour: 0,
      title: "Skis with boots and poles",
      user_id: 2,
    },
    {
      id: 4,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description: "Lightweight monitor with all the necessary cables",
      price_per_day: 20,
      price_per_hour: 5,
      title: "Lenovo computer monitor",
      user_id: 2,
    },
    {
      id: 5,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description: "Gently used Xbox One, comes with a handful of pre-installed games.",
      price_per_day: 20,
      price_per_hour: 10,
      title: "Xbox One",
      user_id: 2,
    },
  ]);
};
