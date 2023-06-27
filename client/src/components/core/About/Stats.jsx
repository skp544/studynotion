import React from "react";

const stats = [
  {
    count: "5k",
    label: "Active Students",
  },
  {
    count: "10+",
    label: "Mentors",
  },
  {
    count: "200+",
    label: "Courses",
  },
  {
    count: "50+",
    label: "Awards",
  },
];

const Stats = () => {
  return (
    <section className="bg-richblack-700">
      <div className="flex flex-col gap-10 w-11/12 max-w-maxContent text-white mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((data, index) => (
            <div key={index} className="flex flex-col py-10">
              <h2 className="text-[30px] font-bold text-richblack-5 ">
                {data.count}
              </h2>
              <h3 className="font-semibold text-[16px] text-richblack-500">
                {data.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
