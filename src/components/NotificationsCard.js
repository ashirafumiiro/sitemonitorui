import React, {Component} from 'react';
import FeatherIcon from "feather-icons-react";

export default class NotificationsCard extends Component{
    render() {
        return (
            <div className="card" >
                <div className="card-header">
                    Notifications <span className="float-right"><FeatherIcon icon="bell" /></span>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Notification 1</li>
                    <li className="list-group-item">Notification 2</li>
                    <li className="list-group-item">Notification 3</li>
                </ul>
            </div>
        );
    }
}