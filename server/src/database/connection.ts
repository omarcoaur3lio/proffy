import knex from 'knex';
import path from 'path';

const db = knex({
    client: 'sqlite3', // Indica qual banco de dados estamos usando
    connection: {
        // O "path" ajuda a resolver problemas como a utilização das barras dentro de um caminho (que são diferentes dependendo so SO)
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true, // Evita erro com valores padrão
});

export default db;