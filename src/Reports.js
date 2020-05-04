import React, {Component} from 'react';
//import {LineChart, XAxis, YAxis, CartesianGrid, Line, } from "recharts";
import DatePickers from "./components/DatePickers";
import DevicesStatistics from "./components/DevicesStatistics";
import DevicesTable from "./DevicesTable";


export default class Reports extends Component{
    render(){
    //let data = [{"name":"A","uv":400,"pv":240,"amt":2400},{"name":"B","uv":300,"pv":456,"amt":2400},{"name":"C","uv":300,"pv":139,"amt":2400},{"name":"D","uv":200,"pv":980,"amt":2400},{"name":"E","uv":278,"pv":390,"amt":2400},{"name":"F","uv":189,"pv":480,"amt":2400}]
        return (
            <div>
                <div className="border-bottom mb-3">
                    <h2>Reports</h2>
                </div>
                <p className="lead">In this section, you will be able to view general information about your company's entire sites and
                also be able to select a give site for a Detailed report.</p>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <DevicesStatistics />
                    </div>
                    <h3 className="border-bottom my-3">Apply filters</h3>
                    <p className="lead" >Select category of devices to display and the corresponding date on which the
                    filter is applied</p>
                    <div className="row">
                        <div className="col-5">
                            Device Category
                            <select className="custom-select custom-select-lg mb-3">
                                <option selected>Online Sites</option>
                                <option value="1">Offline Sites</option>
                                <option value="2">Sites on Batteries</option>
                                <option value="3">Sites on Mains</option>
                                <option value="3">Sites on Generator</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <DatePickers />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <DevicesTable devices={[]}/>
                    </div>
                    {/*
                    <div className="float-left">
                        <LineChart width={500} height={300} data={data}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                    */}

                </div>
            </div>
        );
    }
}