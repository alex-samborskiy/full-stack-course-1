import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Layout = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.singOut();
  };
  return (
    <div>
      <nav>
        <button>
          <NavLink to="list"> List</NavLink>
        </button>
        <button>
          <NavLink to="profile">Profile</NavLink>
        </button>
        <button onClick={handleLogout}>LogOut</button>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
