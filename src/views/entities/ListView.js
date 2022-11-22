import React, { useState } from 'react';
import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader, Modal, PushNotify } from '../../components'
import FileUpload from '../model_views/FileUpload';
import { connect, useSelector } from 'react-redux';

function ListView(props) {

    const [importMode,setImportMode] = useState(false)

    let toggleImport = () =>{
        setImportMode(!importMode)
    }

    let importData = (file,mapObject) =>{
        props.importData(props.data_source,file,mapObject)
        toggleImport()
    }

    let listHeaders = props.headers != undefined ? props.headers.filter(header=>header.visibility == 'required') : []

    let searchSelector = props.headers != undefined ? (props.headers).length > 0 ? props.headers[0].field : '' : ''

    return (
        <Wrapper>
            <ListHeader icon='fas fa-bars fa-border icon' iconHandler={props.menuToggle} openImport={toggleImport} searchControl={props.searchControl} 
                        changeMode={props.changeMode} listTitle={props.title} searchSelector={searchSelector} headers={listHeaders} />
            <Card top={20} style={{height:'900px'}}>
                <></>
                <Table headers={listHeaders} rows={props.rows} headerType='Json' default={true} defaultLabel={'check'} visible={true}
                       status={true} changeMode={props.changeMode} loadFormData={props.loadFormData}/>
            </Card>
            {importMode === true?
                <FileUpload title={'Import ' + props.title}
                            fileHandler = {importData}
                            toggleMode={toggleImport}/>:
                <></>}
            
        </Wrapper>
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
   
}
  
export default connect(mapStateToProps,mapDispatchToProps)(ListView);