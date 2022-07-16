// Express Require
const express = require('express');
const app = express();


// Database
const pool = require('./db/index');


// Student Router Declaration
const studentRouter = express.Router();


// Student ID Params
studentRouter.param('id', (req, res, next, id) => {
    req.id = parseInt(id);
    next();
});


// Student Router
studentRouter.get('/', (req, res, next) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows)
    });
});

studentRouter.get('/:id', (req, res, next) => {
    pool.query('SELECT * FROM users WHERE id = $1', [req.id], (error, results) => {
        if (error) {
            throw error;
        }
        results.rows.length ? res.send(results.rows) : res.sendStatus(404)
    });
});

studentRouter.post('/', (req, res, next) => {
    const { name, email } = req.body
    if (name && email) {
        pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
            if (error) {
                throw error;
            }
            res.sendStatus(201)
        });
    } else {
        res.sendStatus(400)
    }
});

studentRouter.put('/:id', (req, res, next) => {
    const { name, email } = req.query;
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, req.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(204).send('Updated')
    });
});

studentRouter.delete('/:id', (req, res, next) => {
    pool.query('DELETE FROM users WHERE id = $1', [req.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.sendStatus(200)
    });
});


// Export Student Router
module.exports = studentRouter;