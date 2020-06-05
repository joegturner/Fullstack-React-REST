import React, { Component } from 'react';
import Form from './Form';

class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }


    render() { 
        const {
            errors
        } = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={() => (
                            <React.Fragment>
                                <div className="grid-66">
                                    {this.renderFormTitle()}
                                    {this.renderFormDescription()}
                                </div>
                                <div className="grid-25">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            {this.renderFormEstimatedTime()}
                             
                                        </ul>
                                    </div>
                                </div>
                                <div className="grid-25">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                     
                                            {this.renderFormMaterialsNeeded()}
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                            
                        )}
                    />
                </div>
            </div>
        );
    }

    change = (event) => {
        const { name, value } = event.target;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = async () => {
        const { fetchAPI, authenticatedUser } = this.props.context;
        const { emailAddress, password } = authenticatedUser;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;

        const course = {
            title,
            description: description.replace(/\n/g, '  \n'),
            estimatedTime: estimatedTime.includes('hour') ? 
                estimatedTime : 
                estimatedTime.includes('one', 0) || (estimatedTime.length === 1 && estimatedTime.includes('1', 0)) ? 
                    estimatedTime + ' hour' :
                    estimatedTime + ' hours',
            materialsNeeded: materialsNeeded.replace(/\n/g, '  \n')
        };

        const data = await fetchAPI.createCourse(course, emailAddress, password);
        if (data.status === 201) {
            this.props.history.push(`/courses${data.location}`);
        } else if (data.status === 400) {
            this.setState({ errors: data.message });
        } else if (data.status === 401) {
            this.props.history.push('/forbidden');
        } else {
            this.props.history.push('/error');
        }
    }

    cancel = () => {
        this.props.history.push('/');
    }

    renderFormTitle() {
        const { title } = this.state;
        return (
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                    <input 
                        className="input-title course--title--input" 
                        id="title" 
                        name="title" 
                        type="text"
                        value={title}
                        onChange={this.change}
                        placeholder="Course title..."  />
                </div>
                <p>By Joes Smith</p>
            </div>
        )
    }

    renderFormDescription() {
        const { description } = this.state;
        return (
            <div className="course--description">
                <textarea 
                    id="description" 
                    name="description" 
                    className="" 
                    value={description}
                    onChange={this.change}
                    placeholder="Course description...">
                </textarea>
            </div>
        )
    }

    renderFormEstimatedTime() {
        const { estimatedTime } = this.state;
        return (
            <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <div>
                    <input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text" 
                        className="course--time--input"
                        value={estimatedTime}
                        onChange={this.change}
                        placeholder="Hours">
                    </input>
                </div>
            </li>
        )
    }

    renderFormMaterialsNeeded() {
        const { materialsNeeded } = this.state;
        return (
            <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <div>
                    <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        className="" 
                        value={materialsNeeded}
                        onChange={this.change}
                        placeholder="List materials...">
                    </textarea>
                </div>
            </li>
        )
    }
}
 
export default CreateCourse;

