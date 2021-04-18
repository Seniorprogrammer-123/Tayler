import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';
class RegisterContainer extends Component {
    // 2.1
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            error: '',
            errorMessage: '',
            formSubmitting: false,
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            redirect: props.redirect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    }
    // 2.2
    // componentWillMount, componentDidMount etc etc that have //componentStuffStuff are known as React Lifecycles which of course //you already know
    UNSAFE_componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
        if (this.state.isRegistered) {
            location.href = "/home";
        }
    }
    // 2.3
    componentDidMount() {
        const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/home' } };
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }
    // 2.4
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        ReactDOM.findDOMNode(this).scrollIntoView();
        let userData = this.state.user;
        if(userData.password != userData.password_confirmation){
            alert("The password and confirm pasword isn't match!");
            this.setState({ formSubmitting: false });
            document.getElementById('password_confirm').focus();
            return;
        }
        const token = document.querySelector('meta[name="csrf-token"]');
        // console.log(userData);
        axios.post("/api/signup", userData).then(response => {
                return response;
            }).then(json => {
                if (json.data.success == true) {
                    let userData = {
                        id: json.data.id,
                        name: json.data.name,
                        email: json.data.email,
                        activation_token: json.data.activation_token,
                    };
                    let appState = {
                        isRegistered: true,
                        user: userData
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isRegistered: appState.isRegistered,
                        user: appState.user
                    });
                } else {
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
    handleName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, name: value
            }
        }));
    }
    // 2.5
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
    handlePasswordConfirm(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user, password_confirmation: value
            }
        }));
    }
    render() {
        // 2.6
        let errorMessage = this.state.errorMessage;
        let arr = [];
        Object.values(errorMessage).forEach((value) => (
            arr.push(value)
        ));
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12">
                        <h2 className="text-center">CREA TU CUENTA</h2>
                        {this.state.isRegistered ? <FlashMessage duration={60000} persistOnHover={true}>
                            <h5 className={"alert alert-success"}>Registration successful, redirecting...</h5></FlashMessage> : ''}
                        {this.state.error ? <FlashMessage duration={900000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5>
                            <ul>
                                {arr.map((item, i) => (
                                    <li key={i}><h5 style={{ color: 'red' }}>{item}</h5></li>
                                ))}
                            </ul></FlashMessage> : ''}
                        <form onSubmit={this.handleSubmit}>
                            <div className="card">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 text-left">
                                            <label className="text-white text-weight-bold">NUMBRE</label>
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                            <input id="name" type="text" placeholder="Name" className="form-control" required onChange={this.handleName} />
                                        </div>
                                    </div>
                                </div>
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
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 text-left">
                                            <label className="text-white text-weight-bold">REPASSWORD</label>
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                            <input id="password_confirm" type="password" name="password_confirm" placeholder="Confirm Password" className="form-control" required onChange={this.handlePasswordConfirm} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-3 col-lg-3 col-md-2 col-12"></div>
                                <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                                <button type="submit" name="singlebutton" className="btn btn-default btn-lg  btn-block mb10 btn-agree" disabled={this.state.formSubmitting ? "disabled" : ""}>Crear una cuenta</button>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-2 col-12"></div>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12"></div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                <Link to="/login" className="btn btn-default btn-lg  btn-block mb10 text-dark">Acceso</Link>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-12"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// 2.8
export default withRouter(RegisterContainer);
