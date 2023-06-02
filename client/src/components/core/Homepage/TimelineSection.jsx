import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

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
      <div className="flex flex-row gap-10 items-center">
        {/* content */}
        <div className="flex flex-col w-[45%] gap-11">
          {timeline.map((element, index) => (
            <div className="flex flex-row gap-6" key={index}>
              {/* logo */}
              <div className="w-[50px] h-[50px] bg-white flex items-center">
                <img src={element.logo} alt={element.heading} />
              </div>
              {/* content */}
              <div>
                <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                <p className="text-base ">{element.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* image */}
        <div className="relative shadow-blue-200">
          {/* gradient */}
          <div></div>
          <img
            src={timelineImage}
            alt="timeline"
            className="shadow-white object-cover h-fit"
          />

          <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
              <h2 className="text-3xl font-bold">10</h2>
              <p className="text-caribbeangreen-300 text-sm">
                Years of Expereince
              </p>
            </div>
            <div className="flex gap-5 items-center px-7 ">
              <h2 className="text-3xl font-bold">250</h2>
              <p className="text-caribbeangreen-300 text-sm">Type of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
