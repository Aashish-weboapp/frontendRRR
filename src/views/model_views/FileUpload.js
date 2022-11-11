import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { CustomModal , PushNotify } from '../../components'

function FileUpload(props) {

    const [file,setFile] = useState('')

    let saveFile = (event) =>{
        var file = event.target.files[0];
        setFile(file)
    }

    let uploadFile = () =>{
        props.fileHandler(file)
    }

    let uploadCnt = <React.Fragment>
                        <label for="images" class="drop-container">
                            <span class="drop-title">Drop files here</span>
                                or
                            <input type="file" id="images"  accept=".xlsx,.xls,.csv"  required onChange={(event)=>{saveFile(event)}}/>
                       </label>
                       <div  style={{position:'absolute',bottom:'20px',right:'20px'}}>
                            {file !== '' && file !== null && file !== undefined?
                                <Button variant="primary" size="lg" onClick={uploadFile}>
                                    Upload File
                                </Button>:
                                <Button variant="primary" size="lg" onClick={uploadFile} disabled>
                                    Upload File
                                </Button>}
                        </div>
                    </React.Fragment>


    return (
        <>
            <CustomModal display={true} title={props.title} onHide={props.toggleMode} modalbody={uploadCnt} modalheader={<div></div>} closeBtn={true}/>
           
        </>
    );
}

export default FileUpload;