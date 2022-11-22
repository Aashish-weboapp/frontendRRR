import React, { useState , useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { CustomModal , PushNotify } from '../../components'
import { connect, useSelector } from 'react-redux';

import {  getFormData,
          getFields } from '../../actions/system'
import * as XLSX from 'xlsx';


function FileUpload(props) {

    const [file,setFile] = useState('')
    const [columns,setColumns] = useState([])
    const [mapObject,setMapObject] = useState({})

    useEffect(()=>{
        if((props.listForm).length > 0)
        {
            props.getFormData(props.listForm[0].form.id).then(() => {})
        }
    },[props.listForm])

    let saveFile = (event) =>{
        var f = event.target.files[0];
                //f = file
        var name = f.name;
        const reader = new FileReader();
        reader.onload = (evt) => { // evt = on_file_select event
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, {type:'binary',sheetRows:1});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, {header:1});
            /* Update state */
            setColumns(data.split(','))
            console.log("Data>>>"+typeof(data.split(',')));
        };
        reader.readAsBinaryString(f);
        setFile(f)
        setDatamap()
    }

    let setDatamap = () =>{
        let mapObject = {}
        columns.map((column,indx)=>{           
                props.form_info!=undefined?
                props.form_info.form_data!=undefined?
                props.form_info.form_data.map((header,idx)=>{
                    if(column.toLowerCase() == (header.label).toLowerCase() || column.toLowerCase() == (header.field).toLowerCase())
                    {
                        mapObject[header.field] = indx-1
                    }
                    
               }):<></>:<></> 
        })
        setMapObject(mapObject)
    }

    let uploadFile = () =>{
        props.fileHandler(file,mapObject)
    }

    let toggleMode = () =>{
        setColumns([])
        props.toggleMode();
    }

    let uploadCnt = <React.Fragment>
                        <label for="images" class="drop-container">
                            <span class="drop-title">Drop files here</span>
                                or
                            <input type="file" id="images"  accept=".xlsx,.xls,.csv"  required onChange={(event)=>{saveFile(event)}}/>
                       </label>
                       {/* <div  style={{position:'absolute',bottom:'20px',right:'20px'}}>
                            {file !== '' && file !== null && file !== undefined?
                                <Button variant="primary" size="lg" onClick={uploadFile}>
                                    Upload File
                                </Button>:
                                <Button variant="primary" size="lg" onClick={uploadFile} disabled>
                                    Upload File
                                </Button>}
                        </div> */}
                    </React.Fragment>

                

    let columnCont = <React.Fragment>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <br></br>
                            <h6><b>Imported File</b></h6>
                            <input type='checkbox' checked/>&nbsp;&nbsp;Use First Row as Header
                        </div>
                        <div className='col-sm-10'>
                       <table style={{border:'2pt solid #e9ecef'}}>
                        <thead>
                            <tr>
                                <th>File Column</th>
                                <th>CT Field</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody style={{overflow:'scroll'}}>
                            {columns.map((column,indx)=>{
                               
                                return <tr style={{borderBottom:'2pt solid #e9ecef',height:'86px'}}>
                                    <td><b>{column}</b></td>
                                    <td><select className='importField' style={{borderRadius:'5px'}}><option selected disabled  >To import , select a field</option>
                                    {(props.listForm).length>0 && props.form_info!=undefined?
                                    props.form_info.form_data!=undefined?
                                    props.form_info.form_data.map((header,idx)=>{
                                        if(column.toLowerCase() == (header.label).toLowerCase() || column.toLowerCase() == (header.field).toLowerCase())
                                        {
                                            mapObject[header.field] = indx+1
                                        }
                                        let impOption = column.toLowerCase() == (header.label).toLowerCase() || column.toLowerCase() == (header.field).toLowerCase()?
                                                        <option selected>{header.label}</option>:
                                                        <option>{header.label}</option>
                                        return <>{impOption}</>
                                    }):<></>:<></>}
                                    </select></td>
                                    <td></td>
                                </tr>
                            })}
                        </tbody>
                       </table>
                       <Button variant="primary" size="lg" onClick={()=>{uploadFile()}} style={{float:'right',marginTop:'10px',marginBottom:'10px',marginRight:'10px'}}>
                                    Next
                        </Button>
                        <Button variant="primary" size="lg" onClick={()=>{setFile('')}} style={{float:'right',marginTop:'10px',marginBottom:'10px',marginRight:'10px'}}>
                                    Previous
                        </Button>
                       </div>
                       </div>


                    </React.Fragment>


    return (
        <>
            {file == ''?
                <CustomModal display={true} title={props.title} onHide={props.toggleMode} modalbody={uploadCnt} modalheader={<div><h4>{props.title}</h4></div>} closeBtn={true}/>:
                <CustomModal display={true} title={'in this'} onHide={props.toggleMode} modalbody={columnCont} modalheader={<div><h3>Import a File</h3></div>} closeBtn={true}/>}

           
        </>
    );
}

const mapStateToProps = state => {
    return {
        form_info: state.sysData.form_info,
        field_items:state.sysData.field_items,
        listForm:state.sysData.listForm
    };
  };
  
const mapDispatchToProps = {
    getFormData,getFields
   
}
  
export default connect(mapStateToProps,mapDispatchToProps)(FileUpload);