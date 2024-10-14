import express from "express"
import { protectRoute } from "../middleware/auth.js"
import { createPost, updatePost, deletePost, getAllPosts, getSinglePost } from "../controllers/postController.js"

const router = express.Router()

// Route to create a post
router.post("/", protectRoute, createPost);

// Route to update a post
router.put("/:id", protectRoute, updatePost);

// Route to delete a post
router.delete("/:id", protectRoute, deletePost);

// Route to get all posts
router.get("/", protectRoute, getAllPosts);

// Route to get a single post
router.get("/:id", protectRoute, getSinglePost);


export default router

