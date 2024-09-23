/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('product').del()
  await knex('product').insert([
    { product_id: 1, 
      user_id: 1,
      title: "dyson vaccuum",
      description: "works like a charm.",
      price_per_day: 20,
      price_per_hour: 10,
      is_available: "true",
    },
    { product_id: 2, 
      user_id: 2,
      title: "cargo bike",
      description: "can carry the whole family.",
      price_per_day: 75,
      price_per_hour: 20,
      is_available: "true",
    },
    { product_id: 3, 
      user_id: 1,
      title: "Skis with boots and poles",
      description: "Like new skis, ",
      price_per_day: 40,
      price_per_hour: 0,
      is_available: "true",
    },
    { product_id: 4,
      user_id: 2,
      title: "Lenovo computer monitor",
      description: "",
      price_per_day: 20,
      price_per_hour: 5,
      is_available: "true",
    },
    { product_id: 5,
      user_id: 3,
      title: "Xbox One",
      description: "Gently used Xbox One, comes with a handful of pre-installed games.",
      price_per_day: 20,
      price_per_hour: 10,
      is_available: "true",
    },
  ]);
};
