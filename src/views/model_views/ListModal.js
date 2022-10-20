import React, { useState } from 'react';
import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader, SubTable, Modal } from '../../components'

function ListModal(props) {

    let changeHandler = (event) =>{}

    let btnStyle = {
        float:'right'
    }

    let ModalHeader = <FormHeader formMode={'add'} style={btnStyle} />

    let FormSkelton = <React.Fragment>
                            <SubTable headers={props.fields} rows={props.rows} headerType='Json' defaultLabel={'Default'} visible={true}
                                status={false} default={true} changeMode={()=>{}} loadFormData={()=>{}}/>
                      </React.Fragment>


    return (
        <Modal show={props.modalShow} title={props.title} onHide={props.toggleMode} modalbody={FormSkelton} modalheader={''}/>
    );
}

export default ListModal;