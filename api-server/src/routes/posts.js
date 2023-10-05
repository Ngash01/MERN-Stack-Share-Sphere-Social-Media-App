import express from "express"
import { CreatePosts, LikePost, UsersPosts, deletePost, getPost, getTimeLine, updatePost } from "../controllers/PostsController.js";

const router = express.Router();

router.get('/', async(req, res)=>{
    res.status(200).send("Social media app Posts!")
})

router.post("/create", CreatePosts);

router.put("/update/:id", updatePost);

router.delete("/delete/:id", deletePost);

router.put("/like/:id", LikePost);

router.get("/:id", getPost)

router.get('/profile/:username', UsersPosts)

router.get("/timeline/:id", getTimeLine)

export default router;


