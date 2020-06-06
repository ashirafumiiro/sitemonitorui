import React, {Component} from 'react';
import FeatherIcon from "feather-icons-react";
import {RestDataSource} from "../webservice/RestDataSource";
import {Link} from "react-router-dom";
import { Pagination } from '@material-ui/lab';

export default class NotificationsCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {
                notifications: [],
                pages_cont: 0,
                current_page: 1,
                unread: 0,
            },
            count_per_page: this.props.count
        }

    }

    dataReceived = (data) =>{
        console.log(data);
        this.setState({data: data});
    }

    getNotifications = (page)=>{
        let dataSource = new RestDataSource(
            `http://172.105.86.177/monitor/monitor/api/notifications/${1}/${page}/${this.state.count_per_page}?timestamp=${new Date().getTime()}`,
            (err)=>console.log("Error: ", err));
        dataSource.GetData(data=>this.dataReceived(data));
    }

    handlePageChange = (eve, page) => {
        this.getNotifications(page);
    };

    render() {
        return (
            <div>
                <div className="card" >
                    <div className="card-header lead">
                        Notifications
                        <span className="float-right">
                        <Link className="btn border-0" to="/notifications">
                            <FeatherIcon icon="bell" />
                            <span className="badge badge-danger">{this.state.data.unread}</span>
                        </Link>

                    </span>

                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            this.state.data.notifications.length === 0 &&
                            <li className="list-group-item">No Notifications</li>
                        }
                        {
                            this.state.data.notifications.map(notification=>{
                                let datetime = new Date(notification.time);
                                return <li key={notification.time} className="list-group-item text-sm-left">
                                    <span className="text-primary">{notification.site_name}</span>: {notification.message} <br />
                                    <span className="text-muted">Time: {datetime.toDateString()} at {datetime.toLocaleTimeString()}</span>
                                </li>
                            })
                        }

                    </ul>
                </div>
                {
                    this.props.paginate === true &&
                    <div>
                        <div className="my-3 float-left">
                            <select className="custom-select custom-select-sm"
                                    onChange={event => this.setState({count_per_page: event.target.value})}
                                    value={this.state.count_per_page}>
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div className="my-3 float-right">
                            <Pagination
                                count={this.state.data.pages_cont}
                                page={this.state.data.current_page}
                                onChange={this.handlePageChange}
                                color="primary"
                                variant="outlined"
                                shape="rounded"
                            />
                        </div>

                    </div>
                }
            </div>
        );
    }

    componentDidMount() {
        this.getNotifications(1);
    }
}