import React, { useState } from "react";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

    const saveUser = e => {
      e.preventDefault();
      if(password === confirm){
        const user = {username,email,password}
        // console.log(user)
        UserService.createUser(user)
          .then((response) => {
            console.log(response.status)
            const statusResponse = response.data
            navigate("/books");
            localStorage.setItem("user-info", JSON.stringify(statusResponse.data));
          })
          .catch((error) => {
            console.log(error)
            const errorMessage = error.response.data
            console.log(errorMessage)
            if(errorMessage.message === "Email này đã được sử dụng"){
              setMessage(errorMessage.message)
            }
            else{
              const log = errorMessage.errors[0].defaultMessage
              if(log === "size must be between 8 and 2147483647")
              setMessage("Mật khẩu yêu cầu 8 kí tự")
            }
          });
      }
      else{
        setMessage("Xác nhận mật khẩu không khớp")
      }
    }
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