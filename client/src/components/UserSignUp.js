import React, { Component } from 'react';
import Form from './Form';

class UserSignIn extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    };
    
    render() { 
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                        <Form 
                            cancel={this.cancel}
                            submit={this.submit}
                            errors={errors}
                            submitButtonText="Sign Up"
                            elements={() => (
                                <React.Fragment>
                                    <input 
                                        id="firstName" 
                                        name="firstName" 
                                        type="text"
                                        value={firstName} 
                                        onChange={this.change}
                                        placeholder="First Name" />
                                    <input 
                                        id="lastName" 
                                        name="lastName" 
                                        type="text"
                                        value={lastName} 
                                        onChange={this.change}
                                        placeholder="Last Name" />
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
                                        placeholder="Password" />
                                    <input 
                                        id="confirmPassword" 
                                        name="confirmPassword" 
                                        type="confirmPassword" 
                                        value={confirmPassword} 
                                        onChange={this.change}
                                        placeholder="Confirm Password" />
                                </React.Fragment>
                            )}
                        />
                    <p>Already have a user account? 
                        <a href="/signin"> Click here </a> 
                        to sign in!
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

    submit = () => {
        const { context } = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password
        } = this.state;

        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }

        context.fetchAPI.createUser(user)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                        this.props.history.push('/authenticated');
                        });
                console.log(`${emailAddress} is successfully signed up and authenticated!`);
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }
}
 
export default UserSignIn;