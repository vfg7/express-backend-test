const db = require('./database');

console.log(__dirname)

db.serialize(() => {
    db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
        if (err) {
            console.error('Erro ao buscar tabelas:', err.message);
        } else {
            console.log('Tabelas no banco de dados:', tables);
        }
    });
});

db.close();
