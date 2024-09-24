/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex("user").del();
  await knex("user").insert([
    {
      id: 1,
      first_name: "Zion",
      last_name: "Watts",
      email: "Aaliyah23@hotmail.com",
      password: "F2EAFyTqHbR4Kt6",
      created_at: knex.fn.now()
    },
    {
      id: 2,
      first_name: "Kadin",
      last_name: "Volkman",
      email: "Haylie93@yahoo.com",
      password: "3jmembRtsuoo1tY",
      created_at: knex.fn.now()
    },
    {
      id: 3,
      first_name: "Margarete",
      last_name: "Jenkins",
      email: "Clid68@gmail.com",
      password: "kpHh_hKk6KMwvRa",
      created_at: knex.fn.now()
    },
  ]);
};
