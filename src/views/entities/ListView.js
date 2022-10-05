import React from 'react';
import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'

function ListView(props) {
    return (
        <Wrapper>
            <ListHeader icon='fas fa-bars fa-border icon' iconHandler={props.menuToggle} searchControl={props.searchByName} changeMode={props.changeMode} listTitle={props.title} />
            <Card top={20}>
                <></>
                <Table headers={props.headers} rows={props.rows} headerType='Json' status={true} changeMode={props.changeMode} loadFormData={props.loadFormData}/>
            </Card>
        </Wrapper>
    );
}

export default ListView;