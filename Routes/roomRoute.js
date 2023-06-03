import { addRoom, getRoomByLocation, getRooms } from "../Controllers/RoomController.js";
import { Router} from "express";

const roomRouter = Router();

roomRouter.post("/addroom", addRoom);

//GET AL ROOMS
roomRouter.get("/rooms", getRooms);

//GET ALL ROOMS BY LOCATION
roomRouter.get("/location/", getRoomByLocation);


export default roomRouter;