import express from "express";
import { DeleteUser, UnfollowUser, UpdateUser, allUsers, followUser, getFriends, getUser } from "../controllers/usersControllers.js";

const router =  express.Router();

router.put("/update/:id", UpdateUser)

router.delete("/delete/:id", DeleteUser)

router.get("/", allUsers)

router.get('/one',  getUser)

router.put("/:id/follow", followUser)

router.put("/:id/unfollow", UnfollowUser)

router.get('/friends/:userId', getFriends)

export default router;



