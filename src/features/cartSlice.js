import { createSlice } from "@reduxjs/toolkit";

// Load cart items from localStorage, if available
const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const storedTotalItems = JSON.parse(localStorage.getItem("totalItems")) || 0;
const storedTotalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;

const initialState = {
  cartItems: storedCartItems,
  totalItems: storedTotalItems,
  totalPrice: storedTotalPrice,
};

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// Function to update cart in localStorage
const updateLocalStorage = (state) => {
  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
  localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems += 1;
      state.totalPrice = calculateTotalPrice(state.cartItems);

      // Update localStorage
      updateLocalStorage(state);
    },

    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = calculateTotalPrice(state.cartItems);

      // Update localStorage
      updateLocalStorage(state);
    },

    incrementQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        state.totalItems += 1;
        state.totalPrice = calculateTotalPrice(state.cartItems);

        // Update localStorage
        updateLocalStorage(state);
      }
    },

    decrementQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice = calculateTotalPrice(state.cartItems);

        // Update localStorage
        updateLocalStorage(state);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      // Clear localStorage
      updateLocalStorage(state);
    },
  },
});

// Export actions
export const {
  addItemToCart,
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
