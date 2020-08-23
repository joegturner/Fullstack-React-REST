import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <React.Fragment>
      <div className="error">
        <h1>Forbidden</h1>
        <p>Oh oh! You can't access this page.</p>
        <NavLink className="button button-secondary" to="/">
          Return to List
        </NavLink>
      </div>
    </React.Fragment>
  );
};
