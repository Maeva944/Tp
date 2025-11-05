const express = require('express');
const router = express.Router();
const { addBook, getAllBooks } = require('../Model/books');

router.get('/', async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des livres' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, author, available = true } = req.body;
        if (!title || !author) {
            return res.status(400).json({ error: 'title and author are required' });
        }

        const newBook = await addBook(title, author, available);
        res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du livre' });
    }
});

module.exports = router;
