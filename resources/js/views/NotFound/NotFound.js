import React, { Component } from 'react';
class NotFound extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container text-center">
                <h2 className="text-danger" style={{fontSize:'50px'}}>Oops!<br />404 Not Found Page!</h2>
            </div>
        )
    }
}
export default NotFound
