import React from "react";
import { useSelector } from "react-redux";
import { IconBtn } from "../../../";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    // on payment integration
    const courses = cart.map((course) => course._id);
    console.log("Bought these courses", courses);
  };
  return (
    <div>
      <p>Totak:</p>
      <p>Rs {total}</p>

      <IconBtn
        text={"Buy Now"}
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
};

export default RenderTotalAmount;
