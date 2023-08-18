import { useNavigate } from "react-router-dom";
import { API } from "../../api/api";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import "../../styles/auth.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, user } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Fill all fields");
      return;
    }

    if (isRegister) {
      API.post("/api/auth/register", {
        email,
        password,
      })
        .then((res) => {
          loginUser({ user: res.data.user, jwttoken: res.data.token });
          alert("Registered Successfully");
        })
        .catch((err) => {
          alert(err?.response?.data?.message || "Failed to register");
        });
    } else {
      API.post("/api/auth/login", {
        email,
        password,
      })
        .then((res) => {
          loginUser({ user: res.data.user, jwttoken: res.data.token });
          alert("Logged in Successfully");
        })
        .catch((err) => {
          alert(err?.response?.data?.message || "Failed to login");
        });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user, navigate]);

  return (
    <div className="container form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-heading">{isRegister ? "Register" : "Login"}</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </div>
        <div>
          <span>
            {isRegister ? "Already have account? " : "Don't have account? "}
            <span
              onClick={() => setIsRegister((prev) => !prev)}
              className="underline cursor-pointer"
            >
              {isRegister ? "login" : "register"}
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Home;
