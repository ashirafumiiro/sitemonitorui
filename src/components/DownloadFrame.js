import * as React from 'react';

let DownloadFrame = (props)=>{
    return (
        <div style={{display: 'none'}}>
            <iframe title="Download frame" src={props.iframeSrc} />
        </div>
    );
}

export default DownloadFrame;
