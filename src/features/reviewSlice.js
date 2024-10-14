// reviewsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase"; // Make sure you point to your Firebase config
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    const reviewsCollection = collection(db, "reviews");
    const snapshot = await getDocs(reviewsCollection);
    let reviews = [];
    snapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return reviews;
  }
);

export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async (reviewData, { getState }) => {
    const { user } = getState().auth; // assuming you have auth state in Redux
    if (!user) throw new Error("Please login to submit a review");

    const reviewDoc = doc(db, "reviews", user.uid);
    await setDoc(
      reviewDoc,
      { ...reviewData, userId: user.uid },
      { merge: true }
    );
    return { ...reviewData, userId: user.uid };
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        const existingIndex = state.reviews.findIndex(
          (review) => review.userId === action.payload.userId
        );
        if (existingIndex !== -1) {
          state.reviews[existingIndex] = action.payload; // Edit existing review
        } else {
          state.reviews.push(action.payload); // Add new review
        }
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;
