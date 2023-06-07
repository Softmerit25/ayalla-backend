import { addRoom, deleteSingleRoom, getAbujaRooms, getRooms, getSingleRoom, getYenagoaRooms, updateRoom } from "../Controllers/RoomController.js";
import { Router} from "express";

const roomRouter = Router();

roomRouter.post("/addroom", addRoom);

//GET AL ROOMS
roomRouter.get("/rooms", getRooms);


//GET AL ROOMS
roomRouter.get("/room/:id", getSingleRoom);


//GET ALL ROOMS BY LOCATION
roomRouter.get("/abuja/", getAbujaRooms);
roomRouter.get("/yenagoa/", getYenagoaRooms);



//UPDATE ROOM
roomRouter.patch("/updateroom/:id", updateRoom);

//DELETE SINGLE ROOM
roomRouter.delete('/delete/room/:id', deleteSingleRoom);

export default roomRouter;