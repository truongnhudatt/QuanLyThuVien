import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  let user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="header">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand id="title" href="/">
          Thư viện
        </Navbar.Brand>
        <Nav className="mr-auto navbar_wrapper">
          {localStorage.getItem("user-info") ? (
            <></>
          ) : (
            <>
              <Link id="login" to="/login">
                Đăng nhập
              </Link>
              <Link id="signup" to="/signup">
                Đăng ký
              </Link>
            </>
          )}
        </Nav>
        <Nav>
          {localStorage.getItem("user-info") ?
            <NavDropdown title={user && user.name}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            :
            <></>
          }
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
