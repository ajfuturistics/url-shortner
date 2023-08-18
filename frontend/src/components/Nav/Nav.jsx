import { useEffect } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <nav className="nav-container">
      <button onClick={logout} type="button">
        Logout
      </button>
    </nav>
  );
};

export default Nav;
