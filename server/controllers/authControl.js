const User = require("../models/user");
const Otp = require("../models/otp");
const Profile = require("../models/profile");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate"); // have to check imported correctly or not

require("dotenv").config();

// signup

exports.signUp = async (req, res) => {
  try {
    //data fetch from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // validate data

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "ALL FIELDS ARE REQUIRED",
      });
    }

    // 2 passwird match

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password does not match, Please try again!",
      });
    }

    // check user alredy exists

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered, Please Sign In to continue",
      });
    }

    // find most recent otp for thr user

    const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);

    console.log(response);

    if (response.length === 0) {
      // otp not found for the email

      return res.status(400).json({
        success: false,
        message: "The OTP is not Valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid Otp
      return res.status(400).json({
        success: false,
        message: "The OTP is not Valid",
      });
    }

    // hash password

    const hashPassword = await bcrypt.hash(password, 10);

    // create the user

    let approved = "";

    approved === "Instructor" ? (approved = false) : (approved = true);

    // creating additional profile for the user

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    // return res

    return res.status(200).json({
      success: true,
      user,
      message: "User is Registered Successfully",
    });
  } catch (error) {
    console.log("Error in sign up controller");

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "User cannot be Registered Please try again!",
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    // get data from request body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "ALL FIELDS ARE REQUIRED",
      });
    }
    // validate data

    // user check exist or not

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not exist. Please Sign up first",
      });
    }

    // generate jwt token and compare password

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;

      user.password = undefined;

      // crate cookie and send response

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in Successfully!",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is Incorrect",
      });
    }
  } catch (error) {
    console.log("ERROR IN LOGIN");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Login is Failed , Try again",
    });
  }
};

// send otp

exports.sendOTP = async (req, res) => {
  try {
    // fetch email from request ki body
    const { email } = req.body;

    // check ismuser preseent

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Present",
      });
    }

    // beakr code
    //   generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await Otp.findOne({ otp: otp });

    console.log("OTP GENERATED: ", otp);
    console.log("Result ", result);

    //   check unique otp or not

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      // result = await Otp.findOne({ otp: otp });
    }

    console.log("OTP GEENRATED UNIQUE: ", otp);

    const otpPayload = { email, otp };

    // creaate entry in Db

    const otpBody = await Otp.create(otpPayload);

    console.log("OTP BODY: ", otpBody);

    // resturn response

    res.status(200).json({
      success: true,
      message: "OTP SENT SUCCESSFULLY",
      otp,
    });
  } catch (error) {
    console.log("ERROR IN OTP GENERATION");
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// change password

exports.changePassword = async (req, res) => {
  try {
    // get data from req body
    const userDetails = await User.findById(req.user.id);

    // get old password, new password, confirm new passowrd
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // /validate

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The password is incorrect",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "The password and confrim password does not match",
      });
    }

    // update password indb
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );
    // send mai; password updated

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        passwordUpdated(
          updatedUserDetails.email,
          `Password Update Successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email Sent Successfully: ", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error

      console.log("Error Occurred while sending email: ", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending mail",
        error: error.message,
      });
    }

    // resturn response

    return res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error

    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
