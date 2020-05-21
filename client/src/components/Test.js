import React, { Component } from 'react';

class Test extends Component {

    state = {
        courses: null,
        test: ['one', 'two', 'three', 'four']
    }

    api(path, method = 'GET') {
        const url = path;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
    
        return fetch(url, options);
    }
      
    async getData () {
        const response = await this.api('http://localhost:5000/api/courses', 'GET');
        console.log(response.status);

        if(response.status === 200) {
            return response.json()
                .then(data => 
                    this.setState({courses: data})
                );
        } else {
            return null;
        }

    }

    componentDidMount() {
        this.getData();
    }

    renderCourses = () => {
        let courses = [];

        if (this.state.courses !== null) {
            for (let i = 0; i < this.state.courses.length; i++) {
                courses.push(
                    <li key={i}>
                        {this.state.courses[i].title}
                    </li>
                )
            }  
        }

        return courses;
    }

    render() {
        return (
        <div className="bounds">
            <span>Welcome!</span>
            <ul>
                {this.state.courses !== null ? 
                    this.renderCourses()
                    :
                    <h1>No data found</h1>
                }
            </ul>
        </div>
        );
    }
};

export default Test;