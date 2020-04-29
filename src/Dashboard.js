import React, {Component} from 'react';
import FeatherIcon from 'feather-icons-react';
import {RestDataSource} from "./webservice/RestDataSource";

export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                devices: [],
                devices_count: "",
                online_devices: ""
            }
        }
        this.dataSource = new RestDataSource("http://172.105.86.177/monitor/monitor/dashboard?customer_id=1",
            (err) => console.log(err));
    }
    receiveData = (data)=>{
        if(data.error === 'success'){
            this.setState({data: data.data});
            console.log("success", data.data);
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
                            <h5>Are being Monitored</h5>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">
                        <h5>Logging devices</h5>
                        <div className="alert alert-info text-center">
                            <i className="fa fa-cloud-upload-alt fa-5x"></i>
                            <h4> {this.state.data.online_devices}</h4>
                            <h5>Devices logging </h5>
                        </div>
                    </div>
                </div>

                <div className="row shadow">
                    <div className="col-md-6">
                        <h5>Alarm Statuses</h5>
                        <button className="btn btn-success">Okay</button>
                        <button className="btn btn-info">Optimal</button>
                        <button className="btn btn-primary">Mild</button>
                        <button className="btn btn-danger">Critical</button>
                    </div>
                </div>


                <h2>Registered Sites</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Site Number</th>
                            <th>Site Name</th>
                            <th>Device IMEI</th>
                            <th>Registration Date</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>

                        {(this.state.data.devices === 0)&&
                            <tr><td colSpan="6" className="text-center p-2">No Sites Registered</td></tr> }

                        {
                            this.state.data.devices && this.state.data.devices.map(dev=>
                                <tr>
                                    <td>dev.id</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        }



                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.dataSource.GetData(data=>this.receiveData(data))
    }




}