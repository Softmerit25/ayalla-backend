
import roomModel from "../Models/roomModel.js";

//adding room to db
export const addRoom = async (req, res)=>{

    try{
        const addRoom = new roomModel(req.body);
       const roomData = await addRoom.save();
        res.status(200).send({
            status: "success",
            data: roomData,
            message: "Successful"
        })
    }catch(err){
        res.status(401).send(`Something went wrong ${err}`)
    }

}

//GET ALL ROOMS

export const getRooms = async (req, res)=>{
    try{
        const rooms = await roomModel.find({}).sort({createdAt: -1});
        res.status(200).send({
            status: "success",
            data: rooms,
            message: "Successful"
        })
    }catch(err){
        res.status(402).send(`Something went wrong ${err}`)
    }

}

//GET ROOMS BY LOCATION
export const getRoomByLocation = async (req, res)=>{
    const rLocation = req.query.location;
    try{
        const roomLocation = await roomModel.findOne({roomlocation: rLocation});
         !roomLocation && res.status(404).send("Room not available in the specified location.");

        res.status(200).send({
            status: "success",
            data: roomLocation,
            message: "Successful"
        })
    }catch(err){
        res.status(402).send(`Something went wrong ${err}`)
    }

}