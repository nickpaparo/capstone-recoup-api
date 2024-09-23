/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product", (table) => {
    table.increments("product_id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("user.user_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
      .notNullable();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.integer("price_per_day");
    table.integer("price_per_hour");
    table.boolean("is_available").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("product");
};
