import React, { memo } from "react";
import { useSelector } from "react-redux";
const OrderSummary = memo(() => {
  const { cartItems, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );
  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow pt-16">
      <h3 className="text-xl font-semibold mb-4">Your Order</h3>

      {/* Table Headers */}
      <div className="flex justify-between font-semibold border-b py-2">
        <span>Product</span>
        <span>Subtotal</span>
      </div>

      {/* Map over the cartItems and display each product */}
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>
            {item.title} (Qty: {item.quantity})
          </span>
          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      {/* Total Price */}
      <div className="flex justify-between font-bold py-2">
        <span>Total</span>
        <span>₹{totalPrice.toFixed(2)}</span>
      </div>

      {/* Place Order Button */}
      <button className="mt-6 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
        Make Payment
      </button>
    </div>
  );
});

export default OrderSummary;
