import express from 'express';
import bodyParser from 'body-parser';
import App from './app';
import EventsController from './events/event.controller';

const app = new App(
  [
    new EventsController(),
  ],
  5000,
);

app.listen();
