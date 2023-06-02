import React from "react";
import HighlightText from "./HighlightText";
import knowYourProgres from "../../../assets/Images/Know_your_progress.png";
import compareWithOthers from "../../../assets/Images/Compare_with_others.png";
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png";
import CtaButton from "./CtaButton";

const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px] mb-32">
      <div className="flex flex-col gap-5 items-center ">
        <div className="text-4xl font-semibold text-center">
          Your swiss knife for <HighlightText text={"learning any language"} />
        </div>
        <p className="text-center text-richblack-700 mx-auto text-base mt-3 font-medium lg:w-[75%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>

        <div className="flex flex-row items-center justify-center mt-5 ">
          <img
            src={knowYourProgres}
            alt="know your progres"
            className="object-contain -mr-32"
          />
          <img
            src={compareWithOthers}
            alt="compare with others"
            className="object-contain"
          />
          <img
            src={planYourLesson}
            alt="plan your lesson"
            className="object-contain -ml-36"
          />
        </div>

        <div className="w-fit">
          <CtaButton active={true} linkTo={"/signup"}>
            <p>Learn More</p>
          </CtaButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
