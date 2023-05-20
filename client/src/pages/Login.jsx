import axios from "axios";
import React, { useContext, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const { state, dispatch } = useContext(UserAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/login", { username, password });
      dispatch({
        type: "LOGIN",
        id: data.userProfile._id,
        username: data.userProfile.username,
      });
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setError(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
      } else console.log(err.message);
    }
  };

  return (
    <div className="login-signup-form">
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Dont have an acount?</Link>
    </div>
  );
};

export default Login;
