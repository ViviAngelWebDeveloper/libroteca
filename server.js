const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001; // Cambiado a 3001

app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'book_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener todos los libros
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para agregar un nuevo libro
app.post('/books', (req, res) => {
    const newBook = req.body;
    const sql = 'INSERT INTO books SET ?';
    db.query(sql, newBook, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newBook });
    });
});

// Ruta para eliminar un libro
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const sql = 'DELETE FROM books WHERE id = ?';
    db.query(sql, bookId, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Libro eliminado' });
    });
});

app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const sql = 'SELECT * FROM books WHERE id = ?';
    db.query(sql, [bookId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar un libro
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const sql = 'UPDATE books SET ? WHERE id = ?';
    db.query(sql, [updatedBook, bookId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Libro actualizado' });
    });
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para obtener cada usuario
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para registrar un nuevo usuario
app.post('/users', (req, res) => {
    const newUser = req.body;
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newUser });
    });
});

// Ruta para eliminar un usuario
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, userId, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario eliminado' });
    });
});

// Ruta para actualizar un usuario
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    const sql = 'UPDATE users SET ? WHERE id = ?';
    db.query(sql, [updatedUser, userId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Usuario actualizado' });
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
