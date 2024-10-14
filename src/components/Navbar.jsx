// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser, autoLoginUser } from "../features/authSlice";
// import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
// import { IoSearchOutline, IoHomeOutline } from "react-icons/io5";
// import { LiaCartPlusSolid } from "react-icons/lia";

// const Navbar = () => {
//   const { user, loading } = useSelector((state) => state.auth);
//   const { totalItems } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState("");

//   const [isScrollingUp, setIsScrollingUp] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   // Function to handle logout
//   const handleLogout = () => {
//     dispatch(logoutUser());
//   };

//   useEffect(() => {
//     dispatch(autoLoginUser());
//   }, [dispatch]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > lastScrollY) {
//         setIsScrollingUp(false);
//       } else {
//         setIsScrollingUp(true);
//       }
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll); // Clean up
//     };
//   }, [lastScrollY]);

//   const handleSearch = () => {
//     // Use regex to extract values or terms
//     const locationMatch = searchQuery.match(/\D+/)?.[0].trim(); // Match for non-numbers (location)
//     const numbers = searchQuery.match(/\d+/g); // Match for numbers (price, bedrooms)

//     let minPrice = "";
//     let maxPrice = "";
//     let bedrooms = "";

//     if (numbers) {
//       const [firstNum, secondNum] = numbers.map(Number);

//       if (numbers.length === 1) {
//         // If there's only one number, check whether it's price or bedrooms
//         if (firstNum > 1000) {
//           minPrice = firstNum;
//         } else {
//           bedrooms = firstNum;
//         }
//       } else if (numbers.length === 2) {
//         // If there are two numbers, assume it's minPrice and maxPrice
//         minPrice = firstNum;
//         maxPrice = secondNum;
//       }
//     }

//     const searchParams = new URLSearchParams({
//       location: locationMatch || "",
//       minPrice: minPrice || "",
//       maxPrice: maxPrice || "",
//       bedrooms: bedrooms || "",
//     });

//     navigate(`/search?${searchParams.toString()}`);
//     setSearchQuery("");
//   };

//   return (
//     <>
//       <header
//         className={`w-full h-[12vh] z-50 flex justify-center fixed transition-transform duration-300 ${
//           isScrollingUp ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <nav className="p-4 bg-[#07113a] text-white flex justify-between items-center top-0 w-[98%] z-50 h-[12vh] rounded-2xl">
//           <div className="flex items-center space-x-4">
//             <Link to="/" className="text-lg font-bold">
//               <img src="/images/logo-white.svg" alt="Home-logo" />
//             </Link>
//           </div>

//           <div className="flex items-center space-x-4 border-2 border-white rounded-3xl">
//             {/* Unified Search Bar */}
//             <input
//               className="w-96 h-12 pl-8 pr-4 py-3 text-lg bg-[#07113a] border-none outline-none text-white placeholder-white rounded-3xl"
//               type="text"
//               placeholder="Search by location, price, or bedrooms"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <div
//               className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-[#4cf051]"
//               onClick={handleSearch}
//             >
//               <IoSearchOutline className="text-3xl" />
//             </div>
//           </div>

//           <div className="flex items-center space-x-6">
//             <Link to="/" className="flex items-center space-x-2 flex-col">
//               <IoHomeOutline className="text-2xl" />
//               <span>Home</span>
//             </Link>
//             <Link
//               to="/wishlist"
//               className="flex items-center space-x-2 flex-col"
//             >
//               <FaRegHeart className="text-2xl" />
//               <span>Wishlist</span>
//             </Link>

//             <Link
//               to="/shopping-cart"
//               className="flex items-center space-x-2 flex-col"
//             >
//               <span className="bg-[#07113a] text-[#ef892f] w-5 h-5 text-center rounded-full z-10 -mb-7 -mr-3 text-xs">
//                 {totalItems}
//               </span>
//               <LiaCartPlusSolid className="text-5xl" />
//               <span>Cart</span>
//             </Link>

//             {!loading && (
//               <>
//                 {user ? (
//                   <div className="flex items-center space-x-4">
//                     <Link
//                       to="/profile"
//                       className="flex items-center space-x-2 flex-col"
//                     >
//                       <img
//                         src={user.photoURL || "/images/user.webp"}
//                         alt="profile"
//                         className="rounded-full h-9 w-9"
//                       />
//                       <span>{user.displayName || user.email}</span>
//                     </Link>

