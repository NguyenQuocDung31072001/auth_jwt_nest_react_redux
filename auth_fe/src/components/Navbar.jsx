import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const user=useSelector(state=>state.auth.login)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <p className="navbar-brand">
             {user.accessToken!==null ? `Welcome ${user.username}`:"Just login!"}
          </p>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"task"} className="nav-link active" aria-current="page">
                  Task
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"login"} className="nav-link" >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"logout"} className="nav-link" >
                  Logout
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
