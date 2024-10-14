import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
} from "../features/cartSlice";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const [currentDate, setCurrentDate] = useState("");
  const dispatch = useDispatch();
  const { cartItems, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      <section className="pt-28 sm:pt-36 md:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
            Shopping Cart
          </h1>

          {totalItems === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Your Shopping Cart is Empty
              </h2>
              <p className="text-gray-500">
                Add items to your cart to see them here.
              </p>
            </div>
          ) : (
            <>
              <div className="border-b mb-6 pb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center justify-between border-t py-4 gap-4"
                  >
                    {/* Product Image */}
                    <div className="flex items-center space-x-4 w-full md:w-1/2">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                      />
                      <div className="w-[80%]">
                        <h2 className="text-base sm:text-lg font-semibold">
                          {item.title}
                        </h2>
                        <p className="text-lg md::text-xl text-gray-500">
                          Bedrooms: {"  "}
                          <span className="text-black">{item.bedrooms}</span>
                        </p>
                        <p className="text-lg md::text-xl text-gray-500">
                          Area: {"  "}
                          <span className="text-black">{item.sq_ft}</span>
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="w-full md:w-1/4">
                      <h2 className="text-sm sm:text-base font-medium text-black">
                        Date:{" "}
                        <span className="text-slate-600">{currentDate}</span>
                      </h2>
                    </div>

                    {/* Quantity and Delete */}
                    <div className="flex items-center space-x-2 sm:space-x-4 p-2 w-full md:w-1/4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => dispatch(incrementQuantity(item))}
                        >
                          <FaCirclePlus className="text-green-500 text-center text-xl sm:text-2xl" />
                        </button>
                        <span className="text-sm">Qty:</span>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => dispatch(decrementQuantity(item))}
                        >
                          <FaCircleMinus className="text-green-500 text-center text-xl sm:text-2xl" />
                        </button>
                      </div>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          dispatch(removeItemFromCart({ id: item.id }))
                        }
                      >
                        <MdDelete className="text-xl sm:text-2xl" />
                      </button>
                    </div>

                    {/* Item Price */}
                    <div className="w-full md:w-1/4 text-right">
                      <p className="text-lg font-semibold text-slate-900">
                        <span className="text-base sm:text-2xl font-serif text-slate-600">
                          ₹
                        </span>
                        {`${item.price.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    Subtotal ({totalItems} items):{" "}
                    <span className="text-red-500">{`₹${totalPrice.toFixed(
                      2
                    )}`}</span>
                  </p>

                  <Link to="/checkout">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
