import React, { Component } from 'react';
import Form from './Form';

class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: []
    };
    
    render() { 
        const {
            emailAddress,
            password,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                        <Form 
                            cancel={this.cancel}
                            submit={this.submit}
                            errors={errors}
                            submitButtonText="Sign in"
                            elements={() => (
                                <React.Fragment>
                                    <input 
                                        id="emailAddress" 
                                        name="emailAddress" 
                                        type="text"
                                        value={emailAddress} 
                                        onChange={this.change}
                                        placeholder="Email Address" />
                                    <input 
                                        id="password" 
                                        name="password" 
                                        type="password" 
                                        value={password} 
                                        onChange={this.change}
                                        placeholder="password" />
                                </React.Fragment>
                            )}
                        />
                    <p>Don't have a user account? 
                        <a href="/signup"> Click here </a> 
                        to sign up!
                    </p>
                </div>
            </div>
        );
    }

    change = (event) => {
        const { name, value } =  event.target;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // Store authenticated user to Context Provider's state
    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: {pathname: '/' }};
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress, password)
            .then( user => {
                if (user === null) {
                    this.setState(() => {
                        return { 
                            errors: ['Sign-in was unsuccessful'],
                            password: ''
                        };
                    });  
                } else {
                    this.props.history.push(from);
                    console.log(`SUCCESS! ${emailAddress} is now signed in!`);
                }
            })
            .catch((err) => {
                this.props.history.push('/error')
            })

    }

    cancel = () => {
        this.props.history.push('/');
    }
}
 
export default UserSignIn;