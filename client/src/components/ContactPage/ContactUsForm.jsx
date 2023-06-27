import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessfull },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data ", data);

    try {
      setLoading(true);
      //   const response = await apiConnector(
      //     "POST",
      //     contactusEndpoint.CONTACT_US_API,
      //     data
      //   );

      const response = { status: "ok" };
      console.log("Logging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessfull) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessfull]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* firstname */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstname" className="label-style">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="form-style"
              placeholder="Enter First Name"
              {...register("firstname", { required: true })}
            />
            {errors.firstName && <span>Please Enter Your Name</span>}
          </div>
          {/* last name  */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastname" className="label-style">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="form-style"
              placeholder="Enter Last Name"
              {...register("lastname")}
            />
            {errors.lastname && <span>Please Enter Your Name</span>}
          </div>
        </div>

        {/* email */}
        <div className="flex flex-col gap-2 ">
          <label htmlFor="email" className="label-style">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            id="email"
            {...register("email", { required: true })}
            className="form-style"
          />
          {errors.email && <span>Please Enter Your Email</span>}
        </div>

        {/* phone */}

        <div className="flex flex-col gap-2 ">
          <label htmlFor="phoneno">Phone Number</label>
          <div className="flex gap-5">
            {/* dropdown */}
            <div className="flex w-[81px] flex-col gap-2">
              <select
                name="dropdown"
                id="dropdown"
                {...register("countrycode", { required: true })}
                className="form-style"
              >
                {CountryCode.map((element, index) => (
                  <option key={index} value={element.code}>
                    {element.code} -{element.country}
                  </option>
                ))}
              </select>
            </div>
            {/* input */}
            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              <input
                type="tel"
                name="phoneNo"
                id="phoneNo"
                placeholder="000 000 0000"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please Enter Phone Mumber",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                })}
                className="form-style"
              />
            </div>
          </div>

          {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
        </div>

        {/* message */}
        <div className="flex flex-col gap-2 ">
          <label htmlFor="message" className="label-style">
            Message
          </label>
          <input
            name="message"
            placeholder="Enter Your Message Here"
            id="message"
            cols="30"
            rows="7"
            {...register("message", { required: true })}
            className="form-style"
          />
          {errors.email && <span>Please Enter Your Message</span>}
        </div>

        <button
          type="submit"
          className="rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] "
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
