import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
const router  = express.Router();

module.exports = (db: any) => {

  // Route to fetch ALL users:
  router.get('/users', (req: Request, res: Response) => {
    const queryString: string = `SELECT * FROM users;`;

    db.query(queryString)
      .then((data: any) => {
        console.log('res in route for USERS', data.rows);
        res.json(data.rows);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  });
  
  // Route to register new users:
  router.post('/users', (req: Request, res: Response) => {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const password_confirmation: string = req.body.password_confirmation;

    const queryParams: string[] = [username, email, password, password_confirmation];
    const queryString: string = `
      INSERT INTO users (username, email, password, password_confirmation)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`
    ;
    
    db.query(queryString, queryParams)      
      .then((data: any) => {
        console.log('res in route for REGISTER', data.rows);
        res.json(data.rows);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  })

  return router;
};

//module.exports = router;