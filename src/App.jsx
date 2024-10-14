import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedNavbar from "./protectedComp/ProtectedNavbar";
const Navbar = lazy(() => import("./components/Navbar"));
const Home = lazy(() => import("./Pages/Home"));
const AuthPage = lazy(() => import("./Pages/AuthPage"));
const Profile = lazy(() => import("./Pages/Profile"));
const ShoppingCart = lazy(() => import("./Pages/ShoppingCart"));
const Wishlist = lazy(() => import("./Pages/Wishlist"));
const LinearProgressBar = lazy(() => import("./components/LinearProgressBar"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const PropertyDetails = lazy(() => import("./Pages/PropertyDetails"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const SearchResults = lazy(() => import("./Pages/SearchResults"));
const Footer = lazy(() => import("./Pages/Footer"));
import ErrorBoundary from "./utils/ErrorBoundary";

// Wrap Navbar with the withNavbar HOC
const NavbarWithProtection = ProtectedNavbar(Navbar);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<LinearProgressBar />}>
          {/* Render the Navbar only on specific routes */}
          <NavbarWithProtection />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/details/:id" element={<PropertyDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
