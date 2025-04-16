const express = require("express");
const router = express.Router();
const db = require("../database");

//rotas para clientes
//get all
router.get("/", (req, res) => {
    db.all("SELECT * FROM clientes", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
//post (criar novo)
router.post("/criar", (req, res) => {
    const { nome, email } = req.body;
    db.run("INSERT INTO clientes (nome, email) VALUES (?, ?)", [nome, email], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, nome, email });
    });
});

//get from id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM clientes WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

router.get('/buscar', async (req, res) => {
    try {
        const { nome, email } = req.query;
        let query = "SELECT * FROM clientes WHERE 1=1";
        let params = [];

        if (nome) {
            query += " AND nome LIKE ?";
            params.push(`%${nome}%`);
        }
        if (email) {
            query += " AND email = ?";
            params.push(email);
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
    const { nome, email, telefone, cidade } = req.body;

    let query = "UPDATE clientes SET ";
    let params = [];
    if (nome) { query += "nome = ?, "; params.push(nome); }
    if (email) { query += "email = ?, "; params.push(email); }
    if (telefone) { query += "telefone = ?, "; params.push(telefone); }
    if (cidade) { query += "cidade = ?, "; params.push(cidade); }

    query = query.slice(0, -2) + " WHERE id = ?";
    params.push(id);

    db.run(query, params, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Atualizado com sucesso", changes: this.changes });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM clientes WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Removido com sucesso", changes: this.changes });
    });
});



module.exports = router;
