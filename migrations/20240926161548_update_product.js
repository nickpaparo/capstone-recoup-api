/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable("product", (table) => {
      table.uuid("id").primary();
      table
        .uuid("user_id")
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table.string("title", 255).notNullable();
      table.string("description").notNullable();
      table.integer("price_per_day", 10, 2).notNullable().defaultTo(0);
      table.integer("price_per_hour");
      table.boolean("is_available").defaultTo(true);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      return knex.raw(
        "ALTER TABLE product ADD CONSTRAINT check_price_non_negative CHECK (price >= 0)"
      );
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = function (knex) {
    return knex.schema.dropTable("product");
  };