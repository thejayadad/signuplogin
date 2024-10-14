import Post from "../models/Post.js"; // Ensure this path is correct
import cloudinary from "../lib/cloudinary.js";

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title, description, postImage } = req.body; // Make sure to destructure postImage

        let imageUrl = ""; // Variable to hold the uploaded image URL

        // Upload image to Cloudinary if provided
        if (postImage) { // Change from image to postImage
            if (postImage.startsWith("data:image")) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(postImage);
                    imageUrl = uploadResponse.secure_url; // Get the uploaded image URL
                } catch (uploadError) {
                    console.error("Error uploading image:", uploadError);
                    return res.status(400).json({
                        success: false,
                        message: "Error uploading image",
                    });
                }
            } else {
                imageUrl = postImage; // If postImage is a URL, use it directly
            }
        }

        // Create the post
        const newPost = await Post.create({
            title,
            description,
            postImage: imageUrl, // Save the uploaded image URL or provided URL
            authorId: req.user.id, // Associate post with the user
        });

        res.status(201).json({
            success: true,
            post: newPost,
        });
    } catch (error) {
        console.log("Error creating post: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// Update an existing post
export const updatePost = async (req, res) => {
    try {
        const { title, description, postImage } = req.body; // Destructure postImage from the request body

        // Initialize updatedData object
        const updatedData = {};

        // Update title and description if provided
        if (title) updatedData.title = title;
        if (description) updatedData.description = description;

        // Handle image update
        if (postImage) { // Change from image to postImage
            if (postImage.startsWith("data:image")) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(postImage);
                    updatedData.postImage = uploadResponse.secure_url; // Update the postImage field with the uploaded URL
                } catch (uploadError) {
                    console.error("Error uploading image:", uploadError);
                    return res.status(400).json({
                        success: false,
                        message: "Error uploading image",
                    });
                }
            } else {
                updatedData.postImage = postImage; // If postImage is a URL, use it directly
            }
        }

        // Find and update the post
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({
            success: true,
            post: updatedPost,
        });
    } catch (error) {
        console.log("Error updating post: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// Delete a post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.log("Error deleting post: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name email image"); // Adjust fields as needed

        res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        console.log("Error getting posts: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Get a single post
export const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("authorId", "name email image"); // Correct the populate path

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({
            success: true,
            post,
        });
    } catch (error) {
        console.log("Error getting post: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
