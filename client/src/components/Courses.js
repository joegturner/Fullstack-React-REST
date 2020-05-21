import React, { Component } from 'react';

class Courses extends Component {
    state = {
        courses: null,
        message: ""
    }

    componentDidMount() {
        this.getCourses();      
    }

    getCourses = async () => {
        const { fetchAPI } = this.props.context;
        const data = await fetchAPI.getCourses();

        if (data.status === 200) {
            this.setState({courses: data.data});
        } else if (data.status === 404) {
            this.setState({message: data.data.message});
        } else {
            this.setState({message: 'Courses were not found'});
        }
    }

    renderCourses = () => {
        let jsx = [];
        const { courses, message } = this.state;

        if (message.length > 0) {
            jsx.push(
                <h1 key={1}>{message}</h1>
            )
        } else if (courses !== null) {

            for (let i = 0; i < courses.length; i++) {
                jsx.push(
                    <div key={courses[i].id} className="grid-33">
                        <a className="course--module course--link" href={`/courses/${courses[i].id}`}>
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{courses[i].title}</h3>
                        </a>
                    </div>
                )
            }  
        } else  {
            jsx.push(<h1 key={1}>Loading...</h1>);
        }

        return jsx;
    }

    render() {
        return (
            <div className="bounds">
                {this.renderCourses()}
                <div className="grid-33">
                    <a className="course--module course--add--module" href="/courses/create">
                        <h3 className="course--add--title">
                            <svg viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>New Course
                        </h3>
                    </a>
                </div>
            </div>
        );
    }

}

export default Courses;