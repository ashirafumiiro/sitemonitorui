import React, {Component} from 'react';
//import {LineChart, XAxis, YAxis, CartesianGrid, Line, } from "recharts";
import DatePickers from "./components/DatePickers";
import DevicesStatistics from "./components/DevicesStatistics";
import DevicesTable from "./DevicesTable";
import {RestDataSource} from "./webservice/RestDataSource";
import FeatherIcon from "feather-icons-react";
import ExcelExport from "./components/ExcelExport";


export default class Reports extends Component{
    constructor(props) {
        super(props);
        this.state = {
            reports_data: {},
            category: 'online',
            devices: [],
            pages_count: 0,
            current_page: 1,
            showDownload: false,
            report_statistics: {},
            report_devices: [],
            loading_report: false
        }
        this.dataSource = new RestDataSource(`http://172.105.86.177/monitor/monitor/api/reports/${1}?timestamp=${new Date().getTime()}`,
            (err)=>console.log("Error: ", err));
    }

    dataReceived = (data) =>{
        console.log(data);
        this.setState({reports_data: data})
    }
    getDevices = (e)=>{
        e.preventDefault();
        let page = 1;
        let count = 20;
        let deviceDataSource = new RestDataSource(
            `http://172.105.86.177/monitor/monitor/api/devices/${1}/${this.state.category}/${page}/${count}?timestamp=${new Date().getTime()}`,
            (err) => console.log(err));
        deviceDataSource.GetData( (data)=>{
            this.setState({
                devices: data.devices,
                pages_count: data.pages_cont,
                current_page: data.current_page
            });
            //console.log(data)
        });
    }

    getReport = ()=>{
        this.setState({loading_report: true});
        let deviceDataSource = new RestDataSource(
            `http://172.105.86.177/monitor/monitor/api/reports/${1}/1?timestamp=${new Date().getTime()}`,
            (err) => {
                this.setState({loading_report: false})
                console.log(err);
            });
        deviceDataSource.GetData( (data)=> {
            //this.setState({});
            if(data.statistics){
                this.setState({
                    loading_report: false,
                    showDownload: true,
                    report_statistics: data.statistics,
                    report_devices: data.devices
                });
            }
            else {
                this.setState({loading_report: false});
                // Failed to load data
            }
            //console.log(data);

        });
    }

    searchDevices = (e)=>{
        let url = `http://172.105.86.177/monitor/monitor/api/devices/${1}/${e.target.value}?timestamp=${new Date().getTime()}`
        if (e.target.value === ""){
            url = `http://172.105.86.177/monitor/monitor/api/devices/${1}/${this.state.category}/${1}/${25}?timestamp=${new Date().getTime()}`
        }
        let deviceDataSource = new RestDataSource(
            url,
            (err) => {
                console.log(err)
            });
        deviceDataSource.GetData( (data)=>{
            this.setState({
                devices: data.devices,
                pages_count: data.pages_cont,
                current_page: data.current_page
            });
            console.log(data)
        });
    }

    render(){
        //console.log(sessionStorage.getItem('user'));
    //let data = [{"name":"A","uv":400,"pv":240,"amt":2400},{"name":"B","uv":300,"pv":456,"amt":2400},{"name":"C","uv":300,"pv":139,"amt":2400},{"name":"D","uv":200,"pv":980,"amt":2400},{"name":"E","uv":278,"pv":390,"amt":2400},{"name":"F","uv":189,"pv":480,"amt":2400}]
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Reports</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button className="btn btn-sm btn-outline-secondary"></button>
                            <button className="btn btn-sm btn-outline-secondary"
                                onClick={this.getReport}>Export & Share</button>
                            {this.state.loading_report &&
                                <button className="btn btn-sm btn-primary ml-2">
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                    </span>
                                    Loading...
                                </button>}
                            <ExcelExport showDownload={this.state.showDownload}
                                         completed={()=>this.setState({showDownload: false})}
                                         devices={this.state.report_devices}
                                         statistics={this.state.report_statistics}
                            />
                        </div>
                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                            <FeatherIcon icon="calendar" />
                            This week
                        </button>
                    </div>
                </div>
                <p className="lead">In this section, you will be able to view general information about your company's entire sites and
                also be able to select a give site for a Detailed report.</p>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <DevicesStatistics {...this.state.reports_data}/>
                    </div>
                    <div className="row my-2">
                        <p className="text-muted">To add charting</p>
                    </div>
                    <h3 className="border-bottom my-3">Apply filters</h3>
                    <p className="lead" >Select category of devices to display and the corresponding date on which the
                    filter is applied</p>
                    <div className="row">
                        <div className="col-5">
                            Device Category
                            <select value={this.state.category} className="custom-select custom-select-sm mb-3"
                                onChange={(ev)=>{this.setState({category: ev.target.value}); }}>
                                <option value="online" selected>Online Sites</option>
                                <option value="offline">Offline Sites</option>
                                <option value="on_backup">Sites on Batteries</option>
                                <option value="on_mains">Sites on Mains</option>
                                <option value="on_generator">Sites on Generator</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <DatePickers />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary" onClick={this.getDevices}>
                                Apply filters
                            </button>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-6 "><h4>Search Results</h4> </div>
                        <div className="col-6">
                            <div className="form-group row">
                                <label htmlFor="searchInput" className="col-sm-2 col-form-label">Find site</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="searchInput"
                                           onChange={this.searchDevices}
                                           placeholder="Search Site" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <DevicesTable devices={this.state.devices}/>
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

    componentDidMount() {
        this.dataSource.GetData(data=>this.dataReceived(data));
    }
}