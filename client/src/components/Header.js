import React from "react";
import { NavLink } from "react-router-dom";

export default ({ context }) => {
  const user = context.authenticatedUser;
  return (
    <div className="header">
      {/* <div className="bounds"> */}
      <div className="header-logo-box">
        <a className="header-logo" href="/">
          Courses Manager
        </a>
      </div>
      <div className="header-nav-box">
        <nav className="header-nav">
          {user ? (
            <React.Fragment>
              <span className="welcome-user">
                Welcome, {user.firstName} {user.lastName}!
              </span>
              <NavLink className="nav-btn" to="/signout">
                Sign Out
              </NavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink className="nav-btn" to="/signup">
                Sign Up
              </NavLink>
              <NavLink className="nav-btn" to="/signin">
                Sign In
              </NavLink>
            </React.Fragment>
          )}
        </nav>
      </div>

      {/* </div> */}
    </div>
  );
};
