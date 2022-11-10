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
            console.log('res in route for USERS', data.rows);
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
            res.json(data.rows);
        })
            .catch((error) => {
            console.log(error.message);
        });
    });
    return router;
};
//module.exports = router;
