import React, { useState } from 'react';
import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader, Modal, PushNotify } from '../../components'
import FileUpload from '../model_views/FileUpload';

function ListView(props) {

    const [importMode,setImportMode] = useState(false)

    let toggleImport = () =>{
        setImportMode(!importMode)
    }

    let importData = (file) =>{
        props.importData(props.data_source,file)
        toggleImport()
    }

    let listHeaders = props.headers != undefined ? props.headers.filter(header=>header.required == true) : []

    let searchSelector = props.headers != undefined ? (props.headers).length > 0 ? props.headers[0].field : '' : ''

    return (
        <Wrapper>
            <ListHeader icon='fas fa-bars fa-border icon' iconHandler={props.menuToggle} openImport={toggleImport} searchControl={props.searchControl} 
                        changeMode={props.changeMode} listTitle={props.title} searchSelector={searchSelector} />
            <Card top={20} style={{height:'900px'}}>
                <></>
                <Table headers={listHeaders} rows={props.rows} headerType='Json' default={true} defaultLabel={'check'} visible={true}
                       status={true} changeMode={props.changeMode} loadFormData={props.loadFormData}/>
            </Card>
            {importMode === true?
                <FileUpload title={'Import ' + props.title}
                            fileHandler = {importData}
                            toggleMode={toggleImport} />:
                <></>}
            
        </Wrapper>
    );
}

export default ListView;