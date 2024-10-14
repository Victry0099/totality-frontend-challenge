import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cartSlice";
import { addToWishlist } from "../features/wishlistSlice"; // Assuming you have a wishlist slice
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const PropertyItem = memo(({ property }) => {
  const dispatch = useDispatch();
  const [isWishlist, setIsWishlist] = useState(false);

  const handleBook = () => {
    dispatch(addItemToCart(property));
  };

  const handleWishlist = () => {
    setIsWishlist(!isWishlist); // Toggle heart fill
    dispatch(addToWishlist(property)); // Dispatch to add/remove from wishlist
  };

  return (
    <div className="relative border p-3 rounded-lg shadow-md">
      {/* Image and wishlist icon */}
      <div className="relative group w-full h-56 overflow-hidden rounded-lg hover:rounded-lg">
        <div className="w-full h-56 rounded-lg overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-72 xl:h-56 object-cover  object-center rounded-lg transform transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Wishlist icon */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 bg-slate-400 p-2 rounded-full shadow-md transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        >
          {isWishlist ? (
            <AiFillHeart className="text-red-500" size={20} />
          ) : (
            <FiHeart className="text-white" size={20} />
          )}
        </button>
      </div>

      {/* Property details */}
      <div className="w-full h-24 pt-2">
        <Link
          to={`/details/${property.id}`}
          className="text-lg font-normal text-[#007185] hover:text-orange-500 mt-2"
        >
          {property.title}
        </Link>
        <div className="py-2">
          <p className="text-gray-600 text-lg">
            City: <span className="text-black pb-3 ">{property.city}</span>{" "}
          </p>
          <p className="text-gray-600 text-lg">
            Bedroom: <span className="text-black">{property.bedrooms}</span>{" "}
          </p>
        </div>
      </div>

      {/* Book button */}
      <div className="flex items-center justify-between">
        <button
          className="bg-yellow-300 text-black mt-3 py-2 px-4 hover:bg-yellow-400 rounded-2xl"
          onClick={handleBook}
        >
          Book Now
        </button>
        <p className="text-lg font-semibold text-orange-500 mt-2">
          ₹ {property.price}{" "}
        </p>
      </div>
    </div>
  );
});

export default PropertyItem;
