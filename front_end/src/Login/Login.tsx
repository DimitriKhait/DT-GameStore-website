import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { I_UserLoginInfo } from "../I_UserLoginInfo/I_UserLoginInfo";
import "./Login.css";

export function Login(props: { loggedIn: Function; userDetail: Function }) {
  const navigate = useNavigate();

  const { loggedIn, userDetail } = { ...props };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let tempUser: I_UserLoginInfo = {
      Email: (document.querySelector("#email") as HTMLInputElement).value,

      Pwd: (document.querySelector("#password") as HTMLInputElement).value,
    };

    const axiosGet = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `https://localhost:7210/api/App_users/UserLogin`,
          data: tempUser,
        });
        if (response.status === 200) {
          if (response.data.length > 0) {
            userDetail(response.data[0]);
            sessionStorage.setItem("userLoggedIn", "True");
            sessionStorage.setItem("userId", response.data[0].id);
            loggedIn(true);
            navigate(`/home`);
          } else {
            alert("Wrong User Credentials");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    axiosGet();
  };

  return (
    <div className="minHeightClass">
      <h1 className="title">Login</h1>
      <form className="loginForm">
        <div className="container">
          <label>Username</label>
          <input
            type="email"
            placeholder="Enter Username"
            name="email"
            id="email"
            required
          ></input>

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            required
          ></input>

          <button type="submit" onClick={submit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
