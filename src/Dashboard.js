import React, {Component} from 'react';
import FeatherIcon from 'feather-icons-react';
import {RestDataSource} from "./webservice/RestDataSource";
//import Link from "react-router-dom/es/Link";
import DevicesTable from "./DevicesTable";
import NotificationsCard from "./components/NotificationsCard";

export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            devices: [],
            data: {
                devices_count: "",
                online_devices: ""
            }
        }
        this.dataSource = new RestDataSource(`http://172.105.86.177/monitor/monitor/api/dashboard/${1}?timestamp=${new Date().getTime()}`,
            (err) => console.log(err));
    }
    receiveData = (data)=>{
        if(data.error === 'success'){
            console.log("success", data);
            this.setState({data: data.data, devices: data.devices});

        }
        else
        {
            console.log(data.error)// handle error data
        }
    }
    render() {
        return (
            <div>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button className="btn btn-sm btn-outline-secondary">Share</button>
                            <button className="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                            <FeatherIcon icon="calendar" />
                            This week
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 col-sm-3 col-xs-6">
                        <h5>Registered Sites</h5>
                        <div className="alert alert-info text-center">
                            <i className="fa fa-desktop fa-5x"></i>
                            <h4> {this.state.data.devices_count}</h4>
                            <h5>Sites Registered</h5>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">
                        <h5>Active Sites</h5>
                        <div className="alert alert-info text-center">
                            <i className="fa fa-cloud-upload-alt fa-5x"></i>
                            <h4> {this.state.data.online_devices}</h4>
                            <h5>Sites Active </h5>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <NotificationsCard />
                    </div>
                </div>

                <div className="row my-3">
                    <div className="col-md-6">
                        <h5>Alarm Statuses</h5>
                        <button className="btn btn-success m-3">Okay</button>
                        <button className="btn btn-info m-3">Optimal</button>
                        <button className="btn btn-primary m-3">Mild</button>
                        <button className="btn btn-danger m-3">Critical</button>
                    </div>
                </div>
                <h2>Recent Registered Sites</h2>
                <DevicesTable devices={this.state.devices} />
            </div>
        );
    }

    componentDidMount() {
        this.dataSource.GetData(data=>this.receiveData(data))
    }




}