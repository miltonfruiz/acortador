const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

let users = [];

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username y password son obligatorios' });
        }

        const userExists = users.find(user => user.username === username);
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        users.push(newUser);

        return res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username y password son obligatorios' });
        }

        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    try {
        return res.json({ message: 'Sesión cerrada con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al cerrar la sesión' });
    }
});

module.exports = router;