import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { ChipInput, IconBtn, RequirementField, Upload } from "../../../../";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { MdNavigateNext } from "react-icons/md";

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
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    )
      return true;
    else return false;
  };

  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        // console.log(data)
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
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
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
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };
  return (
    <>
      <form
        className="text-white rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* course title */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="courseTitle" className="label-style">
            Course Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className="w-full form-style"
          />
          {errors.courseTitle && (
            <span className="errors-style">Course Title is Required**</span>
          )}
        </div>

        {/* course short description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="courseShortDesc" className="label-style">
            Course Short Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            name="courseShortDesc"
            id="courseShortDesc"
            placeholder="Enter Description"
            className="form-style min-h-[130px] w-full resize-x-none"
            {...register("courseShortDesc", { required: true })}
          />
          {errors.courseShortDesc && (
            <span className="errors-style">Course Description is Required</span>
          )}
        </div>
        {/* course pricee */}
        <div className=" flex flex-col space-y-2">
          <label htmlFor="coursePrice" className="label-style">
            Course Price <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <input
              type="number"
              id="coursePrice"
              placeholder="Enter Course Price"
              className="form-style  w-full !pl-12"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <HiOutlineCurrencyRupee className="absolute top-1/2 left-3 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
          </div>
          {errors.coursePrice && (
            <span className="errors-style">Course Price is Required</span>
          )}
        </div>
        {/* course category */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="courseCategory" className="label-style">
            Course Category <sup className="text-pink-200">*</sup>
          </label>
          <select
            defaultValue={""}
            className="form-style w-full"
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
          {errors.courseCategory && (
            <span className="errors-style">Course Category is required</span>
          )}
        </div>

        {/* create custom tag input */}

        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder={"Enter tags and press enter"}
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* UPLOAD COMPONENT */}

        <Upload
          name="courseImage"
          label={"Course Thumbnail"}
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* bemefits of the course */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="courseBenefits" className="label-style">
            Benefits of the course <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter Benefits of the course"
            className="form-style min-h-[130px] resize-x-none w-full"
            {...register("courseBenefits", { required: true })}
          />
          {errors.courseBenefits && (
            <span className="errors-style">Course Benefits is Required**</span>
          )}
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
        {/* next buttom */}
        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              onClick={() => dispatch(setStep(2))}
            >
              Continue Without Saving
            </button>
          )}

          {
            <IconBtn text={!editCourse ? "Next" : "Save Changes"}>
              <MdNavigateNext />
            </IconBtn>
          }
        </div>
      </form>
    </>
  );
};

export default CourseInformationForm;
