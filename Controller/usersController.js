const express = require('express');
const router = express.Router();
const { getAllUsers, addUser } = require('../Model/users');


router.get('/', async (req, res) => {
        const users = await getAllUsers();
        res.status(200).json(users);
});

router.post('/', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }  
    const newUser = await addUser(name, email);
    res.status(201).json(newUser);
});
module.exports = router;
