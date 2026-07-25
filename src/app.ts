import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Controller from 'interfaces/controller.interface';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.intializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private intializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.get('/health', (_req, res) => {
      res.status(200).json({ status: 'ok' });
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  }

  public async connectToDatabase() {
    const { MONGO_URI } = process.env;

    if (!MONGO_URI) {
      throw new Error('MONGO_URI must be set');
    }

    await mongoose.connect(MONGO_URI);
  }
}

export default App;
