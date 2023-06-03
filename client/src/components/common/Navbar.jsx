import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Logo } from "../../assets";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProfileDropDown } from "../";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing sublinks: ", result.data.data[0].name);

      setSubLinks(result.data.data);
      console.log(subLinks[0].name);
    } catch (error) {
      console.log("could not fetch the category result");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between">
        <Link to="/">
          <img
            src={Logo}
            alt="Navbar "
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-1 justify-center cursor-pointer group relative">
                    <p className="">{link.title}</p>
                    <BsChevronDown className="text-richblack-25" />

                    <div className="invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[56%] top-[-2px] h-6 w-6 rotate-45  bg-richblack-5" />

                      {subLinks.length ? (
                        subLinks.map((subLink, index) => (
                          <Link
                            key={index}
                            to={`/catalog/${subLink.name.toLowerCase()}`}
                          >
                            {subLink?.name}
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link?.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login signup dashboard */}

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100 rounded-md hover:scale-95 ">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100 rounded-md hover:scale-95 ">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// hw dashboard logout
