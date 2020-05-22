import React from 'react';
import { NavLink } from 'react-router-dom';


export default ( {context }) => {

    const user = context.authenticatedUser;
    return (
        <div className="header">
            <div className="bounds">
                <a className="header--logo" href="/">Courses</a>
                <nav>
                    {user ? 
                        <React.Fragment>
                            <span>Welcome, {user.firstName} {user.lastName}!</span>
                            <NavLink to="/signout">Sign Out</NavLink>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <NavLink className="signup" to="/signup">Sign Up</NavLink>
                            <NavLink className="signin" to="/signin">Sign In</NavLink>
                        </React.Fragment>
                    }
                </nav>       
            </div>
        </div>
    );
}