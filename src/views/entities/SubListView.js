import React, { useState } from 'react';
import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader, SubTable, Modal } from '../../components'
import FormModal from '../model_views/FormModal';
import ListModal from '../model_views/ListModal';

function SubListView(props) {

    const [tableRows,setTableRows] = useState(props.rows)
    const [addMode,setAddMode] = useState(false)
    const [exportMode,setExportMode] = useState(false)
    const [visible,setVisMode] = useState(true)

    let toggleAddMode = () =>{
        setAddMode(!addMode)
    }

    let toggleExportMode = () =>{
        setExportMode(!exportMode)
    }

    let removeRow = () =>{
        setAddMode(false)
    }

    let saveRecord = (rowData) =>{
        toggleAddMode()
        setTableRows(tableRows => [...tableRows,rowData])
        props.loadList(props.type,rowData)
    }

    let setVisible = (Mode) =>{
        setVisMode(Mode)
    }

    let modalMode = addMode === true ? 'show' : ''

    let defaultLabel = props.defaultLabel == undefined ? 'Default' : props.defaultLabel

    return (
        <Wrapper>
            <Card top={20}>
                <TableHeader title={props.title} headerIcon = {props.icon} tableMode={props.tableMode} visible={visible} setVisible={setVisible} toggleAddMode={toggleAddMode} toggleExportMode={toggleExportMode}/>
                <SubTable headers={props.headers} rows={tableRows} removeRow={removeRow} pushRow={()=>{}}
                       headerType='Json' defaultLabel={defaultLabel} visible={visible}
                       status={false} default={true} changeMode={props.changeMode} loadFormData={props.loadFormData}/>
            </Card>
            <FormModal modalShow={addMode} 
                       title={props.title}
                       toggleMode={toggleAddMode}
                       saveRecord={saveRecord}
                       fields={props.headers}/>
            <ListModal modalShow={exportMode} 
                       title={props.title}
                       toggleMode={toggleExportMode}
                       rows={tableRows}
                       fields={props.headers}/>
        </Wrapper>
    );
}

export default SubListView;