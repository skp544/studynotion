import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/operations/authAPI";

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
    <div className="text-white">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code has been sent to you. Enter the code below</p>
          <form action="" onSubmit={handleOnSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>" "</span>}
              renderInput={(props) => <input {...props} placeholder="-" />}
            />
            <button type="submit">Verify Email</button>
          </form>

          <div>
            <div>
              <Link to={"/login"}>
                <p className="flex items-center gap-1">
                  <span>
                    <BsArrowLeft />
                  </span>
                  Back To Login
                </p>
              </Link>
            </div>

            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            >
              Resend It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
