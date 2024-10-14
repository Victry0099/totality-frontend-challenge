import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, autoLoginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  // Call autoLoginUser on component mount
  useEffect(() => {
    dispatch(autoLoginUser());
  }, [dispatch]);

  // Redirect to home page if the user is logged in
  useEffect(() => {
    if (user) {
      // Clear the input fields after successful login or registration
      setFormData({ displayName: "", email: "", password: "" });
      navigate("/"); // Navigate to the home page
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!validateEmail(formData.email) || formData.password.length < 6) {
        alert(
          "Please enter a valid email and a password of at least 6 characters."
        );
        return;
      }
      dispatch(loginUser(formData.email, formData.password));
    } else {
      if (
        !validateEmail(formData.email) ||
        formData.password.length < 6 ||
        !formData.displayName
      ) {
        alert("Please fill all fields correctly.");
        return;
      }
      dispatch(
        registerUser(formData.email, formData.password, formData.displayName)
      );
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setFormData({ displayName: "", email: "", password: "" });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Show loader if loading is true */}
        {loading && <div className="text-blue-500 mb-4">Processing...</div>}

        {/* Display error message if any */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Display name input only in Register mode */}
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="displayName" className="block mb-2">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required={!isLogin}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded w-full p-2"
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button while processing
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Create an account" : "Already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
