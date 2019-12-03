"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_model_1 = __importDefault(require("./event.model"));
const mockData = require('./event-mock-100.json');
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
        this.getAllEventsLocal = (req, res) => {
            res.send(mockData);
        };
        this.modifyEvent = (req, res) => {
            const id = req.params.id;
            const eventData = req.body;
            this.event.findByIdAndUpdate(id, eventData, { new: true })
                .then(event => {
                res.send(event);
            });
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getAllEvents);
        this.router.get(`${this.path}Local`, this.getAllEventsLocal);
        this.router.patch(`${this.path}/:id`, this.modifyEvent);
    }
}
exports.default = EventsController;
//# sourceMappingURL=event.controller.js.map