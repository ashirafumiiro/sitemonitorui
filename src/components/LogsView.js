import React, {Component} from 'react';
import {RestDataSource} from "../webservice/RestDataSource";
import {PaginationButtons} from "./PaginationButtons";
import DatePickers from "./DatePickers";
//import Axios from "axios";
import DownloadFrame from "./DownloadFrame";
//const FileDownload = require('js-file-download');


export default class LogsView extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                logs: [],
                current: 1,
                num_pages: 0,
                has_next: false,
            },
            logsPerPage: 25,
            from_date: "",
            to_date: "",
            download_error: "",
            download_url: ''
        };
    }
    receiveData = (data)=>{
        if(data.current !== null){
            console.log("success", data);
            this.setState({data: data});
        }
        else
        {
            console.log("Error: ",data)// handle error data
        }
    }

    getLogs = (page, limit) =>{
        let dataSource = new RestDataSource(
            `http://172.105.86.177/monitor/monitor/api/device/${this.props.match.params.id}/${this.props.match.params.logs === 'generator'? 'gen': 'mains'}_logs/${page}/${limit}?timestamp=${new Date().getTime()}`,
            (err) => console.log(err));
        dataSource.GetData( (data)=>this.receiveData(data));
    }

    getTime = (timeStr) =>{
        if(timeStr === undefined)
            return 'n/a';
        let dateTime = new Date(timeStr);
        return dateTime.toLocaleDateString()+' ' +dateTime.toLocaleTimeString()
    }

    navigate = (page_num) => {
        //this.setState(prevState =>({...prevState, data:{...prevState.data, current: page_num}}));
        this.getLogs(page_num, this.state.logsPerPage);
    }

    render() {
        let logs = this.props.match.params.logs;
        let count = 1;
        return (
            <div>
                <div className="border-bottom">
                    <h2>{logs === 'generator'? "Generator": "Mains"} Logs</h2>
                </div>
                <form className="form-inline mt-4">
                    <div className="form-group">
                        <label className="ml-4" htmlFor="logs-select">Logs per page</label>
                        <select className="custom-select" id="logs-select" value={this.state.logsPerPage}
                                onChange={(ev)=>this.setState({logsPerPage: ev.target.value})}>
                            <option value="10" selected>10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </form>

                <div className="table-responsive my-3 border-bottom">
                    <table className="table table-striped table-sm">
                        <thead>
                        <th>#</th>
                        <th>Time</th>
                        <th>L1NV</th>
                        <th>L2NV</th>
                        <th>L3NV</th>
                        <th>L1L2</th>
                        <th>L1L3</th>
                        <th>L2L3</th>
                        <th>L1NA</th>
                        <th>L2NA</th>
                        <th>L3NA</th>
                        <th>Freq</th>
                        {
                            logs === 'mains' &&
                            <React.Fragment>
                                <th>BACKUP</th>
                                <th>BACKUPL</th>
                            </React.Fragment>
                        }
                        {
                         logs === 'generator' &&
                          <React.Fragment>
                              <th>BATV</th>
                              <th>ALTV</th>
                              <th>RPM</th>
                          </React.Fragment>
                        }
                        </thead>
                        <tbody>
                        {this.state.data.logs.map(lg=>
                            <tr key={lg.time}>
                                <td>{count++}</td>
                                <td>{this.getTime(lg.time)}</td>
                                <td>{lg.l1nv}</td>
                                <td>{lg.l2nv}</td>
                                <td>{lg.l3nv}</td>
                                <td>{lg.l1l2v}</td>
                                <td>{lg.l1l3v}</td>
                                <td>{lg.l2l3v}</td>
                                <td>{lg.l1na}</td>
                                <td>{lg.l2na}</td>
                                <td>{lg.l3na}</td>
                                <td>{lg.frequency}</td>
                                {
                                    logs === 'generator' &&
                                    <React.Fragment>
                                        <td>{lg.battery_voltage}</td>
                                        <td>{lg.alternator_voltage}</td>
                                        <td>{lg.rpm}</td>
                                    </React.Fragment>
                                }
                                {
                                    logs === 'mains' &&
                                    <React.Fragment>
                                        <td>{lg.backup}</td>
                                        <td>{lg.backup_load}</td>
                                    </React.Fragment>
                                }
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="row mb-5">
                    <PaginationButtons navigate={this.navigate} pageCount={this.state.data.num_pages}
                                       currentPage={this.state.data.current}/>
                </div>

                <div className="border-top my-3">
                    <h2>Data Export</h2>
                    <p className="">Select range of date to download.
                        <span className="text-warning">
                            It is recommended to download data over shorter intervals if you have a poor
                            internet connection
                        </span>
                    </p>
                        <div className="row">
                            <div className="col">From: <DatePickers
                                onChange={(e)=>this.setState({from_date :e.target.value})}/>
                            </div>
                            <div className="col">To: <DatePickers
                                onChange={e=>this.setState({to_date :e.target.value})} />
                            </div>
                            <div className="col">
                                <button className="btn btn-primary" onClick={this.handleDownload}>Generate Data</button>
                                {this.state.download_error &&
                                <div className="my-2 alert alert-warning" role="alert">
                                    {this.state.download_error}
                                </div>
                                }
                            </div>
                        </div>
                    <DownloadFrame iframeSrc={this.state.download_url} />
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getLogs(1, this.state.logsPerPage);
    }

    handleDownload = ()=>{
        if(this.state.from_date==='' || this.state.to_date===''){
            this.setState({download_error: "Select valid date range"})
        }
        else {
            this.setState({download_error: ""})
            let from = this.state.from_date;
            let to = this.state.to_date;
            console.log("From", from);
            console.log('To date:', to)
            let url = `http://172.105.86.177/monitor/monitor/api/logs/${this.props.match.params.id}/${this.props.match.params.logs}/${from}/${to}?timestamp=${new Date().getTime()}`
            // Axios.get(url)
            //     .then((response) => {
            //         FileDownload(response.data, from+'_'+to+'.csv');
            //     }).catch((err)=>{
            //         console.log(err)
            // });
            this.setState({download_url: url});

        }
    }
}