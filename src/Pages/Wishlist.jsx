import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlistSlice";
import { addItemToCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const handleMoveToCart = (item) => {
    dispatch(addItemToCart(item)); // Add item to cart
    dispatch(removeFromWishlist(item.id)); // Remove item from wishlist
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-36">
      <h1 className="text-3xl font-semibold mb-4">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="text-gray-500">
            Add items to your wishlist to see them here.
          </p>
          <Link
            to="/"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            Go to Shopping List
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 relative">
              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="absolute top-1 right-0 text-gray-400 hover:text-red-500"
              >
                <IoIosCloseCircle size={36} />
              </button>

              {/* Product Image */}
              <img
                src={item.images[0]} // Display the first image
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="w-full h-[25vh]">
                <div className="w-full h-[8vh]">
                  {/* Product Title */}
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>

                {/* Product Location */}
                <p className="text-gray-600 text-sm mb-2">
                  {item.city}, {item.state}
                </p>

                {/* Product Details */}
                <div className="text-sm text-gray-500">
                  <p>Bedrooms: {item.bedrooms}</p>

                  <p>Area: {item.sq_ft}</p>
                </div>

                {/* Product Price */}
                <p className="text-red-500 text-xl font-semibold mt-2">
                  Rs. {item.price}
                </p>
              </div>
              {/* Move to Cart Button */}
              <button
                onClick={() => handleMoveToCart(item)}
                className="bg-red-500 text-white py-2 px-4 rounded mt-4 w-full"
              >
                Move to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
