import * as Knex from 'knex'

const TABLE_NAME = 'users'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, table => {
    table
      .text('id')
      .primary()
      .notNullable()
    table
      .string('username', 255)
      .unique()
      .notNullable()
    table.string('password', 1023).notNullable()
    table.timestamps(true, true)
    table.timestamp('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE_NAME)
}
