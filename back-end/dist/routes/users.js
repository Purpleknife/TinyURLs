"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
module.exports = (db) => {
    // Route to fetch ALL users:
    router.get('/users', (req, res) => {
        const queryString = `SELECT * FROM users;`;
        db.query(queryString)
            .then((data) => {
            //console.log('res in route for USERS', data.rows);
            res.json(data.rows);
        })
            .catch((error) => {
            console.log(error.message);
        });
    });
    // Route to register new users:
    router.post('/users', (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const password_confirmation = req.body.password_confirmation;
        const queryParams = [username, email, password, password_confirmation];
        const queryString = `
      INSERT INTO users (username, email, password, password_confirmation)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`;
        db.query(queryString, queryParams)
            .then((data) => {
            console.log('res in route for REGISTER', data.rows);
            res.json(data.rows[0]);
        })
            .catch((error) => {
            console.log(error.message);
        });
    });
    // Route to login users:
    router.get('/login/:id', (req, res) => {
        const id = req.params.id;
        const queryParams = [id];
        const queryString = `SELECT * FROM users WHERE users.id = $1;`;
        db.query(queryString, queryParams)
            .then((data) => {
            res.json(data.rows[0]);
        })
            .catch((error) => {
            console.log(error.message);
        });
    });
    // Route for logout:
    router.get('/logout', (req, res) => {
        return res.json('You\'re logged out!');
    });
    // Route to get the user's Dashboard:
    router.get('/dashboard/:user_id', (req, res) => {
        const user_id = req.params.user_id;
        const queryParams = [user_id];
        const queryString = `SELECT * FROM urls WHERE user_id = $1;`;
        db.query(queryString, queryParams)
            .then((data) => {
            res.json(data.rows);
        })
            .catch((error) => {
            console.log(error.message);
        });
    });
    //Route to add a user's short URL to the db:
    router.post('/dashboard/:user_id', (req, res) => {
        const user_id = req.params.user_id;
        const title = req.body.title;
        const long_url = req.body.long_url;
        const short_url = req.body.short_url;
        const queryParams = [user_id, long_url, short_url, title];
        const queryString = `
    INSERT INTO urls (user_id, date_created, long_url, short_url, title)
    VALUES ($1, CURRENT_DATE, $2, $3, $4)
    RETURNING *;
    `;
        db.query(queryString, queryParams)
            .then((data) => {
            res.json(data.rows);
        })
            .catch((error) => {
            console.log(error.message);
        });
    });
    return router;
};
//module.exports = router;
