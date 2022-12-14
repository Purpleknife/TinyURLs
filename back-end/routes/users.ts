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
        //console.log('res in route for USERS', data.rows);
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
        res.json(data.rows[0]);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  });


  // Route to login users:
  router.get('/login/:id', (req: Request, res: Response) => {
    const id: string | number = req.params.id;

    const queryParams: (string | number)[] = [id];
    const queryString: string = `SELECT * FROM users WHERE users.id = $1;`;

    db.query(queryString, queryParams)      
    .then((data: any) => {
      res.json(data.rows[0]);
    })
    .catch((error: Error) => {
      console.log(error.message);
    });
  });



  // Route for logout:
  router.get('/logout', (req: Request, res: Response) => {
    return res.json('You\'re logged out!');
  });



  // Route to get the user's Dashboard:
  router.get('/dashboard/:user_id', (req: Request, res: Response) => {
    const user_id: string | number = req.params.user_id;

    const queryParams: (string | number)[] = [user_id];
    const queryString: string = `SELECT * FROM urls WHERE user_id = $1;`

    db.query(queryString, queryParams)
      .then((data: any) => {
        res.json(data.rows);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });

  });



  //Route to add a user's short URL to the db:
  router.post('/dashboard/:user_id', (req: Request, res: Response) => {
    const user_id: string | number = req.params.user_id;
    const title: string = req.body.title;
    const long_url: string = req.body.long_url;
    const short_url: string = req.body.short_url;

    const queryParams: (string | number)[] = [user_id, long_url, short_url, title];
    const queryString: string = `
    INSERT INTO urls (user_id, date_created, long_url, short_url, title)
    VALUES ($1, Now(), $2, $3, $4)
    RETURNING *;
    `;

    db.query(queryString, queryParams)
      .then((data: any) => {
        res.json(data.rows);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  
  });



  //Route to delete a user's short URL:
  router.delete('/dashboard/:user_id/:url_id', (req: Request, res: Response) => {
    const user_id: string | number = req.params.user_id;
    const url_id: string | number = req.params.url_id;

    const queryParams: (string | number)[] = [user_id, url_id];
    const queryString: string = `
    DELETE FROM urls
    WHERE user_id = $1
    AND urls.id = $2
    RETURNING *;
    `;

    db.query(queryString, queryParams)
      .then((data: any) => {
        res.json(data.rows);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  
  });


  //Route to get visits count:
  router.get('/visits/:url_id', (req: Request, res: Response) => {
    const url_id: string | number = req.params.url_id;

    const queryParams: (string | number)[] = [url_id];
    const queryString: string = `SELECT * FROM visits WHERE url_id = $1;`

    db.query(queryString, queryParams)
      .then((data: any) => {
        res.json(data.rows);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });

  });



  //Route to increment visits count:
  router.post('/visits/:url_id', (req: Request, res: Response) => {
    const url_id: string | number = req.params.url_id;

    const queryParams: (string | number)[] = [url_id];
    const queryString: string = `
    INSERT INTO visits (url_id, date_visited)
    VALUES ($1, Now())
    RETURNING *;
    `;

    db.query(queryString, queryParams)
      .then((data: any) => {
        console.log('EDIT BACK-END', data.rows);
        res.json(data.rows);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  
  });

  return router;
};

//module.exports = router;