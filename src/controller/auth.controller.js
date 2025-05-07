import { generateToken } from "../lib/utils.js";
import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {fullname, email, password} = res.body;
    try{
        if (password.length < 6){
            return res.status(400).json({ message: "passwprd must be at least 6 characters" });
        }

        const user = await User.findone({ email});

        if(user) return res.status(400).json({ message: "user already exists"};

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User({
            fullname,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // generate token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            res.status(400).json({ message: "Invalid user data"});
        }
    
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const login = async (req, res) => {
    res.send("login routes");
}

export const logout = async (req, res) => {
    res.send("logout routes");
}
