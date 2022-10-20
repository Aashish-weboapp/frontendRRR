import React, { useState } from 'react';
import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader, SubTable, Modal } from '../../components'

function FormModal(props) {

    const[modalData,setModalData] = useState({'default':false})

    let changeHandler = (event,name) =>{
        const { value } = event.target;
        setModalData(modalData => ({ ...modalData, [name]: value }))
    }

    let saveRecord = () =>{
        props.saveRecord(modalData)
        setModalData({'default':false})
    }

    let btnStyle = {
        float:'left'
    }

    let ModalHeader = <><FormHeader formMode={'add'} style={btnStyle} saveRecord={saveRecord}/>
    <br></br><br></br></>

    let FormSkelton = props.fields.map((header,inx)=>{
        return (
            <React.Fragment key={inx}>
                <Label label={header.column} class='col-md-3 formLabel' parentClass='fieldRtl'/>
                <div className='fieldWrap'>
                    <Input label={''} type={'modalField'} width={90} class='col-md-3 formInput' value={modalData[header.field]} onChange={(event)=>{changeHandler(event,header.field)}} />
                </div>
            </React.Fragment>)
    })


    return (
        <Modal show={props.modalShow} title={props.title} onHide={props.toggleMode} modalbody={FormSkelton} modalheader={ModalHeader}/>
    );
}

export default FormModal;