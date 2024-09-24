/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("user_rating", (table) => {
    table.increments("id").primary();
    table
      .integer("reservation_id")
      .notNullable()
      .unsigned()
      .references("reservation_id")
      .inTable("reservation")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("user_id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("product_id")
      .notNullable()
      .unsigned()
      .references("product_id")
      .inTable("product")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.smallint("rating");
    table.string("rating_text");
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
export const down = function (knex) {
  return knex.schema.dropTable("product_rating");
};
