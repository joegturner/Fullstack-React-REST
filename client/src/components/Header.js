import React from "react";
import { NavLink } from "react-router-dom";

export default ({ context }) => {
  const user = context.authenticatedUser;
  return (
    <header className="header">
      <h1 className="heading-1 text-shadow mb-sm">Courses Catalog</h1>
      <div className="header__box">
        {user ? (
          <React.Fragment>
            <span className="header__welcome">
              Welcome, {user.firstName} {user.lastName}!
            </span>
            <NavLink className="header__btn text-shadow" to="/signout">
              Sign Out
            </NavLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink className="header__btn" to="/signup">
              Sign Up
            </NavLink>
            <NavLink className="header__btn" to="/signin">
              Log In
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </header>
  );
};
