import React from "react";
import instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex lg:flex-row flex-col gap-20 items-center">
        {/* left */}
        <div className="lg:w-[50%] ">
          <img
            src={instructor}
            alt="instructor"
            className="shadow-white shadow-[-20px_-20px_0_0] transition-all duration-200 hover:scale-95 hover:shadow-none"
          />
        </div>

        <div className="lg:w-[50%] flex flex-col gap-10  ">
          <h2 className="lg:w-[50%] text-4xl font-semibold text-richblack-5">
            Become an <HighlightText text={"instructor"} />
          </h2>
          <p className="font-medium text-base w-[80%] text-richblack-300 ">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CtaButton active={true} linkTo={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                <p>Start Teaching Today</p>
                <FaArrowRight />
              </div>
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
