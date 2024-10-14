import React from "react";
import { useLocation } from "react-router-dom";
import propertyDetails from "../data/propertyDetails"; // Mock data or API call

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const locationQuery = searchParams.get("location") || "";
  const minPrice = parseInt(searchParams.get("minPrice")) || 0;
  const maxPrice = parseInt(searchParams.get("maxPrice")) || Number.MAX_VALUE;
  const bedrooms = parseInt(searchParams.get("bedrooms")) || 0;

  // Filtering logic based on search parameters
  const filteredProperties = propertyDetails.filter((property) => {
    return (
      (!locationQuery ||
        property.city.toLowerCase().includes(locationQuery.toLowerCase())) &&
      property.price >= minPrice &&
      property.price <= maxPrice &&
      property.bedrooms >= bedrooms
    );
  });

  return (
    <div className="container mx-auto p-10 ">
      <h1 className="text-2xl font-bold mb-6 pt-20">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="border p-4 rounded-lg">
              <img
                src={property.images[0]} // Use the first image from the array
                alt={property.title}
                className="w-full h-72 object-cover rounded-lg"
              />
              <h2 className="text-xl font-bold mt-4">{property.title}</h2>
              <p>{property.city}</p>
              <p>Price: ₹{property.price.toLocaleString()}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>{property.description1}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
