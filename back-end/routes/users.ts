import dotenv from 'dotenv';
dotenv.config();

const express = require('express');
const router  = express.Router();

module.exports = (db: any) => {
  // Routes in here.

  return router;
};

//module.exports = router;