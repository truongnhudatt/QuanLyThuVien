import React, { useState, useEffect } from "react";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/books");
    }
  });

  const saveUser = (e) => {
    e.preventDefault();
    if (username !== "" && email !== "" && password !== "" && confirm !== "") {
      if (password === confirm) {
        const user = { username, email, password };

        UserService.createUser(user)
          .then((response) => {
            navigate("/books");
          })
          .catch((error) => {
            console.log(error);
          });
        localStorage.setItem("user-info", JSON.stringify(user));
      }
      else {
        setMessage("Xác nhận mật khẩu không giống nhau");
      }
    } else {
      setMessage("Vui lòng nhập đủ các trường");
    }
  };

  return (
    <div id="signup-page" className="col-sm-6 offset-sm-3">
      <h1>Đăng ký</h1>
      <input
        type="text"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        className="form-control"
        placeholder="Username"
      />
      <br />
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="form-control"
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="form-control"
        placeholder="Password"
      />
      <br />
      <input
        type="password"
        onChange={(e) => {
          setConfirm(e.target.value);
        }}
        className="form-control"
        placeholder="Confirm password"
      />
      <br />
      <p>{message}</p>
      <button className="btn btn-primary" onClick={(e) => saveUser(e)}>
        Đăng ký
      </button>
    </div>
  );
}

export default SignUp;