import express, { Request, Response } from 'express';
import Event from './event.interface';

class EventsController {
  public path = '/events';
  public router = express.Router();

  private events: Event[] = [
    {
      title: 'JS Conf 2020',
      description: 'More than 100 talks',
      price: 200,
      date: '2020-09-15T10:00:00.000Z'
    }
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllEvents);
  }

  getAllEvents = (req: Request, res: Response) => {
    res.send(this.events);
  }
}

export default EventsController;
