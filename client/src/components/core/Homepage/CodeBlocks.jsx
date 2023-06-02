import React from "react";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subHeading,
  ctaBtn1,
  ctaBtn2,
  codeBlock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* Section 1 */}
      <div className="w-[100%] lg:w-[50%]  flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold text-base w-[85%] -mt-3 ">
          {subHeading}
        </div>

        <div className="flex flex-row gap-7 mt-7">
          <CtaButton active={ctaBtn1.active} linkTo={ctaBtn1.linkTo}>
            <div className="flex gap-2 items-center">
              {ctaBtn1.btnText}
              <FaArrowRight />
            </div>
          </CtaButton>

          <CtaButton active={ctaBtn2.active} linkTo={ctaBtn2.linkTo}>
            {ctaBtn2.btnText}
          </CtaButton>
        </div>
      </div>

      {/* section 2 */}

      <div className="flex h-fit code-border flex-row text-[10px] w-[100%] lg:w-[470px] relative py-3 sm:text-sm leading-[18px] sm:leading-6 ">
        {/* gradient */}
        <div
          className={`${
            position === "lg:flex-row" ? "codeblock-1 " : "codeblock-2"
          } absolute`}
        ></div>
        {/* numbering */}
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold select-none ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-mono font-bold ${codeColor} pr-1`}
          style={{
            whiteSpace: "pre-line",
            display: "block",
          }}
        >
          <TypeAnimation
            sequence={[codeBlock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
