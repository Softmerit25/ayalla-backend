import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    roomname: { type: String,},
    roomprice: {type: Number,},
    qty: {type: Number},
    total: {type: Number},
    firstname: {type: String,  },
    lastname: {type: String, },
    email: {type: String, },
    phone: {type: String, },
    country: {type: String, },
    city: {type: String, },
    arrival: {type: String, },
    address: {type: String, },
    checkin: {type: String, },
    checkout: {type: String, },
    adult: {type: Number, },
    child: {type: Number, default: 0},
    request: {type: String, },
},{
    timestamp: true,
})

const bookingModel = mongoose.model('Booking', bookingSchema);

export default bookingModel;