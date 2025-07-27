import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AppRoutes } from "../constants";

const NavBar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-white border-b p-4 flex justify-between">
      <h1 className="font-bold">⚽ Football Manager</h1>
      <div className="space-x-4">
        {token && (
          <>
            <Link to={AppRoutes.DASHBOARD}>Dashboard</Link>
            <Link to={AppRoutes.TRANSFER}>Transfers</Link>
            <button onClick={logout} className="text-red-600">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
