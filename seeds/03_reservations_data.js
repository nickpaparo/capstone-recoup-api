/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex("reservation").del();
  await knex("reservation").insert([
    {
      id: "c287d7d1-d5b2-4037-a3fc-6ad96b07c024",
      product_id: "5f85dba7-4087-47d5-91dd-3e3198ca482d",
      user_id: "6c71786e-b753-420a-8081-6df834cc74dc",
      owner_id: "90106321-dd30-4947-8a73-af8c7d38b740",
      reservation_start: "2024-08-18 20:40:32",
      reservation_end: "2024-09-03 09:36:11",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "8ce3971b-6354-4039-9ab1-d2dcf3d34592",
      product_id: "2cf708f0-a2cc-48e0-aeaa-191e264a2a36",
      user_id: "6c71786e-b753-420a-8081-6df834cc74dc",
      owner_id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      reservation_start: "2024-09-05 04:47:08",
      reservation_end: "2024-09-26 09:53:00",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "77e3a35a-f485-4153-82df-bc03997bfa93",
      product_id: "f36ba0b2-65eb-4971-9c06-84a1e3293413",
      user_id: "90106321-dd30-4947-8a73-af8c7d38b740",
      owner_id: "6c71786e-b753-420a-8081-6df834cc74dc",
      reservation_start: "2024-09-05 00:19:12",
      reservation_end: "2024-09-12 15:29:18",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "9bf40504-6660-494c-8771-9d39de923721",
      product_id: "06217dc7-243d-4cdd-9861-06c1ac387e02",
      user_id: "90106321-dd30-4947-8a73-af8c7d38b740",
      owner_id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      reservation_start: "2024-08-01 15:40:23",
      reservation_end: "2024-08-05 00:49:40",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "092ad96d-ad63-4c18-a44e-4bb39b1714a0",
      product_id: "99f5bca4-44fa-41d3-b267-22eb7e1fc5d3",
      user_id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      owner_id: "6c71786e-b753-420a-8081-6df834cc74dc",
      reservation_start: "2024-09-11 01:14:52",
      reservation_end: "2024-09-14 15:32:13",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "e82e38ea-e12a-44ef-9e7a-5895f8777661",
      product_id: "06217dc7-243d-4cdd-9861-06c1ac387e02",
      user_id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      owner_id: "90106321-dd30-4947-8a73-af8c7d38b740",
      reservation_start: "2024-09-14 09:49:07",
      reservation_end: "2024-09-16 14:59:39",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
};
