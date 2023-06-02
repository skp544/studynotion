import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import { footerLogo } from "../../assets";

import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = ["Paid memberships", "For students", "Business solutions"];

const Community = ["Forums", "Chapters", "Events"];

const Company = ["About", "Careers", "Affiliates"];

const Footer = () => {
  return (
    <>
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b border-richblack-700 w-[100%] flex flex-col lg:flex-row pb-5">
          {/* Section 1 */}

          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <img src={footerLogo} alt="footer" className="object-contain" />
              <h2 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h2>
              <div className="flex flex-col gap-2">
                {Company.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 text-lg">
                <FaFacebook className="cursor-pointer hover:text-richblack-50" />
                <FaGoogle className="cursor-pointer hover:text-richblack-50" />
                <FaTwitter className="cursor-pointer hover:text-richblack-50" />
                <FaYoutube className="cursor-pointer hover:text-richblack-50" />
              </div>
              <div></div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h2 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h2>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h2 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h2>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="w-[48%] lg:w-[30%] mt-5 mb-7 lg:pl-0">
                <h2 className="text-richblack-50 font-semibold text-[16px]">
                  Community
                </h2>

                <div className="flex flex-col gap-2 mt-2">
                  {Community.map((ele, index) => (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* section 2 */}

          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, index) => (
              <div key={index} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                <h2 className="text-richblack-50 font-semibold text-[16px]">
                  {ele.title}
                </h2>

                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, i) => (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={link.link}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm ">
        {/* Section 1 */}

        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => (
              <div
                key={i}
                className={`${
                  BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-richblack-700 "
                } px-3 cursor-pointer hover:text-richblack-50 transition-all duration-200`}
              >
                <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                  {ele}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            Made with ❤️ SKP &copy; 2023 Studynotion
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Footer;
