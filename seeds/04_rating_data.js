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
      rating: 4,
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
    {
      id: "c1a7adf7-07b6-4c93-89c5-6b5e1baf7997",
      reservation_id: "9bf40504-6660-494c-8771-9d39de923721",
      user_id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      product_id: "2cf708f0-a2cc-48e0-aeaa-191e264a2a36",
      rating: 5,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "35b25ea0-a9e7-41b6-a88a-a52d918ec8e2",
      reservation_id: "092ad96d-ad63-4c18-a44e-4bb39b1714a0",
      user_id: "90106321-dd30-4947-8a73-af8c7d38b740",
      product_id: "99f5bca4-44fa-41d3-b267-22eb7e1fc5d3",
      rating: 4,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "8f34c149-1779-4185-9d35-2d4bb42ab2f3",
      reservation_id: "e82e38ea-e12a-44ef-9e7a-5895f8777661",
      user_id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      product_id: "f36ba0b2-65eb-4971-9c06-84a1e3293413",
      rating: 4,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "0fd0abcc-28b8-4c0b-8597-6169296c4674",
      reservation_id: "e82e38ea-e12a-44ef-9e7a-5895f8777661",
      user_id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      product_id: "f36ba0b2-65eb-4971-9c06-84a1e3293413",
      rating: 4,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: "223d5af5-bab8-4b85-b6c2-daf3ed9667b8",
      reservation_id: "fb2158b0-117d-4512-8901-85e5c432ebcc",
      user_id: "90106321-dd30-4947-8a73-af8c7d38b740",
      product_id: "06217dc7-243d-4cdd-9861-06c1ac387e02",
      rating: 4,
      rating_text: "",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
};
