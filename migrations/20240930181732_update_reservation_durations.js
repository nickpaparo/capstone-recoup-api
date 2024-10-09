/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.alterTable("reservation", function (table) {
      table.string("duration_days").nullable();
      table.string("duration_hrs").nullable();
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.alterTable("reservation", function (table) {
      table.dropColumn("duration_days");
      table.dropColumn("duration_hrs");
    });
  };
