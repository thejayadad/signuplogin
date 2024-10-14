import User from "../models/User.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config()


const signToken = (id) => {
	// jwt token
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};


export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if any of the required fields are missing
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields required",
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });
        const token = signToken(newUser._id);
        res.cookie("jwt", token, {
            httpOnly: true, // prevents XSS attacks
            sameSite: "strict", // prevents CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });

        res.status(201).json({
            success: true,
            user: newUser,
        });
    } catch (error) {
        console.log("Error with signup:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const token = signToken(user._id);

		res.cookie("jwt", token, {
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({
			success: true,
			user,
			token
		});
	} catch (error) {
		console.log("Error in login controller:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};
export const logout = async (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};