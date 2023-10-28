import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').references('id').inTable('users')
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.string('date').notNullable()
    table.string('time').notNullable()
    table.boolean('withinTheDiet').notNullable().defaultTo(false)

    table.timestamp('created_at')
    table.timestamp('updated_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
