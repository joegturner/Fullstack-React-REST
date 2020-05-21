import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

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

    // renderCourse() {
    //     let jsx = [];
    //     const { course } = this.state;
        
    //     if (course !== null) {
    //         jsx.push(
    //             <div key={1} className="grid-66">
    //                 <div className="course--header">
    //                     <h4 className="course--label">Course</h4>
    //                     <h3 className="course--title">{course.title}</h3>
    //                     <p>{`By ${course.user.firstName} ${course.user.lastName}`}</p>
    //                 </div>
    //                 <div className="course--description">
    //                     {course.description.split("\n").map((text, index) => 
    //                         <p key={index}>{text}</p>
    //                     )}
    //                 </div>
    //                 <div className="grid-25 grid-right"></div>
    //                     <div className="course--stats">
    //                         <ul className="course--stats--list">
    //                             <li className="course--stats--list--item">
    //                             {course.estimatedTime ?
    //                                 <div>
    //                                     <h4>Estimated Time</h4>
    //                                     <h3>{course.estimatedTime}</h3>
    //                                 </div>
    //                                 :
    //                                 null
    //                             }
    //                             </li>
    //                             <li className="course--stats--list--item">
    //                             {course.materialsNeeded ?
    //                                 <div>
    //                                     <h4>Materials Needed</h4>
    //                                     <ul>
    //                                         {course.materialsNeeded.split("*").map((material, index) => 
    //                                             material === "" ?
    //                                             null
    //                                             :
    //                                             <li key={index}>{material}</li>
    //                                         )}
    //                                     </ul>
    //                                 </div>
    //                                 :
    //                                 null
    //                             }
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //         );
    //     } else  {
    //         jsx.push(<h1 key={1}>Loading...</h1>);
    //     }

    //     return jsx;
    // }

    renderCourse() {
        let jsx = [];
        const { course } = this.state;
        console.log(course);
        
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
                                    <a 
                                        className="button" 
                                        href={`${course.id}/update`}>
                                        Update Course</a>
                                    <button 
                                        className="button" 
                                        onClick={() => this.showDeleteConfirm()}>
                                    Delete Course</button>
                                </span>
                                :
                                null
                            }
                            <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    </div>
                    {showDeleteConfirmation ?
                        <div className="bounds">
                            <div className="grid-100" style={{margin: '20px'}}>
                                <h4>Please confirm deletion:</h4>
                                <button 
                                    className="button"
                                    onClick={() => this.handleDelete()}>
                                    Yes, delete!</button>
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