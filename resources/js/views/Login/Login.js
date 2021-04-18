import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import LoginContainer from './LoginContainer';
import { withRouter } from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: props.location,
        };
    }
    render() {
        return (
            <div className="content">
                <Header />
                <LoginContainer redirect={this.state.redirect} />
            </div>
        )
    }
}
export default withRouter(Login)
