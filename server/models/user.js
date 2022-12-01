import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim : true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:32
    },
    about:{
        type:String,
        trim:true
    },
    address: {
        type: String,
        trim: true,
      },
    role:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

export default mongoose.model("User",userSchema);