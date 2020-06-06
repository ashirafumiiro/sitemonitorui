import React, {Component} from "react";
//import {Link} from "react-router-dom";
import './signin.css'
//import {RestDataSource} from "./webservice/RestDataSource";
import Axios from "axios";
import {Redirect} from "react-router-dom";


const qs = require('querystring')

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state =  {
            username: "",
            password: '',
            remember: false,
            errors: '',
            isLoading: false,
            isLoggedIn: false
        }
    }

    responseCallback = (data) =>{
        if (data.error === 'success'){
            this.props.onLogOn(data.user);
            //Session.set('user', data.user);
            sessionStorage.setItem('user', data.user);

            this.setState({isLoggedIn: true});
        }
        else{
            this.setState({errors: data.error})
        }
        this.setState({isLoading: false});
    }

    handleLogin = (e)=>{
        this.setState({isLoading: true});
        e.preventDefault();
        let error_message = '';
        //console.log("email:", this.state.username," Pwd: ", this.state.password)
        if(!this.state.username || !this.state.password)
            error_message = "Both Email and password are required!";
        else if (!this.isValidEmail(this.state.username))
            error_message = "Invalid Email address";

        if(error_message) {
            this.setState({errors: error_message});
            this.setState({isLoading: false});
        }
        else {
            this.setState({errors: ''});
            let content = {
                email: this.state.username,
                password: this.state.password
            }
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            let callback = this.responseCallback;
            let onNetworkError = this.errorCallback;
             Axios.post('http://172.105.86.177/monitor/monitor/api_login',
                 qs.stringify(content),
                 config)
            .then(function (response) {
                let data = response.data;
                //console.log("Res: ", data);
                callback(data)
            })
            .catch(function (error) {
                //console.log("Error", error);
                onNetworkError(error);
            });

            //this.dataSource.Store(content, (data)=>this.responseReceived(data))
        }
    }
    errorCallback = (data)=>{
        this.setState({isLoading: false});
        this.setState({errors: "Unable to Connect"})
        //console.log("Error", data);
    }
    render() {
        return <div className="">
            <div className="text-center signin-div">
                <form className="form-signin">
                    <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72"
                         height="72" />

                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                           value={this.state.username}
                           onChange={(e)=>this.setState({username: e.target.value})}
                           autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           value={this.state.password}
                           onChange={event => this.setState({password: event.target.value})}
                           required />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value={this.state.remember}
                                   onChange={event => this.setState({remember: event.target.checked})
                                   }
                            /> Remember me
                        </label>
                    </div>
                    {
                        this.state.errors &&
                        <div className="alert alert-warning" role="alert">
                            {this.state.errors}
                        </div>
                    }

                    <button className="btn btn-lg btn-primary btn-block"
                            onClick={this.handleLogin}
                            type="submit">
                        {
                            !this.state.isLoading ? "Login": <React.Fragment>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </React.Fragment>
                        }

                    </button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
                </form>
            </div>
            {
                this.state.isLoggedIn && <Redirect to="/" />
            }
        </div>
    }

    isValidEmail = (email)=>{
        let re = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

        return re.test(email);
    }
}