import React from "react";
import { CtaButton, HighlightText } from "../../";
import {
  knowYourProgres,
  compareWithOthers,
  planYourLesson,
} from "../../../assets";

const LearningLanguageSection = () => {
  return (
    <div className="my-10">
      <div className="flex flex-col gap-5 items-center ">
        <div className="text-4xl font-semibold text-center">
          Your swiss knife for <HighlightText text={"learning any language"} />
        </div>
        <p className="text-center text-richblack-700 mx-auto text-base mt-3 font-medium lg:w-[75%] leading-6 ">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>

        <div className="flex lg:flex-row flex-col items-center justify-center mt-8 lg:mt-0  ">
          <img
            src={knowYourProgres}
            alt="know your progres"
            className="object-contain -mr-32 rotate-learning-image-1"
          />
          <img
            src={compareWithOthers}
            alt="compare with others"
            className="object-contain rotate-learning-image-2"
          />
          <img
            src={planYourLesson}
            alt="plan your lesson"
            className="object-contain -ml-36 rotate-learning-image-3"
          />
        </div>

        <div className="w-fit lg:mb-20 -mt-5">
          <CtaButton active={true} linkTo={"/signup"}>
            <p>Learn More</p>
          </CtaButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
