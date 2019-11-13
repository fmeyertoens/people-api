import express, { Request, Response } from 'express';
import Event from './event.interface';
import Controller from '../interfaces/controller.interface';
import eventModel from './event.model';

class EventsController {
  public path = '/events';
  public router = express.Router();
  private event = eventModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllEvents);
  }

  getAllEvents = (req: Request, res: Response) => {
    this.event.find()
      .then(events => {
        res.send(events);
      });
  }
}

export default EventsController;
