import React from "react";
import { useSelector } from "react-redux";
import { RenderCartCourses, RenderTotalAmount } from "../../../";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div>
      <h1>Your Wishlist</h1>
      <p>{totalItems} Courses in Cart</p>
      {total > 0 ? (
        <div>
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p>Your Cart is Empty</p>
      )}
    </div>
  );
};

export default Cart;
