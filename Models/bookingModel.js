import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    roomname: { type: String,},
    roomprice: {type: Number,},
    roomlocation: {type: String,},
    qty: {type: Number},
    grandTotal: {type: Number},
    firstname: {type: String, required:[true, "First Name is Required"] },
    lastname: {type: String, required:[true, "Last Name is Required"]},
    email: {type: String, required:[true, "Email is Required"]},
    phone: {type: String, required:[true, "Phone Number is Required"] },
    country: {type: String, required:[true, "Country is Required"]},
    city: {type: String,  required:[true, "City is Required"]},
    arrival: {type: String, required:[true, "arrival Time is Required"]},
    address: {type: String, required:[true, "Address is Required"]},
    checkin: {type: String, required:[true, "Check In Date is Required"]},
    checkout: {type: String, required:[true, "Check Out Date is Required"]},
    adult: {type: Number, required:[true, "Adult Field is Required"]},
    child: {type: Number, default: 0},
    request: {type: String, },
},{
    timestamp: true,
})

const bookingModel = mongoose.model('Booking', bookingSchema);

export default bookingModel;