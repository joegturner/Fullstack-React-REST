import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    
    render() { 
        const user = this.props.context.authenticatedUser;
        
        return (
            <div className="header">
                <div className="bounds">
                    <a className="header--logo" href="/">Courses</a>
                    <nav>
                        {user ? 
                            <React.Fragment>
                                <span>Welcome, {user.firstName} {user.lastName}!</span>
                                <Link to="/signout">Sign Out</Link>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Link className="signup" to="/signup">Sign Up</Link>
                                <Link className="signin" to="/signin">Sign In</Link>
                            </React.Fragment>
                        }
                    </nav>       
                </div>
            </div>
        )
    }
}
 
export default Header;