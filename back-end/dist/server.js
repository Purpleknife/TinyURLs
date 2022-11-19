"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// load .env data into process.env
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = require('./db/connection');
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const method_override_1 = __importDefault(require("method-override"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// Express Configuration
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_session_1.default)({
    name: process.env.SESSION_NAME,
    keys: [process.env.SESSION_KEY]
}));
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.static('public'));
// Routes
const userRoutes = require('./routes/users');
app.use('/', userRoutes(db));
app.listen(port, () => {
    console.log(`Express is listening on port ${port}!`);
});
