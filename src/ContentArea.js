import React, {Component} from 'react';
import {NavLink, Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import Dashboard from "./Dashboard";
import Devices from "./Devices";
import Reports from "./Reports";
import Notifications from "./Notifications";
import Device from "./Device";
//import {RestDataSource} from "./webservice/RestDataSource";

export default class ContentArea extends Component{

    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/" exact={true}>{this.props.companyName}</Link>
                        <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                               aria-label="Search" />
                        <ul className="navbar-nav px-3">
                            <li className="nav-item text-nowrap">
                                <Link className="nav-link" to="/singout">Sign out</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="container-fluid">
                        <div className="row">
                            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                                <div className="sidebar-sticky">
                                    {/*Remove flex-column class*/}
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/" exact={true} activeClassName="active">
                                                <FeatherIcon icon="home" />
                                                Dashboard <Route exact={true} path="/" render={ (routeProps) =>
                                                <span className="sr-only">(current)</span> } />
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/devices" activeClassName="active">
                                                <FeatherIcon icon="upload-cloud" />
                                                Devices
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/reports" activeClassName="active">
                                                <FeatherIcon icon="file" />
                                                Reports
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" exact={true} to="/notifications" activeClassName="active">
                                                <FeatherIcon icon="bell" />
                                                Notifications
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/periodic" exact={true} activeClassName="active">
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
                                    <Route path="/" exact={true} component={Dashboard} />
                                    <Route path="/devices" exact={true} component={Devices} />
                                    <Route path="/reports" exact={true} component={Reports}/>
                                    <Route path="/notifications" exact={true} component={Notifications} />
                                    <Route path="/devices/:id" extct={true} component={Device} />
                                </Switch>
                            </main>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}