const User = require("../models/user");

const mailSender = require("../utils/mailSender");

const bcrypt = require("bcrypt");
const crypto = require("crypto");
// reset password token

exports.resetPasswordToken = async (req, res) => {
  try {
    // get emial

    const email = req.body.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }

    // check email
    // email verification

    // generate token

    const token = crypto.randomBytes(20).toString("hex");

    // update user by adding and expiration time

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log("DETAILS: ", updatedDetails);

    // create url
    const url = `http://localhost:3000/update-password/${token}`;
    // return rsponse

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.json({
      success: true,
      message: "Email sent successfully, please check Email",
    });
  } catch (error) {
    console.log("Error in reset Password Controller");

    console.log(error);

    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

// reset password

exports.resetPassword = async (req, res) => {
  try {
    // data fetch

    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }

    // validation

    const userDetails = await User.findOne({ token: token });

    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token Invalid",
      });
    }

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      {
        token: token,
      },
      { password: encryptedPassword },
      { new: true }
    );
    // get user details from db using token
    //   if not entry invalid token

    return res.status(200).json({
      success: "true",
      message: "Password reset successful",
    });
    //   token time
    //   has pwd
    //  return password
  } catch (error) {
    console.log("ERROR IN RESET PASSWORD");

    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
