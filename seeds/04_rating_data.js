/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex("user_rating").del();
  await knex("user_rating").insert([
    {
      id: "89fc2071-4bc7-4f18-8d84-868c2b6d6c20",
      reservation_id: "c287d7d1-d5b2-4037-a3fc-6ad96b07c024",
      user_id: "90106321-dd30-4947-8a73-af8c7d38b740",
      product_id: "2cf708f0-a2cc-48e0-aeaa-191e264a2a36",
      rating: 5,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "25eaf4e8-5330-43b2-9212-157acfc842df",
      reservation_id: "8ce3971b-6354-4039-9ab1-d2dcf3d34592",
      user_id: "6c71786e-b753-420a-8081-6df834cc74dc",
      product_id: "f36ba0b2-65eb-4971-9c06-84a1e3293413",
      rating: 5,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "538d8e4f-2202-4eb5-8c8b-31b24943d57c",
      reservation_id: "77e3a35a-f485-4153-82df-bc03997bfa93",
      user_id: "90106321-dd30-4947-8a73-af8c7d38b740",
      product_id: "2cf708f0-a2cc-48e0-aeaa-191e264a2a36",
      rating: 5,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
};
