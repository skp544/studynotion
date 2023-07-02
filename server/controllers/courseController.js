const Course = require("../models/course");
const Category = require("../models/category"); // check import
const User = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create course handler

exports.createCourse = async (req, res) => {
  try {
    // fetchd ata
    const userId = req.user.id;

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    // validation

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "ALL FIELDS ARE REQUIRED",
      });
    }

    if (!status || status == undefined) {
      status = "Draft";
    }

    // check for instructor

    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    // todo verfiy that user id and and instructor ud

    console.log("Instructor Details: ", instructorDetails);

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor not Found",
      });
    }

    // check given tag is valid or not

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category details not found",
      });
    }

    // uplaod image cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    console.log(thumbnailImage);

    // crweeate an entry new course

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,

      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    // user update course user scme of instrycotor

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // update the category ka schema

    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // todo hw

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course created successfully",
    });
  } catch (error) {
    console.log("ERROR IN COURSE CONTROLLER");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all course

exports.getAllCourses = async (req, res) => {
  try {
    // todo change below
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched",
      data: allCourses,
    });
  } catch (error) {
    console.log("ERROR IN show all coursee");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch course data",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    // find details
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })

      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      res.status(400).json({
        success: false,
        message: `Cannot find the coruse with ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
