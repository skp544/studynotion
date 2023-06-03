const Profile = require("../models/profile");
const User = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    // get data
    const { dateOfBirth = "", about = "", contactNumber } = req.body;
    // get user id/
    const id = req.user.id;
    // validation
    // if (!contactNumber || !gender) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All filed required",
    //   });
    // }
    // find profile
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    // update profile

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    // profileDetails.gender = gender;

    await profile.save();

    return res.json({
      success: true,
      message: "Profile Updated Successfully",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    // TODO: Find More on Job Schedule
    // const job = schedule.scheduleJob("10 * * * * *", function () {
    // 	console.log("The answer to life, the universe, and everything!");
    // });
    // console.log(job);
    const id = req.user.id;

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Profile.findByIdAndDelete({ _id: user.additionalDetails });

    await User.findByIdAndDelete({ _id: id });
    // todo: hw enrool user for, encr
    return res.status(200).json({
      success: true,
      message: "Account Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Account deletion failed",
    });
  }
};

// explore how canwe schedule this deletion

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);

    return res.status(200).json({
      success: true,
      message: "User Data fetched",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Can't find the user",
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    console.log(image);

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );

    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({ _id: userId })
      .populate("courses")
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
