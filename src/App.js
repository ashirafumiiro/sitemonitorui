import React, {Component} from 'react';
//import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js'
import  'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './dashboard.css';
import ContentArea from "./ContentArea";
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import Login from "./pages/Login";


class App extends Component{
    constructor(props) {
        super(props);
        this.state ={
            isLoggedIn : false,
            user: undefined,
            customer_id: undefined
        }
    }
    onLogOn = (user) =>{
        this.setState({isLoggedIn: true});
        this.setState({user: user});
        console.log("logged in user:", user);
        //window.location="/";
        this.render()

    }

    render() {
    let name = "Power Monitoring Tool";
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/login" exact={true} render={routeProps=>
                        <Login onLogOn={this.onLogOn}/>
                    }/>
                    <Route path="/" render={routeProps => {
                        if(!(sessionStorage.getItem('user'))){
                            return <Redirect to="/login" />
                        }
                        return <ContentArea companyName={name}/>
                    }
                    }

                    />
                </Switch>
            </div>
        </Router>

    );
  }
}

export default App;
