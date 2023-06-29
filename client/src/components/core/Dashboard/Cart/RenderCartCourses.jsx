import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiStarSFill, RiStarSLine, RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      {cart.map((course, index) => (
        <div>
          <div>
            <img src={course?.thumbnail} alt={course?.courseName} />
            <div>
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>
              <div>
                <span>4.5</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<RiStarSLine />}
                  fullIcon={<RiStarSFill />}
                />
                <span>{course?.ratingAndReview?.length} Ratings</span>
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => dispatch(removeFromCart(course._id))}>
              <RiDeleteBin6Line /> <span>Remove</span>
            </button>
            <p>Rs {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
