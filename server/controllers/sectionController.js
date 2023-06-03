const Section = require("../models/section");
const Course = require("../models/course");

exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // create section

    const newSection = await Section.create({ sectionName });

    // update section using section object id
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // hw: use populate to replace sections / subsections int the update course
    // return response
    return res.status(200).json({
      success: true,
      message: "Section created Successfully ",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in section controller",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    // data input
    const { sectionName, sectionId } = req.body;

    // // data validation
    // if (!sectionName || !sectionId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Missing Properties",
    //   });
    // }
    // update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    // get id --sending id
    const { sectionId } = req.body;
    // const {sectionId } = req.body;

    // delete by id
    await Section.findByIdAndDelete(sectionId);
    // todo we need to deleet the sectiod id in course schema

    // return response
    return res.status(200).json({
      success: true,
      message: "section deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
