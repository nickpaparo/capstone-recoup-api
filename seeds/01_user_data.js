import { v4 as uuidv4 } from "uuid";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex("user").del();
  await knex("user").insert([
    {
      id: "6c71786e-b753-420a-8081-6df834cc74dc",
      first_name: "Zion",
      last_name: "Watts",
      email: "Aaliyah23@hotmail.com",
      password: "F2EAFyTqHbR4Kt6",
      created_at: knex.fn.now(),
    },
    {
      id: "90106321-dd30-4947-8a73-af8c7d38b740",
      first_name: "Kadin",
      last_name: "Volkman",
      email: "Haylie93@yahoo.com",
      password: "3jmembRtsuoo1tY",
      created_at: knex.fn.now(),
    },
    {
      id: "a2608c4f-fa67-49d5-8ff4-4e9bf0d967d4",
      first_name: "Margarete",
      last_name: "Jenkins",
      email: "Clid68@gmail.com",
      password: "kpHh_hKk6KMwvRa",
      created_at: knex.fn.now(),
    },
  ]);
};
