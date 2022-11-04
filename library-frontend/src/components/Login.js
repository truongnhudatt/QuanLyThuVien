import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from '../Services/UserService.js'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/books");
    }
  });

  const getAllUsers = () => {
    UserService.getAllUsers()
      .then((response) => {
        const users = response.data;
        users.map((user) => {
          if(user.email === email && user.password === password){
            localStorage.setItem("user-info", JSON.stringify(user));
          }
        })
        if(localStorage.getItem("user-info")){
          navigate("/books");
        }
        else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function checkUser() {
    if(email !== "" && password !== ""){
      getAllUsers();
      setError("Email hoặc mật khẩu không chính xác")
    }
    else {
      setError("Vui lòng điền đầy đủ các trường")
    }
  }

  return (
    <div id="signup-page" className="col-sm-6 offset-sm-3">
      <h1>Đăng nhập</h1>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="form-control"
        placeholder="email"
      />
      <br />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="form-control"
        placeholder="password"
      />
      <br />
      <p>{error}</p>
      <button className="btn btn-primary" onClick={(e) => checkUser(e)}>
        Đăng nhập
      </button>
    </div>
  );
}

export default Login;
