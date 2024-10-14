import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewSection from "../components/ReviewSection";
import propertyDetails from "../data/propertyDetails.json";
import { addItemToCart } from "../features/cartSlice";
import {
  FaBuilding,
  FaHammer,
  FaRulerCombined,
  FaBed,
  FaBath,
  FaCar,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Find the property that matches the id from the URL
  const property = propertyDetails.find((prop) => prop.id === id);

  // If no property matches, redirect to 404
  if (!property) {
    navigate("/404", { replace: true });
    return null; // Return null to prevent rendering if the property is not found
  }

  const handleBook = () => {
    dispatch(addItemToCart(property));
  };

  return (
    <>
      <div
        key={property.id}
        className=" w-full lg:w-[90%] mx-auto p-2 lg:p-4 pt-16 lg:pt-32 "
      >
        {/* Main Image and Gallery */}
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Image */}
          <div className="md:col-span-1 w-full h-full">
            <img
              src={property.images[0]}
              alt={`${property.title} Main Image`}
              className="w-full h-[60vh] md:h-[74vh] rounded-lg object-cover"
            />
          </div>

          {/* Gallery Images */}
          <div className="md:col-span-1 grid grid-cols-2 gap-4">
            {property.images.slice(1).map((image, index) => (
              <div key={index} className="w-full h-auto">
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-[30vh] md:h-[35vh] rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="mt-10 w-full lg:w-[70%] ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mx-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {property.title}
              </h1>
              <div className="text-gray-600 flex items-center gap-2 my-2">
                <FaLocationDot size={20} />
                <p>{property.address}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                ₹{Math.floor(property.price / property.sq_ft)} / sq ft
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">
                ₹{property.price.toLocaleString()}
              </h2>
            </div>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-base lg:text-xl text-white py-2 px-4 rounded-lg"
              onClick={handleBook}
            >
              Book Now
            </button>
          </div>

          {/* Property Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10 mx-2">
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
              <FaBuilding className="text-gray-600 mr-4" size={20} />
              <span className="text-gray-800 font-medium">Multi Family</span>
            </div>
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
              <FaHammer className="text-gray-600 mr-4" size={20} />
              <span className="text-gray-800 font-medium">
                {property.built_year}
              </span>
            </div>
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
              <FaRulerCombined className="text-gray-600 mr-4" size={20} />
              <span className="text-gray-800 font-medium">
                {property.sq_ft} Sq ft
              </span>
            </div>
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
              <FaBed className="text-gray-600 mr-4" size={20} />
              <span className="text-gray-800 font-medium">
                {property.bedrooms} Bedrooms
              </span>
            </div>
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
              <FaBath className="text-gray-600 mr-4" size={20} />
              <span className="text-gray-800 font-medium">
                {property.bathrooms} Bathrooms
              </span>
            </div>
            <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
              <FaCar className="text-gray-600 mr-4" size={20} />
              <span className="text-gray-800 font-medium">
                {property.garage} Garage
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 mx-2">
            <h3 className="text-lg font-bold">Description</h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>

        {/* Property Details */}
        <div className="w-full lg:w-[70%]  pt-10 p-2">
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base">
            <div>
              <div className="flex justify-between border-b py-2">
                <span className="text-slate-950">Property ID:</span>
                <span className="text-slate-600">{property.id}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-slate-950">Price:</span>
                <span className="text-slate-600">
                  ₹{property.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-slate-950">Property Size:</span>
                <span className="text-slate-600">{property.sq_ft} Sq Ft</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-slate-950">Bedrooms:</span>
                <span className="text-slate-600">{property.bedrooms}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-slate-950">Bathrooms:</span>
                <span className="text-slate-600">{property.bathrooms}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between border-b py-2">
                <span className="text-slate-950">Garage:</span>
                <span className="text-slate-600">{property.garage}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-slate-950">Year Built:</span>
                <span className="text-slate-600">{property.built_year}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-slate-950">Property Type:</span>
                <span className="text-slate-600">{property.property_type}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-slate-950">Property Status:</span>
                <span className="text-slate-600">For Rent</span>
              </div>
            </div>
          </div>
        </div>
        <ReviewSection />
      </div>
    </>
  );
};

export default PropertyDetails;
