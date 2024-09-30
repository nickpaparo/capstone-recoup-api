/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable("user_rating", (table) => {
      table.uuid("id").primary();
      table
        .uuid("reservation_id")
        .notNullable()
        .references("id")
        .inTable("reservation")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .uuid("user_id")
        .notNullable()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .uuid("product_id")
        .notNullable()
        .references("id")
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
    return knex.schema.dropTable("user_rating");
  };
