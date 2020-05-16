import React, {Component} from 'react';

export default class DeviceStatistics extends Component{
    render() {
        return (
            <div className="card-deck">
                <div className="card border-primary">
                        <div className="card-body">
                            <h4 className="card-title border-bottom">Sites Status</h4>
                            <table className="table table-borderless">
                                <tbody className="lead">
                                <tr><td>Online Sites:</td><td className="text-primary">
                                    {this.props.online === undefined? 'n/a': this.props.online}</td></tr>
                                <tr><td>Offline Sites: </td><td className="text-danger">
                                    {this.props.offline === undefined? 'n/a': this.props.offline}</td></tr>
                                </tbody>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </table>
                        </div>
                </div>
                <div className="card border-success">
                        <div className="card-body">
                            <h4 className="card-title border-bottom">Sites power</h4>
                            <table className="table table-borderless">
                                <tbody className="lead">
                                <tr>
                                    <td>On Mains</td><td className="text-primary">
                                        {this.props.on_mains === undefined? 'n/a': this.props.on_mains}
                                    </td>
                                </tr>
                                <tr>
                                    <td>On Generator</td>
                                    <td>
                                        {this.props.on_generator === undefined? 'n/a': this.props.on_generator}
                                    </td>
                                </tr>
                                <tr><td>On Backup</td>
                                    <td>
                                        {this.props.on_backup === undefined? 'n/a': this.props.on_backup}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            {
                                /*
                                    <p className="lead">On Mains: <span className="text-primary">4</span></p>
                                    <p className="lead">On Generator: <span className="text-warning">2</span></p>
                                    <p className="lead">On Backup: <span className="text-danger">0</span></p>
                                * */
                            }

                        </div>
                </div>
                <div className="card border-secondary">
                        <div className="card-body">
                            <h4 className="card-title border-bottom">Notifications</h4>
                            <p className="card-text">You currently have <span className="text-danger">
                                    { this.props.unread_notifications === undefined? 'n/a': this.props.unread_notifications }
                                     </span> unread notifications. For detailed information on these, please visit the
                                Notifications
                                page.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                </div>
            </div>
        );
    }

}
