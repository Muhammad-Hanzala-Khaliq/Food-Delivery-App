import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from 'react-toastify'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
  const { url,setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if(currState==="Login"){
        newUrl += '/api/user/login'
    }
    else{
        newUrl += '/api/user/register'
    }

    const response = await axios.post(newUrl,data);
    if(response.data.success){
    setToken(response.data.token);
    localStorage.setItem("token",response.data.token);
    console.log(response.data)
    setShowLogin(false)
    toast.success(`Welcome, ${response.data.name}`);
    }else{
        alert(response.data.message)
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continue, I agree to the term of use & privacy policy</p>
        </div>
        {currState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        ) : (
          <p>
            Create a New Account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
