const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");

// auth

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // verify toekn

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    console.log("ERRR IN AUTH MIDDLE");

    return res.status(401).json({
      success: false,
      message: "Something went wront whule valdiating token",
    });
  }
};

// is Student

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for students only, Try again",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role cannot be verified Failed in is Student middlreware",
    });
  }
};

// is Instructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is proteted route for instructor only, Try again",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "user reole cannot be verified Failed in is instructor middleware",
    });
  }
};

// is admin

exports.isAdmin = async (req, res, next) => {
  try {
    // console.log(
    //   "Printing account type in auth middleware: ",
    //   req.user.accountType
    // );

    if (req.user.accountType !== "Admin") {
      return res.status(500).json({
        success: false,
        message: "This is proteted route for admin only, Try again",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user reole cannot be verified Failed in is admin middlreware",
    });
  }
};
