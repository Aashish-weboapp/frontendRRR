import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal , PushNotify } from '../../components'

function FileUpload(props) {

    const [notifyMsg,setNotifyMsg] = useState(false)

    let uploadResponse = () =>{
       setNotifyMsg(!notifyMsg)
    }

    let uploadCnt = <React.Fragment>
                        <label for="images" class="drop-container">
                            <span class="drop-title">Drop files here</span>
                                or
                            <input type="file" id="images"  accept=".xlsx,.xls,.csv"  required/>
                       </label>
                       <div  style={{position:'absolute',bottom:'20px',right:'20px'}}>
                            <Button variant="primary" size="lg" onClick={uploadResponse}>
                                Upload File
                            </Button>
                        </div>
                    </React.Fragment>


    return (
        <>
            <Modal show={props.modalShow} title={props.title} onHide={props.toggleMode} modalbody={uploadCnt} modalheader={<div></div>}/>
            <PushNotify show={false} />
        </>
    );
}

export default FileUpload;