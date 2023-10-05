import Posts from "../models/Post.js"
import Users from "../models/User.js";


// create a post

export const CreatePosts = async(req, res)=>{
    try{
        const createdPost = await Posts.create({
            userId: req.body.userId,
            desc: req.body.desc,
            img: req.body.img,
            likes:req.body.likes
        });
        res.status(200).send({msg:"Post created successfully!", createdPost})

    }catch(err){
        res.status(403).send(err)
    }
}

// update a post
export const updatePost = async(req, res)=>{
    try{
         const post = await Posts.findById(req.params.id);
        //  console.log(post.desc)

         if(post.userId === req.body.userId){
            const updated = await post.updateOne({
                desc: req.body.desc,
                likes:req.body.likes,
                img:req.body.img,
                date: req.body.date
            },{new:true})
            res.status(200).send({msg:"user updated successfully", updated})

         }else{
            res.status(403).send("You can only update your own posts");
         }

    }catch(err){
        res.status(403).send(err)
    }
}

// delete a post

export const deletePost = async(req, res)=>{
    try{
        const post = await Posts.findById(req.params.id);

    if(post.userId === req.body.userId){
        const deleted = await post.deleteOne()
        res.status(200).send("Post deleted successfully!")
    }else{
        res.status(403).send("You can only delete your own posts!")
    }
    }catch(err){
        res.status(403).send(err)
    }
}

// like a post
export const LikePost = async(req, res)=>{
    try{
        const post = await Posts.findById(req.params.id);

        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).send("The post has been liked!")
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).send("The post has been disliked!")
        }
    }catch(err){
        res.status(403).send(err)
    }

}

// get a post

export const getPost = async(req, res)=>{
    const id = req.params.id;

    try{
        const post = await Posts.findById(id);
        res.status(200).send(post)

    }catch(err){
        res.status(403).send(err)
        console.log(err)
    }
}

// get Timeline posts

export const getTimeLine = async(req, res)=>{
    try{
        // get current User
        const currentUser = await Users.findById(req.params.id);
        // get currrent User Posts
        const currentUserPosts = await Posts.find({userId: currentUser._id})
        // get friends posts
        const friendsPosts = await Promise.all(
            currentUser.following.map((friendpost)=>{
                return Posts.find({userId: friendpost})
            })
        )
        res.status(200).send(currentUserPosts.concat(...friendsPosts))
        
    }catch(err){
        res.status(500).send(err)
    }
}

// get user posts

export const UsersPosts = async(req, res)=>{
    try{
        const user = await Users.findOne({username: req.params.username})
        const post = await Posts.find({userId: user._id})
        res.status(200).send(post)

    }catch(err){
        res.status(403).send(err)
    }
}


