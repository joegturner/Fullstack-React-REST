import React from 'react';

export default () => {

    return (   
        <React.Fragment>
            <div className="bounds">
                <h1>Error</h1>
                <p>Sorry! We just encountered an unexpected error.</p>
            </div>
            <div className="bounds grid=100">
                <a className="button button-secondary" href="/">Return to List</a>
            </div>
        </React.Fragment>
    );
}