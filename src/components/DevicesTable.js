import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";

export default class DevicesTable extends Component{
    render() {
        //let count = 1;
        return (
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Site ID</th>
                        <th>Site Name</th>
                        <th>Registration Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>

                    {(this.props.devices.length === 0)&&
                    <tr><td colSpan="6" className="text-center p-2">No Sites Found</td></tr> }
                    {
                        this.props.devices && this.props.devices.map(dev=>
                            <tr key={dev.serial_number}>
                                <td><Link to={`/devices/${dev.serial_number}`}>{dev.serial_number}</Link></td>
                                <td>{dev.site_serial}</td>
                                <td>{dev.site_name}</td>
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