import React from "react";
import { ContactDetails, ContactForm, Footer } from "../components";

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* contact details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* contact form */}

        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent  flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviews form other learner */}
        <h2 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h2>
        {/* <ReviewSlider /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
