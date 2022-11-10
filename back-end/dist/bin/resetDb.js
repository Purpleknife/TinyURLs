"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// other dependencies
const fs = require('fs');
const db = require('../db/connection');
// Loads the schema files from db/schema
const runSchemaFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaFilenames = fs.readdirSync('./db/schema');
    for (const fn of schemaFilenames) {
        const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
        yield db.query(sql);
    }
});
const runSeedFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaFilenames = fs.readdirSync('./db/seeds');
    for (const fn of schemaFilenames) {
        const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
        yield db.query(sql);
    }
});
const runResetDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        process.env.DB_HOST &&
            console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);
        yield runSchemaFiles();
        yield runSeedFiles();
        process.exit();
    }
    catch (err) {
        process.exit();
    }
});
runResetDB();
