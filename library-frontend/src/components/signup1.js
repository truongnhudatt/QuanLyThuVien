import React, { useState, useEffect } from "react";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';
// function SignUp() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("user-info")) {
//       navigate("/books");
//     }
//   });
//   const formData = new FormData()
//   formData.append("name",name)
//   formData.append("email",email)
//   formData.append("password",password)
//   formData.append("confirm",confirm)

//   const saveUser = (e) => {
//     e.preventDefault();
//     console.log(e.target)
//     // if (name !== "" && email !== "" && password !== "" && confirm !== "") {
//     //   if (password === confirm) {
//     //     const user = { name, email, password };

//     //     UserService.createUser(user)
//     //       .then((response) => {
//     //         navigate("/books");
//     //       })
//     //       .catch((error) => {
//     //         console.log(error);
//     //       });
//     //     localStorage.setItem("user-info", JSON.stringify(user));
//     //   }
//     //   else {
//     //     setMessage("Xác nhận mật khẩu không giống nhau");
//     //   }
//     // } else {
//     //   setMessage("Vui lòng nhập đủ các trường");
//     // }
//   };

//   return (
//     <div id="signup-page" className="col-sm-6 offset-sm-3">
//       <h1>Đăng ký</h1>
//       <input
//         type="text"
//         onChange={(e) => {
//           setName(e.target.value);
//         }}
//         required
//         className="form-control"
//         placeholder="Họ và tên"
//       />
//       <br />
//       <input
//         type="email"
//         onChange={(e) => {
//           setEmail(e.target.value);
//         }}
//         required
//         className="form-control"
//         placeholder="Email"
//       />
//       <br />
//       <input
//         type="password"
//         onChange={(e) => {
//           setPassword(e.target.value);
//         }}
//         required
//         className="form-control"
//         placeholder="Mật khẩu"
//       />
//       <br />
//       <input
//         type="password"
//         onChange={(e) => {
//           setConfirm(e.target.value);
//         }}
//         required
//         className="form-control"
//         placeholder="Xác nhận mật khẩu"
//       />
//       <br />
//       <p>{message}</p>
//       <button className="btn btn-primary" onClick={(e) => saveUser(e)}>
//         Đăng ký
//       </button>
//     </div>
//   );
// }

// export default SignUp;

class SignUp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="formSignUp">
        <h1 className="text-center">Đăng ký</h1>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
      <div id="signup-page" className="col-sm-6 offset-sm-3">
        <div>
          <input
              type="text"
              required
              className="form-control"
              placeholder="Họ và tên"
            />
        </div>
        <br/>
        <div style={{display:"flex"}} className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            required
            value={this.state.email}
            className="form-control"
            placeholder="Email"
          />
        </div>
        <br />
        <input
          type="password"
          required
          className="form-control"
          placeholder="Mật khẩu"
        />
        <br />
        <input
          type="password"
          required
          className="form-control"
          placeholder="Xác nhận mật khẩu"
        />
        <br />
        <button className="btn btn-primary">
          Đăng ký
        </button>
      </div>
      </form>
    )
  }
}

export default SignUp;