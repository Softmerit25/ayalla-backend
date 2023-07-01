import User from "../Models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// register user
export const userRegister = async (req, res) => {
    const { email, password } = req.body;

    if(!email) return res.status(401).json('Enter Email Address!');
    if(!password || password.length < 3) return res.status(401).json('Enter Password Correctly!')  
    // finding if user already exist in DB
    const userExisting = await User.findOne({ email });
    if (userExisting) return res.status(401).json('User with the email already exist!')

    // hash password before saving to db

    const hashedPassword = await bcrypt.hashSync(password, 10)
    try {
        const newUser = new User({
            email,
            password: hashedPassword
        })

        await newUser.save();
        res.status(200).json({ newUser, msg: "Account Successfully Created!" })
    } catch (err) {
        res.status(400).json(err)
    }

}


// login user
export const userLogin = async (req, res, next) => {

    if(!req.body.email) return res.status(401).json('Enter Email Address!');
    if(!req.body.password || req.body.password.length < 3) return res.status(401).json('Enter Password Correctly!') 

    try {
        
        // check if userexist
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) return res.status(401).json("User with the provided email not found!")

        const isCorrect = await bcrypt.compareSync(req.body.password, existingUser.password);
        if (!isCorrect) return res.status(402).json("User password is incorrect!");

        // create a token for the user;

        const token =  jwt.sign({id: existingUser._id}, process.env.JWT_TOKEN, {
            expiresIn:"1d"
        })

        const {password,  ...payload} = existingUser._doc;

        res.cookie('accesstoken', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        }).status(200).json({payload, mgs:"Login Successful!"});
    } catch (err) {
        next(err)
    }

}


// logout user
export const userLogout = async (req, res, next)=>{
   try{
    res.clearCookie('accesstoken',{
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/'
    }).status(201).json("LogOut Successful")
   }catch(err){
    next(err)
   }
}