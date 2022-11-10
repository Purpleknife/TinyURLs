import dotenv from 'dotenv';
dotenv.config();

// other dependencies
const fs = require('fs');
const db = require('../db/connection');

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  const schemaFilenames = fs.readdirSync('./db/schema');
  
  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  const schemaFilenames = fs.readdirSync('./db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    await db.query(sql);
  }
};


const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

    await runSchemaFiles();
    await runSeedFiles();
    process.exit();
  } catch (err) {
    process.exit();
  }
};

runResetDB();