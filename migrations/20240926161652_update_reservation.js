/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable("reservation", (table) => {
      table.uuid("id").primary();
      table
        .uuid("product_id")
        .notNullable()
        .references("id")
        .inTable("product")
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
        .uuid("owner_id")
        .notNullable()
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("total_price").defaultTo();
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
