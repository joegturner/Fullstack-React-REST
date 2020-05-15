import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Test extends Component {

    state = {
        courses: []
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
      
    async getData() {
        const response = await this.api('http://localhost:5000/api/courses', 'GET');
        console.log(response.status);
        if (response.status === 200) {
            let test =[];
            response.json().then(data => test.push(data));
            // this.setState({
            //     courses: test
            // });
            console.log(test);
            return test;
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }


    render() {
        const data = this.getData();
        console.log(data);
        
        return (
        <div className="header">
            <span>Welcome!</span>
            <ul>
                <li>poop</li>
            </ul>
        </div>
        );
    }
};

export default Test;