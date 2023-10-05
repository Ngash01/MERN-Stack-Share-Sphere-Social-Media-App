import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String,
        default:""
    },
    likes:{
        type:Array,
        default:[]
    },
    date:{
        type:String,
        default:""
    },

    profession: {
        type: String,
        default: ""
    },
    milestone: {
        type: String,
        default: ""
    }

},{
    timestamps:true
})

const Posts = mongoose.model("posts", PostSchema);

export default Posts;



