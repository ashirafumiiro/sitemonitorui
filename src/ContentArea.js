import React, {Component} from 'react';
import {NavLink, Route, Switch, Link} from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Device from "./pages/Device";
import {RequestError} from "./webservice/RequestError";
import LogsView from "./components/LogsView";
//import {RestDataSource} from "./webservice/RestDataSource";

export default class ContentArea extends Component{

    handleSignOut = () => {
        sessionStorage.clear();
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/" exact="true">{this.props.companyName}</Link>
                        <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                               aria-label="Search" />
                        <ul className="navbar-nav px-3">
                            <li className="nav-item text-nowrap">
                                <Link className="nav-link" onClick={this.handleSignOut} to="/login">Sign out</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="container-fluid">
                        <div className="row">
                            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                                <div className="sidebar-sticky">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/" exact={true} activeClassName="active">
                                                <FeatherIcon icon="home" />
                                                Dashboard <span className="sr-only">(current)</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/devices" activeClassName="active">
                                                <FeatherIcon icon="upload-cloud" />
                                                Sites
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/reports" activeClassName="active">
                                                <FeatherIcon icon="file" />
                                                Reports
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/notifications" activeClassName="active">
                                                <FeatherIcon icon="bell" />
                                                Notifications
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/periodic" activeClassName="active">
                                                <FeatherIcon icon="user" />
                                                Accounts
                                            </NavLink>
                                        </li>
                                    </ul>

                                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                        <span>Saved reports</span>
                                        <NavLink className="d-flex align-items-center text-muted" to="/savedreports">
                                            <FeatherIcon icon="plus-circle" />
                                        </NavLink>
                                    </h6>
                                    <ul className="nav  mb-2">
                                        {/*
                                <li className="nav-item">
                                < className="nav-link" href="#">
                                    <FeatherIcon icon="file-text" />
                                    Current month
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FeatherIcon icon="file-text" />
                                    Last quarter
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FeatherIcon icon="file-text" />
                                    Social engagement
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FeatherIcon icon="file-text" />
                                    Year-end sale
                                </a>
                            </li>
                            */}
                                    </ul>
                                </div>
                            </nav>

                            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                                <Switch>
                                    <Route path="/error/:message"
                                           component={ RequestError } />
                                    <Route path="/" exact component={Dashboard} />
                                    <Route path="/devices" exact component={Devices} />
                                    <Route path="/reports" exact component={Reports}/>
                                    <Route path="/notifications" exact component={Notifications} />
                                    <Route path="/devices/:id" exact component={Device} />
                                    <Route path="/devices/:id/:logs" exact component={LogsView} />
                                    <Route path="/network/error" exact />
                                </Switch>
                            </main>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}