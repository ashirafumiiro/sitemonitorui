import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";

export default class DevicesTable extends Component{
    render() {
        let count = 1;
        return (
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Site Number</th>
                        <th>Site Name</th>
                        <th>Device IMEI</th>
                        <th>Registration Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>

                    {(this.props.devices.length === 0)&&
                    <tr><td colSpan="6" className="text-center p-2">No Sites Registered</td></tr> }

                    {
                        this.props.devices && this.props.devices.map(dev=>
                            <tr key={dev.serial_number}>
                                <td>{count++}</td>
                                <td><Link to={`/devices/${dev.serial_number}`}>{dev.site_serial} </Link></td>
                                <td>{dev.site_name}</td>
                                <td>{dev.device_imei}</td>
                                <td>{new Date(dev.registration_date).toDateString()}</td>
                                <td>
                                        <span className={`badge badge-${dev.check_status==='online'? "success" : "danger"}`}>
                                            {dev.check_status}</span>
                                </td>
                            </tr>
                        )
                    }

                    </tbody>
                </table>
            </div>
        );
    }
}