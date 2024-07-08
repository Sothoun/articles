const connection = require('../config/db');

exports.createArticle = (req, res) => {
    const { title, content, created_by, is_published } = req.body;
    const query = "INSERT INTO articles (title, content, created_by, is_published) VALUES (?, ?, ?, ?)";
    connection.query(query, [title, content, created_by, is_published], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({
            "status": true,
            "message": "Article created successfully",
        });
    });
};

exports.getArticles = (req, res) => {
    const query = "SELECT * FROM articles";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({
            "status": true,
            "articles": results
        });
    });
};

exports.getArticleById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM articles WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        } else if (results.length === 0) {
            return res.status(404).send("Article not found");
        }
        res.status(200).send(results[0]);
    });
};

exports.updateArticle = (req, res) => {
    const { id } = req.params;
    const { title, content, created_by, is_published } = req.body;
    const query = "UPDATE articles SET title = ?, author_id = ?, genre = ?, publication_date = ? WHERE id = ?";
    connection.query(query, [title, content, created_by, is_published, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            return res.status(404).send("Article not found");
        }
        res.status(200).send({
            "status": true,
            "message": "Article updated successfully",
        });
    });
};

exports.deleteArticle = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM articles WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            return res.status(404).send("Article not found");
        }
        res.status(200).send("Article have been deleted");
    });
};
