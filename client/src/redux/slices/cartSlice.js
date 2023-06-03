import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],

  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,

  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,

  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the cart, do not modify the quantity

        toast.error("Course Already in Cart");
      }

      // If the course is not in the cart, add it to the cart

      state.cart.push(course);
      // Update the total quantity and price
      state.total += course.price;
      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Course Added To Cart");
    },
    // H/W add to cart
    // removr from cart
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        // If the course is found in the cart, remove it

        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);

        // Update Local Storage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        // toast

        toast.success("Course Removed from Cart");
      }
    },
    //reset cart
    resetCart: (state, action) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
  },
});

export const { addToCart, resetCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
