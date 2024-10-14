import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/auth"); // Redirect to the auth page
    }
  }, [user, navigate]);

  return (
    <>
      <div className="container mx-auto p-6 pt-40">
        <h2 className="text-4xl font-bold mb-6 text-center">Shop Checkout</h2>
        <div className="flex flex-col lg:flex-row justify-between gap-8 pt-16">
          {/* Billing Details Form */}
          <div className="w-full lg:w-2/3 bg-white p-6  rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Billing details</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="border p-2 rounded w-full md:col-span-2"
              />
              <input
                type="text"
                placeholder="Country"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="House number and street name"
                className="border p-2 rounded w-full md:col-span-2"
              />
              <input
                type="text"
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="border p-2 rounded w-full md:col-span-2"
              />
              <input
                type="text"
                placeholder="City"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="State"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Zip Code"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Phone"
                className="border p-2 rounded w-full md:col-span-2"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border p-2 rounded w-full md:col-span-2"
              />
            </form>
          </div>

          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default Checkout;
