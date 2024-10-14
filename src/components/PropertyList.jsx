import React, { memo } from "react";
import PropertyItem from "./PropertyItem";

import propertiesData from "../data/propertyDetails.json";

const PropertyList = memo(() => {
  return (
    <section>
      <div className="m-5 md:m-20">
        <h1 className="text-center text-black text-3xl sm:text-3xl md:text-5xl font-bold">
          Properties List
        </h1>
        <p className="text-center text-xl md:text-2xl font-medium mt-1 md:mt-5 text-lime-400">
          {" "}
          Believe in finding it
        </p>
      </div>

      <div className="w-full  flex items-center justify-center bg-[#ffffff]">
        <div className="w-[95%]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {propertiesData.map((property) => (
            <PropertyItem key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default PropertyList;
