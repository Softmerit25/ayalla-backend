
import roomModel from "../Models/roomModel.js";

//adding room to db
export const addRoom = async (req, res) => {

    try {
        const addRoom = new roomModel(req.body);
        const roomData = await addRoom.save();
        res.status(200).send({
            status: "success",
            data: roomData,
            message: "Successful"
        })
    } catch (err) {
        res.status(401).send(`Something went wrong ${err}`)
    }

}


//GET SINGLE ROOMS

export const getSingleRoom = async (req, res) => {
    try {
        const singleRoom = await roomModel.findById(req.params.id);
        res.status(200).send({
            status: "success",
            data: singleRoom,
            message: "Successful"
        })
    } catch (err) {
        res.status(402).send(`Something went wrong ${err}`)
    }

}


//GET ALL ROOMS

export const getRooms = async (req, res) => {
    try {
        const rooms = await roomModel.find({}).sort({ createdAt: -1 });
        res.status(200).send({
            status: "success",
            data: rooms,
            message: "Successful"
        })
    } catch (err) {
        res.status(402).send(`Something went wrong ${err}`)
    }

}

//GET ROOMS BY LOCATION
export const getAbujaRooms = async (req, res) => {
    // const q = req.query;
    // const filter = {
    //     roomlocation: { $regex: q.location, $options: 'i' }
    // }

    try {
        const roomAbuja= await roomModel.find({roomlocation:'Abuja'});
        !roomAbuja && res.status(404).send("Room not available in the specified location.");

        res.status(200).send({
            status: "success",
            data: roomAbuja,
            message: "Successful"
        })
    } catch (err) {
        res.status(402).send(`Something went wrong ${err}`)
    }

}


export const getYenagoaRooms = async (req, res) => {
    // const q = req.query;
    // const filter = {
    //     roomlocation: { $regex: q.location, $options: 'i' }
    // }

    try {
        const roomYenagoa = await roomModel.find({roomlocation:'Yenagoa'});
        !roomYenagoa && res.status(404).send("Room not available in the specified location.");

        res.status(200).send({
            status: "success",
            data: roomYenagoa,
            message: "Successful"
        })
    } catch (err) {
        res.status(402).send(`Something went wrong ${err}`)
    }

}


//UPDATE A ROOM
export const updateRoom = async (req, res) => {
    try {
        const existingRoom = await roomModel.findByIdAndUpdate(req.params.id);
        if (existingRoom) {
            const { roomname, roomprice, roomlocation, roomimage, roomDesc } = existingRoom;
            existingRoom.roomname = req.body.roomname || roomname;
            existingRoom.roomprice = req.body.roomprice || roomprice;
            existingRoom.roomlocation = req.body.roomlocation || roomlocation;
            existingRoom.roomimage = req.body.roomimage || roomimage;
            existingRoom.roomDesc = req.body.roomDesc || roomDesc;
        }

        const updateExistingRoom = await existingRoom.save();
        res.status(200).send({
            status: "success",
            data: updateExistingRoom,
            message: "Room Updated Successful..."
        })

    } catch (err) {
        res.status(403).send(`Something went wrong ${err}`)
    }
}


//DELETE A ROOM
export const deleteSingleRoom = async (req, res) => {

    try {
        const singleRoom = await roomModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            status: "success",
            message: "Room has been Deleted"
        })
    } catch (err) {
        res.status(403).send(`Something went wrong ${err}`)
    }
}