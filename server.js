import express from "express";
import  dotenv  from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import{dirname, } from "path";
import roomRouter from "./Routes/roomRoute.js";
import { fileURLToPath } from "url";
import bookingRouter from "./Routes/bookingRoute.js";
import userRoutes from "./Routes/userRoute.js";
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 8200;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images')
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    }
  })
  
const upload = multer({ storage: storage })

const app = express();
dotenv.config();

//middlewears
//app.use(cors({origin:["http:localhost:3000", "https://sore-cyan-ox-suit.cyclic.app", "https://ayalla.netlify.app"]}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use("/images", express.static((__dirname, '/images')));
app.use(cookieParser());

mongoose.set('strictQuery', true);
// const option = {
//     socketTimeoutMS: 30000,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
    
// };
const connectDB = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected')
    }catch(err){
        console.log(err);
    }
}

// file upload
app.post("/api/upload", upload.single('file'), (req, res)=>{
    res.status(200).send({
        status: "success",
        message: "Upload successful",
    })
})

//routes
app.use("/api/v1", roomRouter);
app.use("/api/v1", bookingRouter);
app.use("/api/v1", userRoutes);


app.use("/", (req, res)=>{
    res.send("Ayalla server has been hacked!")
});



app.listen(port, ()=>{
    connectDB();
     console.log('Server is running')
});