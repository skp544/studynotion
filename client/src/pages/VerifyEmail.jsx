import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/operations/authAPI";
import { RxCountdownTimer } from "react-icons/rx";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signup(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8 ">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Verify Email
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form action="" onSubmit={handleOnSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "insest 0px -1px 0px rgba(255, 255,255,0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[5rem] text-richblack-5 aspect-square text-center foucs:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{ justifyContent: "space-between", gap: "0 6px" }}
            />
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 scale"
            >
              Verify Email
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between ">
            <Link to={"/login"}>
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BsArrowLeft /> Back To Signup
              </p>
            </Link>

            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            >
              <RxCountdownTimer />
              Resend It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
