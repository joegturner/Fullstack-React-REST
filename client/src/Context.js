import React, { Component } from 'react';
import Cookies from 'js-cookie';
import FetchAPI from './FetchAPI';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    };

    constructor() {
        super();
        this.fetchAPI = new FetchAPI();
    }

    render() { 
        const value = {
            authenticatedUser: this.state.authenticatedUser,
            fetchAPI: this.fetchAPI,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        };
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    // Persist Authorized Username and Password
    signIn = async (emailAddress, password) => {
        const user = await this.fetchAPI.getUser(emailAddress, password);

        if (user !== null) {
            user.password = password;
            this.setState(() => {
                return {authenticatedUser: user};
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        } 
        return user;
    }

    // Remove authenticated user from state and Cookies
    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null,
            };
        });
        Cookies.remove('authenticatedUser');
    }

}

export const Consumer = Context.Consumer;

/**
 * Higher-order component, wraps children component with Context
 * @param {class} Component - React component
 * @returns {function} - Context wrapper component
 */
export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}