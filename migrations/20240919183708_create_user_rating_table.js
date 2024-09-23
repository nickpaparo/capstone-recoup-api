/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product_rating", (table) => {
    table.increments("rating_id").primary();
    table
      .integer("reservation_id")
      .notNullable()
      .unsigned()
      .references("reservation.reservation_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("user.user_id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("product_id")
      .notNullable()
      .unsigned()
      .references("product.product_id")
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
exports.down = function (knex) {
  return knex.schema.dropTable("product_rating");
};
