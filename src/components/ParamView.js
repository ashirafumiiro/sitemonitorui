import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class ParamView extends Component {
    render() {
        return (
            <div className="mb-5">
                <div className="card">
                    <div className={`card-header text-white ${this.props.type==="mains" ? "bg-success":"bg-warning"}`}>
                        <h5>{this.props.type==="mains" ? "Mains":"Generator"} Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="card-deck">
                            <div className="card border-primary">
                                <div className="card-body">
                                    <h5 className="card-title">Voltage (V)</h5>
                                    <table className="table">
                                        <tr>
                                            <td>L1-N</td> <td>{this.getValue(this.props.l1nv)}</td>
                                        </tr>
                                        <tr>
                                            <td>L2-N</td> <td>{this.getValue(this.props.l2nv)}</td>
                                        </tr>
                                        <tr>
                                            <td>L3-N</td> <td>{this.getValue(this.props.l3nv )}</td>
                                        </tr>
                                        <tr>
                                            <td>L1-L2</td> <td>{this.getValue(this.props.l1l2v)}</td>
                                        </tr>
                                        <tr>
                                            <td>L1-L3</td> <td>{this.getValue(this.props.l1l3v)}</td>
                                        </tr>
                                        <tr>
                                            <td>L2-L3</td> <td>{this.getValue(this.props.l2l3v)}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="card border-secondary">
                                <div className="card-body">
                                    <h5 className="card-title">Current (A)</h5>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>L1-N</td><td>{this.getValue(this.props.l1na)}</td>
                                            </tr>
                                            <tr>
                                                <td>L2-N</td><td>{this.getValue(this.props.l2na)}</td>
                                            </tr>
                                            <tr>
                                                <td>L2-N</td><td>{this.getValue(this.props.l3na)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card border-success">
                                <div className="card-body">
                                    <h5 className="card-title">Others</h5>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td>Frequency</td><td>{this.getValue(this.props.frequency)}</td>
                                        </tr>

                                        {
                                            this.props.type === 'gen' &&
                                                <React.Fragment>
                                                    <tr>
                                                        <td>RPM</td><td>{this.getValue(this.props.rpm)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Fuel Level</td><td>{this.getValue(this.props.fuel_level)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Battery Voltage</td><td>{this.getValue(this.props.battery_voltage)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Alternator Voltage</td><td>{this.getValue(this.props.alternator_voltage)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Run Hours</td><td>{this.getValue(this.props.run_hours)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Temperature</td><td>{this.getValue(this.props.temperature)}</td>
                                                    </tr>
                                                </React.Fragment>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        Last updated: {this.props.timeConverter(this.props.time)}
                        <Link className="btn btn-sm btn-primary float-right"
                              to={`${this.props.deviceID}/${this.props.type==='mains'? 'mains':'generator'}`} >
                            View Logs
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    getValue = (val)=>{
        if (val === undefined) return 'n/a';
        else
            return val;
    }
}