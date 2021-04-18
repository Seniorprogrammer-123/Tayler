import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
class Header extends Component {
    // 1.1
    constructor(props) {
        super(props);
        this.state = {
            user: props.userData,
            isLoggedIn: props.userIsLoggedIn
        };
        this.logOut = this.logOut.bind(this);
    }
    // 1.2
    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.props.history.push('/login');
    }


    // 1.3
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 text-left">

                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
const navLinks = [
    { title: `about us`, path: `/about-us` },
    { title: `product`, path: `/product` },
    { title: `blog`, path: `/blog` },
    { title: `contact`, path: `/contact` },
    { title: `faq`, path: `/faq` },
]
