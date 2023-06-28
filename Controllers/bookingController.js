import bookingModel from "../Models/bookingModel.js";

import nodemailer from 'nodemailer';

export const newBooking = async (req, res) => {

    const transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        service: "gmail",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASS,
        },

    });


    // const paymentOptions

    const paymentOptions = {
        from: process.env.EMAIL_AUTH_USER,
        to: req.body.email,
        subject: 'AYALLA HOTELS -MAKE RESERVATION PAYMENT',
        html: `<div style="text-align: center; justify-content:'center'; align-items:'center'; margin-right:'auto'; margin-left:'auto'; ">
                    <h1  style="font-weight:'bold'; font-size: 30px;">Payment Details,</h1>
                    <p style="font-size: 14px;">Kindly, make payment for your reservation and come along with transaction receipt!</p>
                    <br/>
                </div>

                <div style="display: flex; align-items: flex-start; justify-content:flex-start; padding: 10px; gap: 20px;">
                
                <div style="background-color:#a8c7fa; padding: 20px;" >
                <h3>Account</h3>
                <p style="font-size: 14px;"><span>Account Number:</span></p>
                <p style="font-size: 14px;"><span>Account Name: </span></p>
                <p style="font-size: 14px;"><span>Bank Name:</span></p>
                </div>

                <div style="padding: 20px">
                <h3>Details</h3>
                <p style="font-size: 14px;"><span>1017548507</span></p>
                <p style="font-size: 14px;"><span>AYALA HOTELS LIMITED</span></p>
                <p style="font-size: 14px;"><span>UNITED BANK OF AFRICA (UBA)</span></p>

                </div>

                </div>

                <div style="text-align: center; justify-content:'center'; align-items:'center'; margin-right:'auto'; margin-left:'auto'; ">
                <img src="https://ayalla.netlify.app/assets/logo.png" alt="ayalla logo" />    
            <h1  style="font-weight:'bold'; font-size: 20px;">Ayalla Hotels Limited</h1>
                <p style="font-size: 14px; cursor: pointer;">Visit: https://ayallahotels.com</p>
            </div>
                `
    }

    const mailOptions = {
        from: process.env.EMAIL_AUTH_USER,
        to: `${req.body.email}, softmerit25@gmail.com, ayallahotels@yahoo.com`,
        subject: 'AYALLA HOTELS BOOKING RESERVATION',
        html: `<div style="text-align: center; justify-content:'center'; align-items:'center'; margin-right:'auto'; margin-left:'auto'; ">
                    <h1  style="font-weight:'bold'; font-size: 30px;">Welcome, ${req.body.firstname}</h1>
                    <p style="font-size: 14px;">Here is your booking details. Enjoy your stay with us!</p>
                    <br/>
                </div>

                <div style="display: flex; align-items: flex-start; justify-content:flex-start; padding: 10px; gap: 20px;">
                
                <div style="background-color:#a8c7fa; padding: 20px;" >
                <h3>Room Details</h3>
                <p style="font-size: 14px;"><span>Room Name: ${req.body.roomname}</span></p>
                <p style="font-size: 14px;"><span>Room Price: ₦${req.body.roomprice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                <p style="font-size: 14px;"><span>Room Location: ${req.body.roomlocation}</span></p>
                <p style="font-size: 14px;"><span>Room Quantity: ${req.body.qty}</span></p>
                <p style="font-size: 14px;"><span>Total Amount: ₦${req.body.grandTotal?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                </div>

                <div style="padding: 20px">
                <h3>Customer Details</h3>
                <p style="font-size: 14px;"><span>First Name: ${req.body.firstname}</span></p>
                <p style="font-size: 14px;"><span>Last Name: ${req.body.lastname}</span></p>
                <p style="font-size: 14px;"><span>Email : ${req.body.email}</span></p>
                <p style="font-size: 14px;"><span>Phone No.: ${req.body.phone}</span></p>
                <p style="font-size: 14px;"><span>Country: ${req.body.country}</span></p>
                <p style="font-size: 14px;"><span>City: ${req.body.city}</span></p>
                <p style="font-size: 14px;"><span>Arrival Time: ${req.body.arrival}</span></p>
                <p style="font-size: 14px;"><span>Address: ${req.body.address}</span></p>
                <p style="font-size: 14px;"><span>Check-In-Time: ${req.body.checkin}</span></p>
                <p style="font-size: 14px;"><span>Check-Out-Time: ${req.body.checkout}</span></p>
                <p style="font-size: 14px;"><span>No. of Adult: ${req.body.adult}</span></p>
                <p style="font-size: 14px;"><span>No. of Children: ${req.body.child}</span></p>
                <p style="font-size: 14px;"><span>Special Request: ${req.body.request}</span></p>

                </div>

                </div>

                <div style="text-align: center; justify-content:'center'; align-items:'center'; margin-right:'auto'; margin-left:'auto'; ">
                    <img src="https://ayalla.netlify.app/assets/logo.png" alt="ayalla logo" />    
                <h1  style="font-weight:'bold'; font-size: 20px;">Ayalla Hotels Limited</h1>
                    <p style="font-size: 14px; cursor: pointer;">Visit: https://ayallahotels.com</p>
                </div>
                `
    }

    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success, "Server is ready to take our messages");
        }
    });


    try {
        const newBooking = new bookingModel(req.body);
        await newBooking.save();
        await transporter.sendMail(mailOptions)
        await transporter.sendMail(paymentOptions)
        res.status(200).send({
            status: "success",
            data: newBooking,
            message: "Room sucessfully booked!"
        })
    } catch (err) {
        res.status(401).send(`${err.message}`)
    }
}