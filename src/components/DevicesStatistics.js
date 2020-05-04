import React, {Component} from 'react';

export default class DeviceStatistics extends Component{
    render() {
        return (
            <div className="card-deck">
                <div className="card border-primary">
                        <div className="card-body">
                            <h4 className="card-title border-bottom">Sites Status</h4>
                            <p className="lead">Online Sites: <span className="text-primary">4</span></p>
                            <p className="lead">Offline Sites: <span className="text-warning">2</span></p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                </div>
                <div className="card border-success">
                        <div className="card-body">
                            <h4 className="card-title border-bottom">Sites power</h4>
                            <p className="lead">On Mains: <span className="text-primary">4</span></p>
                            <p className="lead">On Generator: <span className="text-warning">2</span></p>
                            <p className="lead">On Backup: <span className="text-danger">0</span></p>
                        </div>
                </div>
                <div className="card border-secondary">
                        <div className="card-body">
                            <h4 className="card-title border-bottom">Notifications</h4>
                            <p className="card-text">There are 30 sites with notifications and all of these can be
                                viewed on the Notifications page.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                </div>
            </div>
        );
    }

}
