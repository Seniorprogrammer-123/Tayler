import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import RegisterContainer from './RegisterContainer';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: props.location,
        }
    }
    render() {
        return (
            <div className="content">
                <Header />
                <RegisterContainer redirect={this.state.redirect} />
            </div>
        )
    }
}
export default Register
