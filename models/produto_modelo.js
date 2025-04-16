const db = require('../database');

//  buscar todos os produtos
const listarProdutos = (callback) => {
    db.all("SELECT * FROM produtos", [], callback);
};

// buscar um produto por ID
const buscarProdutoPorId = (id, callback) => {
    db.get("SELECT * FROM produtos WHERE id = ?", [id], callback);
};

// criar um novo produto
const criarProduto = (produto, callback) => {
    db.run(
        "INSERT INTO produtos (nome, preco) VALUES (?, ?)",
        [produto.nome, produto.preco],
        function (err) {
            callback(err, { id: this.lastID });
        }
    );
};

module.exports = { listarProdutos, buscarProdutoPorId, criarProduto };
