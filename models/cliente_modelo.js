const db = require('../database');

//listar pedidos
const listarClientes = (callback) => {
    db.all("SELECT * FROM clientes", [], callback);
};

// criar um novo pedido
const criarCliente = (cliente, callback) => {
    db.run(
        "INSERT INTO clientes (nome, email, telefone, cidade) VALUES (?, ?, ?, ?)",
        [cliente.nome, cliente.email,cliente.telefone, cliente.cidade],
        function (err) {
            callback(err, { id: this.lastID });
        }
    );
};

module.exports = { listarClientes, criarCliente };
