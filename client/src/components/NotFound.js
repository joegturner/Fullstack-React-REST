import React from 'react';

export default () => {
    return (
        <React.Fragment>
            <div className="bounds">
                <h1>Not Found</h1>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
            <div className="bounds grid=100">
                <a className="button button-secondary" href="/">Return to List</a>
        </div>
        </React.Fragment>
    );
}