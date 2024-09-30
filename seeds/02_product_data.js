import { v4 as uuidv4 } from "uuid";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex("product").del();
  await knex("product").insert([
    {
      id: "5f85dba7-4087-47d5-91dd-3e3198ca482d",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description: "works like a charm.",
      price_per_day: 20,
      price_per_hour: 10,
      title: "dyson vaccuum",
      user_id: "6c71786e-b753-420a-8081-6df834cc74dc",
      image: "http://blog.bestbuy.ca/wp-content/uploads/2020/09/Dyson-V11-Outsize-Cordless-Stick-Vacuum-demo-and-review.jpg"
    },
    {
      id: "2cf708f0-a2cc-48e0-aeaa-191e264a2a36",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description: "can carry the whole family.",
      price_per_day: 75,
      price_per_hour: 20,
      title: "cargo bike",
      user_id: "90106321-dd30-4947-8a73-af8c7d38b740",
      image: "https://cdn.mos.cms.futurecdn.net/nSjcpbs4QvjDzihSNNxicB-1920-80.jpg"
    },
    {
      id: "99f5bca4-44fa-41d3-b267-22eb7e1fc5d3",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description: "Like new skis",
      price_per_day: 40,
      price_per_hour: 0,
      title: "Skis with boots and poles",
      user_id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      image: "https://totemskibansko.com/wp-content/uploads/2020/12/Ski-set-rent-image.png"
    },
    {
      id: "f36ba0b2-65eb-4971-9c06-84a1e3293413",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description: "Lightweight monitor with all the necessary cables",
      price_per_day: 20,
      price_per_hour: 5,
      title: "Lenovo computer monitor",
      user_id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      image: "https://thegadgetflow.com/wp-content/uploads/2019/02/Lenovo-ThinkVision-M14-Portable-USBC-Monitor-01.jpg"
    },
    {
      id: "06217dc7-243d-4cdd-9861-06c1ac387e02",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      is_available: 1,
      description:
        "Gently used Xbox One, comes with a handful of pre-installed games.",
      price_per_day: 20,
      price_per_hour: 10,
      title: "Xbox One",
      user_id: "6c71786e-b753-420a-8081-6df834cc74dc",
      image: "https://www.trustedreviews.com/wp-content/uploads/sites/54/2016/10/xbox-one-s-12-1.jpg"
    },
  ]);
};
