import Users from "../models/User.js";
import bcrypt from "bcrypt"

// update user

export const UpdateUser = async(req, res)=>{
    const id = req.params.id;
    let hashedPass;

 

    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        hashedPass = await bcrypt.hash(req.body.password, salt)
    }

    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        const updatedUser = await Users.findByIdAndUpdate(id,{
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            from: req.body.from,
            relationship: req.body.relationship,
            profession: req.body.profession,
            milestone: req.body.milestone
        },{new:true})
        const {password, ...info } = updatedUser._doc

        res.status(200).send(info)

    }else{
        res.status(401).send("You can only update your own account")
    }

    }

// delete user

    export const DeleteUser  = async(req, res)=>{
        const id = req.params.id;

        if(req.body.userId === id || req.body.isAdmin){
            try{
                const deletedUser = await Users.findByIdAndDelete(id)
                res.status(200).send('User deleted Successfully')
                
            }catch(err){
                res.status(403).send(err)
            }
        }else{
            res.status(403).send("You can only delete your own account!")
        }
    }

// get a user

export const getUser = async(req, res)=>{
    const userId = req.query.userId;
    const username = req.query.username;

    try{
        const singleUser = userId ? await Users.findById(userId) : await Users.findOne({username: username});
        const {password, ...info} = singleUser._doc;

        res.status(200).send(info);

    }catch(err){
        res.status(400).send(err)
    }
}

// get all users

export const allUsers = async(req, res)=>{
    try{
        const everyUser = await Users.find()
        res.status(200).send(everyUser)
    }catch(err){
        res.status(403).send(err)
    }
}

// follow a user
export const followUser = async(req, res)=>{
    const id = req.params.id;

    if(req.body.userId !== id){
        try{
            const user = await Users.findById(id);
            const currentUser = await Users.findById(req.body.userId);
            
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}})
                await currentUser.updateOne({$push: {following: req.params.id}});

                res.status(200).send("User followed successsfully!")

            }else{
                res.status(403).send("You already follow this user!")
            }

        }catch(err){
            res.status(400).send(err)
        }

    }else{
        res.status(403).send("You cannot follow yourself!")
    }
}

// unfollow a user

export const UnfollowUser = async(req, res)=>{
    const id = req.params.id;

    if(req.body.userId !== id){
        try{
            const user = await Users.findById(id);
            const currentUser = await Users.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers:req.body.userId}})
                await currentUser.updateOne({$pull:{following: req.params.id}})

                res.status(200).send("You unfollowed this user")
            }else{
                res.status(403).send("You don't follow this user!")
            }
        }   
        catch(err){
            res.status(403).send(err)
        }
    }else{
        res.status(403).send("You cannot unfollow yourself!")
    }
}

// get Friends/Following Id's

export const getFriends = async(req, res)=>{
    const id = req.params.userId

    try{
        const currUser = await Users.findById(id)
        if(currUser){
            const followingIds = await Promise.all(
                await currUser.following.map((followingId)=>{
                    return Users.findById(followingId)  //get all the information from these following ids
                }) 
            )
            // res.status(200).send(followingIds)
            // now extract the important details
            
            let followingsList = []

            followingIds.map((followingId)=>{
                const {_id, username, profilePic} = followingId
                followingsList.push({_id, username, profilePic})
            })
            res.status(200).send(followingsList)

        }else{
            res.status(404).send("User does not exist")
        }

    }catch(err){
        res.status(403).send(err)
    }
}


// 400 - Bad request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found








// // get User Friends
// export const getFriends = async(req, res)=>{
//     const id = req.params.userId;

//     try{
//         const user = await Users.findById(id);
//         if(user){

//         const friendPosts = await Promise.all(
//             await user.following.map((friendId)=>{
//                 return Users.findById(friendId)
//             })
//         )

//         let friendList = []

//         friendPosts.map((friend)=>{
//             const {_id, username, profilePic} = friend
//             friendList.push({_id, username, profilePic})
//         })

//         res.status(200).send(friendList)

//         }
//         else{
//             res.status(403).send("User not found!")
//         }

//     }catch(err){
//         res.status(403).send(err)
//         console.log(err)
//     }
// }
