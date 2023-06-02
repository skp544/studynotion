import React from "react";
import instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-row gap-20 items-center">
        {/* left */}
        <div className="w-[50%] ">
          <img src={instructor} alt="instructor" className="shadow-white" />
        </div>

        <div className="w-[50%] flex flex-col gap-8 text-white ">
          <h2 className="text-4xl font-semibold">
            Become an <br /> <HighlightText text={"instructor"} />
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
