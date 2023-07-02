import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";
import { BsChevronCompactRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

import { NestedView } from "../../../../";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editSectionName, setEditSectionName] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Updated");
  }, [course]);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }

    if (
      course?.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  };

  const onSubmit = async (data) => {
    setLoading(true);

    let result;

    if (editSectionName) {
      // we are editing the section name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    // update values
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    // laoding values
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="sectionName" className="label-style">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="w-full form-style"
          />
          {errors.sectionName && (
            <span className="errors-style">Section Name is required</span>
          )}
        </div>

        <div className=" flex items-end gap-x-4">
          <IconBtn
            type={"submit"}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            // customClasses={"text-white"}
          >
            <MdAddCircleOutline className="text-yellow-50" size={20} />
          </IconBtn>

          {editSectionName && (
            <button
              className="text-sm text-richblack-300 underline"
              type="button"
              onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3 mt-10">
        <button
          className="rounded-md cursor-pointer flex items-center gap-x-2 bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          onClick={goBack}
        >
          Back
        </button>
        <IconBtn text="Next" onClick={goToNext} disabled={loading}>
          <BsChevronCompactRight />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
