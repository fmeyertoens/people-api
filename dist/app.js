"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this.connectToDatabase();
        this.intializeMiddlewares();
        this.initializeControllers(controllers);
    }
    intializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use(cors_1.default());
    }
    initializeControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });
    }
    connectToDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, } = process.env;
        mongoose_1.default.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map