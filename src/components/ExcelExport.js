import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class ExcelExport extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showDownload: false
        }
    }

    render() {
        console.log("Devices:", this.props.statistics)
        let sitePower = (site)=>{
            if(site.on_mains === true) return "Mains";
            if(site.on_backup === true) return "Backup";
            if(site.on_generator === true) return "Generator";
            return "n/a";
        }
        let downloadButton = this.props.showDownload ? <button
            onClick={this.props.completed} className="btn btn-sm btn-outline-primary ml-2">Download File</button> : null;
        return (
            <>
                <ExcelFile element={downloadButton}>
                    <ExcelSheet data={this.props.statistics} name="Statistics">
                        <ExcelColumn label="Category" value="name"/>
                        <ExcelColumn label="value" value="value"/>
                    </ExcelSheet>
                    <ExcelSheet data={this.props.devices} name="Devices">
                        <ExcelColumn label="Serial Number" value="serial_number"/>
                        <ExcelColumn label="Site Name" value="site_name"/>
                        <ExcelColumn label="Site ID" value="site_serial"/>
                        <ExcelColumn label="Site IMEI" value="device_imei"/>
                        <ExcelColumn label="Registration Date" value="registration_date"/>
                        <ExcelColumn label="Connection Status" value="check_status"/>
                        <ExcelColumn label="Site Power"
                                     value={(col) => sitePower(col)}/>
                    </ExcelSheet>
                </ExcelFile>
            </>

        );
    }
}

export default ExcelExport;