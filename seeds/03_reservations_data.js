/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex("reservation").del();
  await knex("reservation").insert([
    {
      id: 1,
      product_id: 1,
      user_id: 1,
      owner_id: 2,
      reservation_start: "2024-08-18 20:40:32",
      reservation_end: "2024-09-03 09:36:11",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 2,
      product_id: 2,
      user_id: 1,
      owner_id: 3,
      reservation_start: "2024-09-05 04:47:08",
      reservation_end: "2024-09-26 09:53:00",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 3,
      product_id: 3,
      user_id: 2,
      owner_id: 1,
      reservation_start: "2024-09-05 00:19:12",
      reservation_end: "2024-09-12 15:29:18",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 4,
      product_id: 4,
      user_id: 2,
      owner_id: 3,
      reservation_start: "2024-08-01 15:40:23",
      reservation_end: "2024-08-05 00:49:40",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 5,
      product_id: 2,
      user_id: 3,
      owner_id: 1,
      reservation_start: "2024-09-11 01:14:52",
      reservation_end: "2024-09-14 15:32:13",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 6,
      product_id: 5,
      user_id: 3,
      owner_id: 2,
      reservation_start: "2024-09-14 09:49:07",
      reservation_end: "2024-09-16 14:59:39",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
  ]);
};
