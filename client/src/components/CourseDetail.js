import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';

class CourseDetail extends Component {
    state = {
        course: null,
        deleteRequested: false
    }

    render() { 

        return (  
            <React.Fragment>
                <div className="actions--bar">
                    {this.renderButtons()}
                </div>
                <div className="bounds course--detail">
                    {this.renderCourse()}  
                </div>
            </React.Fragment>       
        );
    }

    componentDidMount() {
        this.getCourse();      
    }

    getCourse = async () => {
        const { fetchAPI } = this.props.context;
        const id = this.props.match.params.id;

        const data = await fetchAPI.getCourse(id);

        if (data.status === 200) {
            this.setState({course: data.data});
        } else if (data.status === 404) {
            this.props.history.push('/notfound');
        } else {
            this.props.history.push('/error');
        }
    }

    handleDelete = async () => {
        const { fetchAPI, authenticatedUser } = this.props.context;
        const id = this.props.match.params.id;
        const { emailAddress, password } = authenticatedUser;

        const data = await fetchAPI.deleteCourse(id, emailAddress, password);

        if (data.status === 204) {
            this.props.history.push('/');
        } else if (data.status === 403) {
            this.props.history.push('/forbidden');
        } else if (data.status === 404) {
            this.props.history.push('/notfound');
        } else {
            this.props.history.push('/error');
        }
    }

    renderCourse() {
        let jsx = [];
        const { course } = this.state;
        
        if (course !== null) {
            jsx.push(
                <div key={1} className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        <p>{`By ${course.user.firstName} ${course.user.lastName}`}</p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown source={course.description} />
                    </div>
                    <div className="grid-25 grid-right"></div>
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                {course.estimatedTime ?
                                    <React.Fragment>
                                        <h4>Estimated Time</h4>
                                        <h3>{course.estimatedTime}</h3>
                                    </React.Fragment>
                                    :
                                    null
                                }
                                </li>
                                <li className="course--stats--list--item">
                                {course.materialsNeeded ?
                                    <React.Fragment>
                                        <h4>Materials Needed</h4>
                                            <ReactMarkdown source={course.materialsNeeded} />
                                    </React.Fragment>
                                    :
                                    null
                                }
                                </li>
                            </ul>
                        </div>
                    </div>
            );
        } else  {
            jsx.push(<h1 key={1}>Loading...</h1>);
        }

        return jsx;
    }


    renderButtons() {
        const { course } = this.state;
        const authUser = this.props.context.authenticatedUser;
        const showDeleteConfirmation = this.state.deleteRequested;

        let authenticated = false;
        
        if (authUser !== null && this.state.course !== null) {
            if (this.state.course.user.id === authUser.id) {
                authenticated = true;
            }
        }

        if (course !== null) {
            return (
                <span>
                    <div className="bounds">
                        <div className="grid-100"> 
                            {authenticated ?
                                <span>
                                    <NavLink 
                                        className="button" 
                                        to={`${course.id}/update`}>
                                        Update Course</NavLink>
                                    <button 
                                        className="button" 
                                        onClick={() => this.showDeleteConfirm()}>
                                    Delete Course</button>
                                </span>
                                :
                                null
                            }
                            <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                        </div>
                    </div>
                    {showDeleteConfirmation ?
                        <div className="bounds">
                            <div className="grid-100" style={{margin: '10px'}}>
                                <button 
                                    className="button"
                                    onClick={() => this.handleDelete()}>
                                    Confirm delete</button>
                                <button 
                                    className="button button-secondary" 
                                    onClick={() => this.hideDeleteConfirm()}>
                                    No, cancel</button>
                            </div>
                        </div>
                        :
                        null
                    }
                </span>   
            )
        } else {
            return null;
        }
    }

    showDeleteConfirm() {
        this.setState({ deleteRequested: true });
    }

    hideDeleteConfirm() {
        this.setState({ deleteRequested: false });
    }

}
 
export default CourseDetail;