//                     <button
//                       onClick={handleLogout}
//                       className="bg-red-500 text-white px-4 py-2 rounded"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 ) : (
//                   <Link
//                     to="/auth"
//                     className="flex items-center space-x-2 flex-col text-white"
//                   >
//                     <FaRegUserCircle className="text-3xl" />
//                     <span>Welcome</span>
//                   </Link>
//                 )}
//               </>
//             )}
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, autoLoginUser } from "../features/authSlice";
import { FaRegHeart, FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { IoSearchOutline, IoHomeOutline } from "react-icons/io5";
import { LiaCartPlusSolid } from "react-icons/lia";

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(autoLoginUser());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up
    };
  }, [lastScrollY]);

  const handleSearch = () => {
    const locationMatch = searchQuery.match(/\D+/)?.[0].trim();
    const numbers = searchQuery.match(/\d+/g);

    let minPrice = "";
    let maxPrice = "";
    let bedrooms = "";

    if (numbers) {
      const [firstNum, secondNum] = numbers.map(Number);

      if (numbers.length === 1) {
        if (firstNum > 1000) {
          minPrice = firstNum;
        } else {
          bedrooms = firstNum;
        }
      } else if (numbers.length === 2) {
        minPrice = firstNum;
        maxPrice = secondNum;
      }
    }

    const searchParams = new URLSearchParams({
      location: locationMatch || "",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      bedrooms: bedrooms || "",
    });

    navigate(`/search?${searchParams.toString()}`);
    setSearchQuery("");
  };

  return (
    <>
      <header
        className={`w-full h-[10vh] md:h-[12vh] z-50 flex justify-center fixed transition-transform duration-300 ${
          isScrollingUp ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="p-4 bg-[#07113a] text-white flex justify-between items-center w-full md:w-[98%] z-50 h-[10vh]   md:h-[12vh]  lg:rounded-2xl">
          <div className="flex items-center  md:space-x-4">
            <Link to="/" className="text-lg font-bold">
              <img
                src="/images/logo-white.svg"
                alt="Home-logo"
                className="w-28 md:w-full"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-3xl"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 border-2 border-white rounded-3xl">
            <input
              className="w-96 h-12 pl-8 pr-4 py-3 text-lg bg-[#07113a] border-none outline-none text-white placeholder-white rounded-3xl"
              type="text"
              placeholder="Search by location, price, or bedrooms"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-[#4cf051]"
              onClick={handleSearch}
            >
              <IoSearchOutline className="text-3xl" />
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 flex-col">
              <IoHomeOutline className="text-2xl" />
              <span>Home</span>
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center space-x-2 flex-col"
            >
              <FaRegHeart className="text-2xl" />
              <span>Wishlist</span>
            </Link>
            <Link
              to="/shopping-cart"
              className="flex items-center space-x-2 flex-col"
            >
              <span className="bg-[#07113a] text-[#ef892f] w-5 h-5 text-center rounded-full z-10 -mb-7 -mr-3 text-xs">
                {totalItems}
              </span>
              <LiaCartPlusSolid className="text-5xl" />
              <span>Cart</span>
            </Link>

            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 flex-col"
                    >
                      <img
                        src={user.photoURL || "/images/user.webp"}
                        alt="profile"
                        className="rounded-full h-9 w-9"
                      />
                      <span>{user.displayName || user.email}</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center space-x-2 flex-col text-white"
                  >
                    <FaRegUserCircle className="text-3xl" />
                    <span>Welcome</span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-[10vh] left-0 w-full bg-[#07113a] flex flex-col items-center py-4 space-y-6 rounded-none">
              <Link to="/" className="flex items-center space-x-2 flex-col">
                <IoHomeOutline className="text-3xl" />
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center space-x-2 flex-col py-5"
              >
                <FaRegHeart className="text-3xl" />
              </Link>
              <Link
                to="/shopping-cart"
                className="flex items-center space-x-2 flex-col"
              >
                <span className="bg-[#07113a] text-[#ef892f] w-4 h-4 text-center rounded-full text-xs -m-6 z-10 -ml-3">
                  {totalItems}
                </span>
                <LiaCartPlusSolid className="text-5xl" />
              </Link>

              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center space-x-4">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 flex-col"
                      >
                        <img
                          src={user.photoURL || "/images/user.webp"}
                          alt="profile"
                          className="rounded-full h-9 w-9"
                        />
                        <span>{user.displayName || user.email}</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      className="flex items-center space-x-2 flex-col text-white"
                    >
                      <FaRegUserCircle className="text-4xl" />
                    </Link>
                  )}
                </>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
