import { createSlice } from "@reduxjs/toolkit";

// Initialize wishlist state from localStorage or as an empty array
const initialState = {
  items: JSON.parse(localStorage.getItem("wishlist")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const property = action.payload;
      const exists = state.items.find((item) => item.id === property.id);

      if (!exists) {
        state.items.push(property);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      const propertyId = action.payload;
      state.items = state.items.filter((item) => item.id !== propertyId);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },
});

// Export actions
export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

// Export the reducer
export default wishlistSlice.reducer;
