import { useLocation } from "react-router-dom";

const ProtectedNavbar = (NavbarComponent) => {
  return () => {
    const location = useLocation();
    const hideNavbarRoutes = ["/auth"];

    return !hideNavbarRoutes.includes(location.pathname) ? (
      <NavbarComponent />
    ) : null;
  };
};

export default ProtectedNavbar;
