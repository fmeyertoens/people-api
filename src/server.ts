import App from './app';
import EventsController from './events/event.controller';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';

validateEnv();

async function start() {
  const app = new App(
    [
      new EventsController(),
    ],
  );

  await app.connectToDatabase();
  app.listen();
}

start().catch(error => {
  console.error('Unable to start REST server', error);
  process.exitCode = 1;
});
