"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const event_controller_1 = __importDefault(require("./events/event.controller"));
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
validateEnv_1.default();
const app = new app_1.default([
    new event_controller_1.default(),
]);
app.listen();
//# sourceMappingURL=server.js.map