import React, { useState } from 'react';
import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'

function SubListView(props) {

    const [addMode,setAddMode] = useState(false)

    let addRow = () =>{
        setAddMode(true)
    }

    return (
        <Wrapper>
            <Card top={20}>
                <TableHeader title={props.title} tableMode={props.tableMode} addRow={addRow}/>
                <Table headers={props.headers} rows={props.rows} addMode={addMode}    
                       headerType='Json' status={false} default={true} changeMode={props.changeMode} loadFormData={props.loadFormData}/>
            </Card>
            <></>
        </Wrapper>
    );
}

export default SubListView;