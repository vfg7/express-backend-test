const { listarProdutos, criarProduto, buscarProdutoPorId } = require("./models/produto_modelo");
const { listarPedidos, criarPedido } = require("./models/pedidos_modelo");
const { listarClientes, criarCliente } = require("./models/cliente_modelo");

// Teste de Produto
// criarProduto({ nome: "Cerveja IPA", preco: 10.5}, (err, result) => {
//     if (err) return console.error("Erro ao criar produto:", err);
//     console.log("Produto criado:", result);

//     listarProdutos((err, produtos) => {
//         if (err) return console.error("Erro ao listar produtos:", err);
//         console.log("Lista de produtos:", produtos);

//         buscarProdutoPorId(result.id, (err, produto) => {
//             if (err) return console.error("Erro ao buscar produto:", err);
//             console.log("Produto encontrado:", produto);
//         });
//     });
// });

// Teste de Cliente
// criarCliente({ nome: "xuão", email: "xuons@email.com" }, (err, result) => {
//     if (err) return console.error("Erro ao criar cliente:", err);
//     console.log("Cliente criado:", result);

//     listarClientes((err, clientes) => {
//         if (err) return console.error("Erro ao listar clientes:", err);
//         console.log("Lista de clientes:", clientes);
//     });
// });

const novoPedido = {
    cliente_id: 1,
    data: new Date().toISOString(),
    produto_id: 3,
    quantidade: 21,
};

criarPedido(novoPedido, (err, result) => {
    if (err) return console.error("Erro ao criar pedido:", err);
    console.log("Pedido criado:", result);

    listarPedidos((err, pedidos) => {
        if (err) return console.error("Erro ao listar pedidos:", err);
        console.log("Lista de pedidos:", pedidos);
    });
});
