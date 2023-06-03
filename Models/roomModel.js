import {Schema, model} from "mongoose";

const RoomSchema = Schema({
    roomname: {type: String, required: true},
    roomprice: {type: Number, required: true},
    roomlocation: {type: String, required: false},
    roomimage: {type: String, default:''},
    roomdesc: {type: String, required: false},

},
{
    timestamp: true,
})

const roomModel = model('Rooms', RoomSchema);

export default roomModel;