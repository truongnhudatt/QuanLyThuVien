import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from '../Services/UserService.js'

  function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
  
    const checkLogin = e => {
      e.preventDefault();
      const userLogin = {email, password}
      UserService.login(userLogin)
      .then((response) => {
        console.log(response)
        const statusResponse = response.data
        navigate("/books");
        localStorage.setItem("user-info", JSON.stringify(statusResponse.data));
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = error.response.data
        setMessage(errorMessage.message)
      })

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
        required
      />
      <br />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="form-control"
        placeholder="password"
        required
      />
      <br />
      <p>{message}</p>
      <button className="btn btn-primary" disabled={(email.length > 0 && password.length > 0) ? false : true} onClick={e => checkLogin(e)}>
        Đăng nhập
      </button>
    </div>
  );
// }
}

export default Login
