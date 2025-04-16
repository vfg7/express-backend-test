const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco de dados
const dbPath = path.join(__dirname, 'outra_loja.db'); //aqui dirname é o caminho relativo pra 

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conexão com o banco de dados SQLite estabelecida com sucesso.');
    }
});

module.exports = db;
