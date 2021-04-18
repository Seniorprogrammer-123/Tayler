import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            error: '',
            formSubmitting: false,
            user: {
                email: '',
                password: '',
            },
            redirect: props.redirect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
    UNSAFE_componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }
    }
    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            // console.log(AppState);
            if(AppState.user.permission == "Admin"){
                const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/adminpanel' } };
                if (prevLocation && this.state.isLoggedIn) {
                    return this.props.history.push(prevLocation);
                }
            }
            else if(AppState.user.permission == "User"){
                const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/userpanel' } };
                if (prevLocation && this.state.isLoggedIn) {
                    return this.props.history.push(prevLocation);
                }
            }
            else if(AppState.user.permission == "Lab"){
                const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/labpanel' } };
                if (prevLocation && this.state.isLoggedIn) {
                    return this.props.history.push(prevLocation);
                }
            }
            else {
                const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/login' } };
                if (prevLocation && this.state.isLoggedIn) {
                    return this.props.history.push(prevLocation);
                }
            }
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        let userData = this.state.user;
        const token = document.querySelector('meta[name="csrf-token"]');
        // console.log(token.content);
        axios.post("/api/login", userData, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token.content
            }
        }).then(response => {
            return response;
        }).then(json => {
            if (json.data.success == true) {
                let userData = {
                    id: json.data.id,
                    name: json.data.name,
                    email: json.data.email,
                    access_token: json.data.access_token,
                    permission: json.data.permission,
                };

                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user,
                    error: ''
                });
                // location.reload()
                if(userData.permission == "Admin")
                    location.href = "/adminpanel";
                else if(userData.permission == "User")
                    location.href = "/userpanel";
                else if(userData.permission == "Lab")
                    location.href = "/labpanel";
                else
                    location.href = "/login";
            }
            else {
                alert(`Our System Failed To Register Your Account!`);
            }
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                let err = error.response.data;
                this.setState({
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                })
            }
            else if (error.request) {
                // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                let err = error.request;
                this.setState({
                    error: err,
                    formSubmitting: false
                })
            } else {
                // Something happened in setting up the request that triggered an Error
                let err = error.message;
                this.setState({
                    error: err,
                    formSubmitting: false
                })
            }
        }).finally(this.setState({ error: '' }));
    }
    handleEmail(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, email: value
            }
        }));
    }
    handlePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, password: value
            }
        }));
    }
    render() {
        const { state = {} } = this.state.redirect;
        const { error } = state;
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12">
                        <h2 className="text-center mb30 text-weight-bold">LOGIN</h2>
                        {this.state.isLoggedIn ? <FlashMessage duration={60000} persistOnHover={true}>
                            <h5 className={"alert alert-success"}>Login successful, redirecting...</h5></FlashMessage> : ''}
                        {this.state.error ? <FlashMessage duration={100000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5></FlashMessage> : ''}
                        {error && !this.state.isLoggedIn ? <FlashMessage duration={100000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
                        <form onSubmit={this.handleSubmit}>
                            <div className="card">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 text-left">
                                            <label className="text-white text-weight-bold">EMAIL</label>
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                            <input id="email" type="email" name="email" placeholder="E-mail" className="form-control" required onChange={this.handleEmail} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 text-left">
                                            <label className="text-white text-weight-bold">PASSWORD</label>
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                            <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={this.handlePassword} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12"></div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                    <button disabled={this.state.formSubmitting} type="submit" name="singlebutton" className="btn btn-default btn-lg  btn-block mb10 btn-agree"> {this.state.formSubmitting ? "Iniciando Sesión ..." : "ACCEDER"} </button>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12"></div>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-2 col-12"></div>
                            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                                <div className="hrspace"></div>
                                <Link className="btn btn-default btn-lg  btn-block mb10 text-dark text-weight-bold" to="/register">Recuperar Contracena</Link>
                                <div className="hrspace"></div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-2 col-12"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(LoginContainer);
