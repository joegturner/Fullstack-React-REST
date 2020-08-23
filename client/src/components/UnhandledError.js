import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <React.Fragment>
      <div className="error">
        <h1>Error</h1>
        <p>Sorry! We just encountered an unexpected error.</p>
        <NavLink className="button button-secondary" to="/">
          Return to List
        </NavLink>
      </div>
    </React.Fragment>
  );
};
