import express, { Request, Response } from 'express';
import Event from './event.interface';
import Controller from '../interfaces/controller.interface';
import eventModel from './event.model';

class EventsController implements Controller {
  public path = '/events';
  public router = express.Router();
  private event = eventModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllEvents);
    this.router.patch(`${this.path}/:id`, this.modifyEvent);
  }

  private getAllEvents = (req: Request, res: Response) => {
    this.event.find()
      .then(events => {
        res.send(events);
      });
  };

  private modifyEvent = (req: Request, res: Response) => {
    const id = req.params.id;
    const eventData: Event = req.body;
    this.event.findByIdAndUpdate(id, eventData, { new: true})
      .then(event => {
        res.send(event);
      });
  }
}

export default EventsController;
