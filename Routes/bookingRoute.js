import Router from 'express';
import { newBooking } from '../Controllers/bookingController.js';

const bookingRouter = Router();

bookingRouter.post('/newbooking', newBooking);

export default bookingRouter;