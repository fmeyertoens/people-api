"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_model_1 = __importDefault(require("./event.model"));
class EventsController {
    constructor() {
        this.path = '/events';
        this.router = express_1.default.Router();
        this.event = event_model_1.default;
        this.getAllEvents = (req, res) => {
            this.event.find()
                .then(events => {
                res.send(events);
            });
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getAllEvents);
    }
}
exports.default = EventsController;
//# sourceMappingURL=event.controller.js.map