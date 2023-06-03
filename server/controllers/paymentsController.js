const { instance } = require("../config/razorpay");

const Course = require("../models/course");
const User = require("../models/user");

const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

// capture the payment and initiate the razorpay order

exports.capturePayment = async (req, res) => {
  try {
    // get course id and course id
    const { courseId } = req.body;
    const { userId } = req.user.id;

    // validation
    if (!courseId) {
      return res.json({
        success: false,
        message: "Please provide valid course id",
      });
    }
    let course;

    try {
      course = await Course.findById(courseId);
      if (!course) {
        return res.json({
          success: false,
          message: "Couldn't find course",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentEnrolled.includes(uid)) {
        return res.json({
          success: false,
          message: "Student is already enrolled",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      reciept: Math.random(Date.now()).toString(),
      notes: {
        courseId: courseId,
        userId,
      },
    };

    try {
      const payemntResponse = await instance.orders.create(options);
      console.log(payemntResponse);
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: payemntResponse.id,
        currency: payemntResponse.currency,
        amount: payemntResponse.amount,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Could not initiate orders",
      });
    }
    // valid course id
    // valid course detail
    // user already pay for the same course

    // order create and response
  } catch (error) {
    res.json({
      success: false,
      message: "Could not initiate orders",
    });
  }
};

// verify signaitur

exports.verifySignature = async (req, res) => {
  const webHookSecret = "12345678";
  const signature = req.headers("x-razorpay-signature");

  const shasum = crypto.createHmac("sha256", webHookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("payemt authorised");
    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }
      console.log(enrolledCourse);

      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { course: courseId } },
        { new: true }
      );

      console.log(enrolledStudent);

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from StudyNotion",
        "Congratulations from CodeHelp",
        "Congratulations, you are onboarded into new Studynotion Course"
      );
      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signautr verifid",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid Request",
    });
  }
};
