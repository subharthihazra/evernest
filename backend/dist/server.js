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
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const auth_1 = __importDefault(require("./routes/auth"));
const ErrorMiddleware_1 = __importDefault(require("./errorhandlers/ErrorMiddleware"));
const connect_1 = __importDefault(require("./db/connect"));
const app = (0, express_1.default)();
// parse form data
app.use(express_1.default.urlencoded({ extended: false }));
// parse json
app.use(express_1.default.json());
// parse cookie
app.use((0, cookie_parser_1.default)());
// Adding Auth Router
app.use(auth_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// ERROR middleware (must be in last)
app.use(ErrorMiddleware_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)();
        const port = String(env_1.SERVER_PORT) || 5000;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port} ...`);
        });
    }
    catch (err) {
        console.log(err);
    }
});
startServer();
