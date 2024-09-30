/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.alterTable("product", function (table) {
      table.string("address").nullable()
      table.integer("zipcode").nullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = function (knex) {
    return knex.schema.alterTable("product", function (table) {
      table.dropColumn("address")
      table.dropColumn("zipcode");
    });
  };
