import { User } from "../models/user.models.js";


export const updateuserController = async (req, res) => {
    const data = req.body;
    // console.log("Data.....", data);

    // const params = req.params;
    // console.log("Params....", params);
    const user_id = req.user._id;

    try {
        const {
            username,
            summary,
            country,
            college,
            language_used,
            social_links,
        } = data;

        const updateuser = await User.findByIdAndUpdate(user_id, {
            username: username,
            summary: summary,
            country: country,
            college: college,
            language_used: language_used,
            social_links: social_links,
        });
        await updateuser.save();

        return res.status(201).json({
            success: true,
            message: "User Profile Updated Successfully",
            data: data
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "Internal Server Error in Updating User......"
        });
    }
}

export const getUserController = async (req, res) => {
    // console.log("User ", req.user);
    const user_id = req.user._id;
    // console.log("User ID ", user_id);

    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not Exist !!"
            })
        }
        user.password = null;
        return res.status(201).json({
            success: true,
            message: "User Found Successfully !",
            data: user
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "Internal Server Error in Updating User......"
        });
    }
}   



export const uploadProfilePicController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        // The relative path where the file is stored
        const filePath = `/uploads/${req.file.filename}`;

        // Update the user's profile_pic in MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { profile_pic: filePath },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile picture uploaded successfully!",
            profile_pic: filePath,
            data: updatedUser
        });
    } catch (error) {
        console.error("Profile upload error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error during profile upload"
        });
    }
};
