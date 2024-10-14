import React, { useState, useEffect, memo } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews, submitReview } from "../features/reviewSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const ReviewSection = memo(() => {
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { reviews } = useSelector((state) => state.reviews);
  const [user] = useAuthState(auth); // Use the hook to track the user's authentication state

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleReviewSubmit = () => {
    if (!user) {
      // Redirect to auth page if user is not logged in
      navigate("/auth");
      return;
    }
    // Dispatch the submitReview action
    dispatch(submitReview(newReview));
    setNewReview({ rating: 0, comment: "" });
    setEditMode(false); // Close the review form after submission
  };

  return (
    <div className="w-[70%] pt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{reviews.length} Reviews</h2>
        {user && (
          <button
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
            onClick={() => setEditMode(true)}
          >
            Leave a Review
          </button>
        )}
        {!user && (
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
            onClick={() => navigate("/auth")}
          >
            Login to Review
          </button>
        )}
      </div>

      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-start space-x-4">
              <img
                src={review.avatar || "https://via.placeholder.com/50"}
                alt={review.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar
                          key={i}
                          color={i < review.rating ? "#facc15" : "#e4e4e7"}
                          className="h-5 w-5"
                        />
                      ))}
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{review.date}</p>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editMode && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Leave A Review</h3>
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">
              Your Rating
            </label>
            <div className="flex mt-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className="h-6 w-6 cursor-pointer"
                    color={i < newReview.rating ? "#facc15" : "#e4e4e7"}
                    onClick={() => handleRatingChange(i + 1)}
                  />
                ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">
              Your Comment
            </label>
            <textarea
              className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="5"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            ></textarea>
            <button
              className="bg-yellow-400 text-white px-4 py-2 mt-2 rounded-lg hover:bg-yellow-500"
              onClick={handleReviewSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default ReviewSection;
