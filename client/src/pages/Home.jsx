import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
  HighlightText,
  CtaButton,
  CodeBlocks,
  TimelineSection,
  LearningLanguageSection,
  InstructorSection,
  ExploreMore,
  Footer,
} from "../components";
import { banner } from "../assets";

const Home = () => {
  return (
    <div className="">
      {/* Section 1 */}

      <div className="relative max-w-maxContent flex flex-col mx-auto w-11/12 items-center text-white justify-between">
        {/* button */}
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit btn-shadow-1">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p className="">Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}

        <div className="text-center font-semibold text-4xl mt-8 ">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>
        <p className="w-11/12 text-center text-base font-bold text-richblack-300 mt-4   ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>

        <div className="flex flex-row gap-7 mt-8">
          <CtaButton active={true} linkTo={"/about"}>
            Learn More
          </CtaButton>
          <CtaButton active={false} linkTo={"/signup"}>
            Book a Demo
          </CtaButton>
        </div>

        <div className="shadow-blue-200 mx-3 my-14 shadow-[10px_-5px_50px_-5px]  ">
          <video
            src={banner}
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          />
        </div>

        {/* Code section 1 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your <HighlightText text={"coding potential"} /> with our
                online courses.
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctaBtn1={{
              btnText: "Try it Yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctaBtn2={{
              btnText: "Learn More",
              linkTo: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeBlock={`<!DOCTYPE html> \n <html lang="en"> \n <head> \n <title>This is my page </title> \n </head> \n <body> \n  <h1><a href ="/">Header</a></h1> \n <nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a> </nav> \n </body>
            `}
          />
          <div></div>
        </div>

        {/* code section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightText text={"coding in seconds"} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctaBtn1={{
              btnText: "Continue Lesson",
              linkTo: "/signup",
              active: true,
            }}
            ctaBtn2={{
              btnText: "Learn More",
              linkTo: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeBlock={`import React from "react"; \n import CTAButton from "./Button"; \n import { TypeAnimation } from "react-type-animation"; \n import { FaArrowRight } from "react-icons/fa";\n \n const Home = () => { \n   return ( \n <div>Home</div> \n ) } \n export default Home;
            `}
          />
        </div>

        <ExploreMore />
      </div>

      {/* Section 2 */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px] ">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CtaButton active={true} linkTo={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CtaButton>

              <CtaButton active={false} linkTo={"/signup"}>
                <div>Learn More</div>
              </CtaButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px] ">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start ">
              <p className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CtaButton active={true} linkTo={"/signup"}>
                <p>Learn More</p>
              </CtaButton>
            </div>
          </div>
          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}

      <div className="w-11/12 max-w-maxContent flex flex-col items-center mx-auto justify-between gap-8 bg-richblack-900 mt-[50px]">
        <InstructorSection />
        <h2 className="text-center text-white text-4xl font-semibold mt-10">
          Reviews from other learners
        </h2>
        {/* review  slider here */}
      </div>
      {/* Footer */}
      <div className="bg-richblack-800">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
