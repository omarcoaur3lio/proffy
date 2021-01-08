import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE'); // Caso o professor seja deletado, todas as suas aulas também serão
        
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP')) // pega o horário atual
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}