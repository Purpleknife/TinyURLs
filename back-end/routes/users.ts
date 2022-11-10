import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
const router  = express.Router();

module.exports = (db: any) => {
  
  // Route to register new users:
  router.post('/users', (req: Request, res: Response) => {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const password_confirmation: string = req.body.password_confirmation;

    const queryParams: string[] = [username, email, password, password_confirmation];
    const queryString: string = `
      INSERT INTO users (username, first_name, last_name, email, password, password_confirmation)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`
    ;
    
    db.query(queryString, queryParams)
      console.log('res in route', res);
      return res.send(res);
  })

  return router;
};

//module.exports = router;