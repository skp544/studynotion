import React from "react";

import { logo1, logo2, logo3, logo4, timelineImage } from "../../../assets";

const timeline = [
  {
    logo: logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex lg:flex-row flex-col  gap-20 mb-20 items-center">
        {/* content */}
        <div className="flex flex-col lg:w-[45%] gap-14 lg:gap-3">
          {timeline.map((element, index) => (
            <div>
              <div className="flex gap-6" key={index}>
                {/* logo */}
                <div className="w-[52px] h-[52px] bg-white flex justify-center  items-center rounded-full shadow-[#00000012] shadow-[0_0_62px_0]">
                  <img src={element.logo} alt={element.heading} />
                </div>
                {/* content */}
                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base ">{element.description}</p>
                </div>
              </div>

              {index === 3 ? (
                ""
              ) : (
                <div className="hidden lg:block h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]" />
              )}
            </div>
          ))}
        </div>
        {/* image */}
        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px] transition-all duration-200 hover:shadow-none ">
          <div className="absolute bg-caribbeangreen-700 flex lg:flex-row flex-col  text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] lg:bottom-0 z-[1000] ">
            <div className="flex flex-row gap-5 items-center lg:border-r  border-caribbeangreen-300 px-7 lg:px-14">
              <h2 className="text-3xl font-bold">10</h2>
              <p className="text-caribbeangreen-300 text-sm">
                Years of Expereince
              </p>
            </div>
            <div className="flex gap-5 items-center px-7 lg:px-14 ">
              <h2 className="text-3xl font-bold">250</h2>
              <p className="text-caribbeangreen-300 text-sm">Type of courses</p>
            </div>
          </div>

          <img
            src={timelineImage}
            alt="timeline"
            className="object-cover lg:h-fit h-[400px] shadow-white shadow-[20px_20px_0px_0px] transition-all duration-200 hover:shadow-none hover:scale-95"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
