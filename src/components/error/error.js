import React from 'react';

const Error = ({errorMessage}) => {
    return (<div className="alert alert-danger">
        <strong>{errorMessage}</strong>
    </div>)
}

export default Error;