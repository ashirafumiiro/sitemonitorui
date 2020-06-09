import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {RestDataSource} from "../webservice/RestDataSource";
import DevicesTable from "../components/DevicesTable";

export default class Devices extends Component{
    constructor(props){
        super(props);
        this.state = {
            devices: [],
        };
        this.dataSource = new RestDataSource(`http://172.105.86.177/monitor/monitor/api/${1}/devices?timestamp=${new Date().getTime()}`,
            (err) => console.log(err));
    }
    receiveData = (data)=>{
        if(data){
            console.log("success", data);
            this.setState({devices: data});
        }
        else
        {
            console.log(data)// handle error data
        }
    };
    render() {
        return (
            <div>
                <div className="border-bottom">
                    <h2>Sites</h2>
                </div>
                <nav aria-label="Page navigation example" className="my-3">
                    <ul className="pagination">
                        <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                    </ul>
                </nav>

                <DevicesTable devices={this.state.devices} />
            </div>
        );
    }

    componentDidMount() {
        this.dataSource.GetData( (data)=>this.receiveData(data));
    }
}