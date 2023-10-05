import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import multer from "multer"
import path from "path";
import Posts from "./models/Post.js";


const app = express();


app.use(cors());
app.use(bodyParser.json());
// app.use(morgan());
// app.use(helmet("common"))

app.get("/", (req,res)=>{
  res.status(200).send("Lama dev social media rest api")
})

app.use('/users', usersRouter)

app.use("/api/auth", authRouter)

app.use('/posts', postRouter)

app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "public/Images")
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + path.basename(file.originalname.replace(/\s+/g, "_")))
  }
})

const upload = multer({storage})

 app.post("/upload", upload.single("myImg"), async(req, res)=>{
  try{
    const Img = req.file.filename
    res.status(200).send(Img)

  }catch(err){
    console.log(err)
  }
})


mongoose.connect(process.env.MONGODB_URL).then((res)=>{
  console.log("Connection with database established successfully");
  app.listen(5000, console.log("Server running on http://localhost:5000"))
})




