import App from './app';
import EventsController from './events/event.controller';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new EventsController(),
  ],
);

app.listen();
