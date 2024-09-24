/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("reservation", (table) => {
    table.increments("id").primary();
    table
      .integer("product_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("product")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("owner_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.dateTime("reservation_start").defaultTo().notNullable();
    table.dateTime("reservation_end").defaultTo().notNullable();
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
  return knex.schema.dropTable("reservation");
};
