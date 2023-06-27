import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto">
      <h2 className="text-center text-4xl font-semibold">Get In Touch</h2>
      <p className="text-center text-richblack-300 mt-3">
        We'd love to here for you, Please fill out this form.
      </p>

      <div className="mx-auto mt-12">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
