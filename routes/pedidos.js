const express = require("express");
const router = express.Router();
const db = require("../database");


//pedidos
//get all
router.get("/", (req, res) => {
    db.all("SELECT * FROM pedidos", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM pedidos WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

//post criar novo pedido
router.post("/criar", (req, res) => {
    const { cliente_id, produto_id } = req.body;
    db.run(
        "INSERT INTO pedidos (cliente_id, produto_id) VALUES (?, ?)",
        [cliente_id, produto_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, cliente_id, produto_id });
        }
    );
});


router.get('/buscar', async (req, res) => {
    try {
        const { cliente_id, produto_id } = req.query;
        let query = "SELECT * FROM pedidos WHERE 1=1";
        let params = [];

        if (cliente_id) {
            query += " AND nome LIKE ?";
            params.push(`%${cliente_id}%`);
        }
        if (produto_id) {
            query += " AND produto_id = ?";
            params.push(produto_id);
        }
        db.all(query, params, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { cliente_id, produto_id, quantidade} = req.body;

    let query = "UPDATE pedidos SET ";
    let params = [];
    if (cliente_id) { query += "cliente_id = ?, "; params.push(cliente_id); }
    if (produto_id) { query += "produto_id = ?, "; params.push(produto_id); }
    if (quantidade) { query += "quantidade = ?, "; params.push(quantidade); }

    query = query.slice(0, -2) + " WHERE id = ?";
    params.push(id);

    db.run(query, params, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Atualizado com sucesso", changes: this.changes });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM pedidos WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Removido com sucesso", changes: this.changes });
    });
});



module.exports = router;
