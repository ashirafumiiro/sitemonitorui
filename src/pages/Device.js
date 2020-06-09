import React, {Component} from 'react';
import {RestDataSource} from "../webservice/RestDataSource";
import ParamView from "../components/ParamView";
import {Link} from "react-router-dom";
//import GenView from "./components/GenView";
//import {Link} from "react-router-dom";
//import FeatherIcon from "feather-icons-react";
//import loader from './assets/images/loader.gif';


export default class Device extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                device: {},
                mains_log: {},
                gen_log: {},
                status_log: {},
                alarms_log: {}

            },
        };
        this.dataSource = new RestDataSource(`http://172.105.86.177/monitor/monitor/api/device/${this.props.match.params.id}?timestamp=${new Date().getTime()}`,
            (err) => console.log(err));
    }
    receiveData = (data)=>{
        if(data.device.serial_number === parseInt(this.props.match.params.id)){
            console.log("success", data);
            this.setState({data: data});
        }
        else
        {
            console.log("Error: ",data)// handle error data
        }
    }

    dseMode = (mode)=>{
        if (mode === undefined) return 'n/a';
        switch (mode) {
            case 0:
                return "Stop mode";
            case 1:
                return "Auto mode";
            case 2:
                return "Manual mode";
            case 3:
                return "Test on load";
            case 4:
                return "Auto with manual restore";
            case 5:
                return "User configuration";
            case 6:
                return "Test off load";
            case 7:
                return "Test off load";
            default:
                return "Unimplemented"
        }
    }

    getTime = (timeStr) =>{
        if(timeStr === undefined)
            return 'n/a';
        let dateTime = new Date(timeStr);
        return dateTime.toLocaleDateString()+' ' +dateTime.toLocaleTimeString()
    }
    render() {
        let deviceStatus = this.state.data.device.status;
        let statusClass = "btn-outline-secondary"
        if (deviceStatus)
            statusClass = deviceStatus === 'online' ? 'btn-success' : 'btn-danger';

        return(
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1>{this.state.data.device.site_name || ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">

                         <div className="btn-group mr-2">
                            <button className="btn btn-sm btn-outline-secondary">Status</button>
                            <button className={`btn btn-sm ${statusClass}`}>
                                {this.state.data.device.status}
                            </button>
                        </div>


                        <button className="btn btn-sm btn-primary">
                            Notifications <span className="badge badge-light">4</span>
                        </button>
                    </div>
                </div>
                <div className="card-deck">
                        <div className="card">
                            <div className="card-header text-white bg-dark">
                                <h5>Status information </h5>
                            </div>
                            <div className="card-body">
                                <table className="card-table table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Info</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody id="status-info">
                                    <tr>
                                        <td>DSE Status</td>
                                        <td> { this.state.data.status_log.dse_status === undefined ? 'n/a' :
                                            this.state.data.status_log.dse_status === 1 ? "Connected" : "Not Connected"
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td>DSE Mode</td>
                                        <td>{this.dseMode(this.state.data.status_log.dse_mode) }</td>
                                    </tr>
                                    <tr>
                                        <td>Local Storage</td>
                                        <td>{this.state.data.status_log.local_storage === undefined ? 'n/a' :
                                            this.state.data.status_log.local_storage ==='False'? 'Not available': 'Available'
                                        }</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Last updated {this.getTime(this.state.data.status_log.time)}</small>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header text-white bg-success">
                                <h5>General Alarms</h5>
                            </div>
                            <div className="card-body">
                                <table className="card-table table">
                                    <tbody>
                                    <tr>
                                        <td>DSE Emergency Stop</td>
                                        <td>{this.getAlarm(this.state.data.alarms_log.dse_emergency_stop)}</td>
                                    </tr>
                                    <tr>
                                        <td>Charging Alternator</td>
                                        <td>{this.getAlarm(this.state.data.alarms_log.charging_alt_fail)}</td>
                                    </tr>
                                    <tr>
                                        <td>AC Mains Fail</td>
                                        <td>{this.getMainsAlarm(this.state.data.alarms_log.ac_mains_fail)}</td>
                                    </tr>
                                    <tr>
                                        <td>High Coolant Temp</td>
                                        <td>{this.getAlarm(this.state.data.alarms_log.high_coolant_temp)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Last updated {this.getTime(this.state.data.alarms_log.time)}</small>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header text-white bg-secondary">
                                <h5>Generator Alarms</h5>
                            </div>
                            <div className="card-body">
                                <table className="card-table table">
                                    <tbody>
                                    <tr>
                                        <td>Dg Fail To Start</td>
                                        <td>{this.getAlarm(this.state.data.alarms_log.dg_fail_to_start)}</td>
                                    </tr>
                                    <tr>
                                        <td>Dg Low Battery</td>
                                        <td>{this.getAlarm(this.state.data.alarms_log.dg_battery_low)}</td>
                                    </tr>
                                    <tr>
                                        <td>Dg Low Fuel</td>
                                        <td>{this.getAlarm(this.state.data.alarms_log.dg_low_fuel)}</td>
                                    </tr>
                                    <tr>
                                        <td>Dg Low Voltage</td>
                                        <td>{this.getAlarm(this.state.data.alarms_log.generator_low_voltage)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Last updated {this.getTime(this.state.data.alarms_log.time)}</small>
                            </div>
                    </div>
                </div>
                {/* Alarms params*/}
                <div className="mt-4">
                    <ParamView {...this.state.data.mains_log} type={"mains"} timeConverter={this.getTime}
                               deviceID={this.props.match.params.id}/>
                    <ParamView {...this.state.data.gen_log} type={"gen"} timeConverter={this.getTime}
                               deviceID={this.props.match.params.id}/>

                    <div className="card mb-5">
                        <div className="card-header text-white bg-primary">
                            <h5>Backup Information</h5>
                        </div>
                        <div className="card-body">
                            <table className="card-table table">
                                <tbody>
                                <tr>
                                    <td>Backup Voltage</td>
                                    <td>{this.state.data.mains_log.backup}</td>
                                </tr>
                                <tr>
                                    <td>Backup Load</td>
                                    <td>{this.state.data.mains_log.backup_load}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">
                                Last updated {this.getTime(this.state.data.mains_log.time)}
                            </small>
                            <Link className="btn btn-sm btn-primary float-right"
                                  to={`${this.props.match.params.id}/mains`} >
                                View Logs
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    componentDidMount() {
        this.dataSource.GetData( (data)=>this.receiveData(data));
        this.timerID = setInterval(
            () => this.dataSource.GetData( (data)=>this.receiveData(data)),
            5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getAlarm = (code) => {
        if(code === undefined) return 'n/a'
        let alarmClass = code === 1? 'btn btn-success btn-circle btn-sm' : 'btn btn-danger btn-circle btn-sm';
        return <button type="button" className={alarmClass} />
    }
    getMainsAlarm = (code) =>{
        if (code === undefined) return "n/a";
        return this.getAlarm(1);
    }
}

/*
*
* status_log
* */