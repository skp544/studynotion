import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import { frameImg } from "../../../assets";
import { LoginForm, SignupForm } from "../../";

const Template = ({ title, description1, description2, image, formType }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between items-center gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h2 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h2>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 group   ">
            <img
              src={frameImg}
              alt="pattern"
              width={558}
              height={504}
              loading="lazy"
              className="transition-all duration-200 group-hover:scale-95 "
            />
            <img
              src={image}
              alt="students"
              width={558}
              height={504}
              className="absolute -top-4 right-4 z-10 group-hover:scale-95 transition-all duration-200  "
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
