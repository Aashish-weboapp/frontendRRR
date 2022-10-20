import React, { useState } from 'react';
import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader, Modal, PushNotify } from '../../components'
import FileUpload from '../model_views/FileUpload';

function ListView(props) {

    const [importMode,setImportMode] = useState(false)

    let toggleImport = () =>{
        setImportMode(!importMode)
    }

    return (
        <Wrapper>
            <ListHeader icon='fas fa-bars fa-border icon' iconHandler={props.menuToggle} openImport={toggleImport} searchControl={props.searchByName} changeMode={props.changeMode} listTitle={props.title} />
            <Card top={20}>
                <></>
                <Table headers={props.headers} rows={props.rows} headerType='Json' default={true} defaultLabel={'check'} visible={true}
                       status={true} changeMode={props.changeMode} loadFormData={props.loadFormData}/>
            </Card>
            <FileUpload modalShow={importMode} 
                       title={'Import ' + props.title}
                       toggleMode={toggleImport}/>
            
        </Wrapper>
    );
}

export default ListView;