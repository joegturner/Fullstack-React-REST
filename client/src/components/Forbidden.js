import React from 'react';

export default () => {
    return (
        <React.Fragment>
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
        </div>
        <div className="bounds grid=100">
            <a className="button button-secondary" href="/">Return to List</a>
        </div>
        </React.Fragment>

    );
}