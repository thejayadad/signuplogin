import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
			required: true,
        },
        description: {
            type: String,
            required: true,

        },
        postImage: {
            type: String,
            required: true,

        },
        published: {
            type: Boolean,
            default: false
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    { timestamps: true }
)

const Post = mongoose.model("Post", postSchema);

export default Post;