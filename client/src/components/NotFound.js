import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <React.Fragment>
      <div className="error">
        <h1>Not Found</h1>
        <p>Sorry! We couldn't find the page you're looking for.</p>
        <NavLink className="button button-secondary" to="/">
          Return to List
        </NavLink>
      </div>
    </React.Fragment>
  );
};
