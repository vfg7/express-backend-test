const db = require('../database');

//listar pedidos
const listarPedidos = (callback) => {
    db.all("SELECT * FROM pedidos", [], callback);
};

// criar um novo pedido
const criarPedido = (pedido, callback) => {
    db.run(
        "INSERT INTO pedidos (cliente_id, produto_id, quantidade, data) VALUES (?, ?, ?, ?)",
        [pedido.cliente_id, pedido.produto_id, pedido.quantidade,pedido.data],
        function (err) {
            callback(err, { id: this.lastID });
        }
    );
};

module.exports = { listarPedidos, criarPedido };
