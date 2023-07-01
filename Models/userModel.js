import mongoose from 'mongoose';

const userSchema =  mongoose.Schema({
    email: {type: String },
    password: {type: String}
})

const User = mongoose.model('Users', userSchema);

export default User;