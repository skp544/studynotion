import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { IconBtn, RequirementField } from "../../../../";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();

      if (categories.length > 0) {
        setCourseCategories(categories);
      }

      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTitle !== course.courseName ||
      //currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      //currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    )
      return true;
    else return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      } else {
        toast.error("NO Changes made so far");
      }
      console.log("PRINTING FORMDATA", formData);
      console.log("PRINTING result", result);

      return;
    }

    //create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    console.log("BEFORE add course API call");
    console.log("PRINTING FORMDATA", formData);
    const result = await addCourseDetails(formData, token);
    if (result) {
      setStep(2);
      dispatch(setCourse(result));
    }
    setLoading(false);
    console.log("PRINTING FORMDATA", formData);
    console.log("PRINTING result", result);
  };

  return (
    <>
      <form
        className="text-white rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="courseTitle" className="label-style">
            Course Title
          </label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className="w-full form-style"
          />
          {errors.courseTitle && <span>Course Title is Required**</span>}
        </div>
        <div>
          <label htmlFor="courseShortDesc" className="label-style">
            Course Short Description
          </label>
          <textarea
            name="courseShortDesc"
            id="courseShortDesc"
            placeholder="Enter Description"
            className="form-style min-h-[140px] w-full"
            {...register("courseShortDesc", { required: true })}
          />
          {errors.courseShortDesc && (
            <span>Course Description is Required**</span>
          )}
        </div>
        <div className="relative">
          <label htmlFor="coursePrice" className="label-style">
            Course Price
          </label>
          <input
            type="number"
            id="coursePrice"
            placeholder="Enter Course Price"
            className="form-style  w-full"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
          />
          <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400" />
          {errors.coursePrice && <span>Course Price is Required**</span>}
        </div>

        <div>
          <label htmlFor="" className="label-style">
            Course Category
          </label>
          <select
            name=""
            className="form-style"
            id="courseCategory"
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
        </div>

        {/* create custom tag input */}
        {/* <ChipInput
          label="Tags"
          name="courseTags"
          placeholder={"Enter tags and press enter"}
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        /> */}

        {/* UPLOAD COMPONENT */}

        {/* <Upload  /> */}

        {/* bemefits of the course */}
        <div>
          <label htmlFor="courseBenefits">Benefits of the Course</label>
          <textarea
            id="courseBenefits"
            placeholder="Enter Benefits of the course"
            className="form-style min-h-[140px] w-full"
            {...register("courseBenefits", { required: true })}
          />
          {errors.courseBenefits && <span>Course Benefits is Required**</span>}
        </div>

        {/* Requirement */}

        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div>
          {editCourse && (
            <button
              className=" flex items-center gap-x-2 bg-richblack-300"
              onClick={() => dispatch(setStep(2))}
            >
              Continue Without Saving
            </button>
          )}

          {<IconBtn text={!editCourse ? "Next" : "Save Changes"} />}
        </div>
      </form>
    </>
  );
};

export default CourseInformationForm;
