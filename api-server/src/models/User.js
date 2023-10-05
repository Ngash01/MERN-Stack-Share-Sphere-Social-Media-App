import mongoose from "mongoose";

export const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:3,
        max:20,
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default: ""
    },
    following:{
        type:Array,
        default:[]
    },
    followers:{
        type:Array,
        default: []
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type: String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }

},{
    timestamps:true
})

const Users = mongoose.model("users", UserSchema);
export default Users