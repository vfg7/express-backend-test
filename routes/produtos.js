const express = require("express");
const router = express.Router();
const db = require("../database");



//produtos
//get all
router.get("/", (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

//post, criar produto

router.post("/criar", (req, res) => {
    const { nome, preco } = req.body;
    db.run(
        "INSERT INTO produtos (nome, preco) VALUES (?, ?)", [nome, preco], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, nome, preco });
        }
    );
});

//get por id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM produtos WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});


router.get('/buscar', async (req, res) => {
    try {
        const { nome, preco } = req.query;
        let query = "SELECT * FROM produtos WHERE 1=1";
        let params = [];

        if (nome) {
            query += " AND nome LIKE ?";
            params.push(`%${nome}%`);
        }
        if (preco) {
            query += " AND preco = ?";
            params.push(preco);
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
    const { nome, preco } = req.body;

    let query = "UPDATE produtos SET ";
    let params = [];
    if (nome) { query += "nome = ?, "; params.push(nome); }
    if (preco) { query += "preco = ?, "; params.push(preco); }
  
    query = query.slice(0, -2) + " WHERE id = ?";
    params.push(id);

    db.run(query, params, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Atualizado com sucesso", changes: this.changes });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM produtos WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Removido com sucesso", changes: this.changes });
    });
});

module.exports = router;
