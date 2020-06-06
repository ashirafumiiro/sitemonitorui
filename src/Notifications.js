import React, {Component} from 'react';
import NotificationsCard from "./components/NotificationsCard";


export default class Notifications extends Component{

    render() {
        return (
            <div>
                <h2 className="border-bottom">Notifications</h2>
                <p className="lead my-3">View notifications and change your preferences.</p>
                <div className="row">
                    <div className="col-6">
                        <h4>Settings</h4>
                        <form>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail"
                                           value="email@example.com" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPhone" className="col-sm-2 col-form-label">SMS Contact</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="inputPhone"
                                           placeholder="Phone Number" />
                                </div>
                            </div>
                            <p>Choose notifications to receive while not logged in</p>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="smsReceive" />
                                    <label className="form-check-label" htmlFor="smsReceive">
                                        Receive SMS
                                    </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="emailReceive" />
                                <label className="form-check-label" htmlFor="emailReceive">
                                    Receive Email
                                </label>
                            </div>
                            <button className="btn btn-primary float-right"
                                    onClick={(ev)=>ev.preventDefault()}>
                                Save Changes
                            </button>
                        </form>
                    </div>

                    <div className="col-6">
                        <NotificationsCard count={10} paginate={true}/>
                    </div>

                </div>
            </div>
        )
    }
}