import React, { useState } from "react";
import { Button } from '../../components'

function FormHeader(props) {

  const [formID,setFormID] = useState(props.recordID)
      
      let iconStyle={
        ...props.style,
        padding:2,
        marginLeft:3,
        marginRight:3,
        width:50,
        color:'#0c7db1',
        border: '1px solid black',
        borderRadius: '3px'
      } 
      
      let buttonStyle = {
        padding:5,
        color:'#0c7db1',
        border: '1px solid black',
        borderRadius: '3px',
        float:'right',
        fontWeight:'bold'
      }
        
      
  let changeID = (form_id) =>{
    setFormID(form_id)
    props.recControl(form_id)
  }  
      

  return (
    <>
        {props.formMode==='add'||props.formMode==='edit'?
          <>
            <Button btn='' icon='fas fa-check' style={iconStyle} value = '' clickHanlder = {()=>{props.saveRecord()}}/>
            <Button btn='' icon='fas fa-close' style={iconStyle} value = '' clickHanlder = {()=>{props.changeMode('list')}}/>
          </>:
          <>
            <Button btn='' icon='fas fa-arrow-left' style={iconStyle} value = '' clickHanlder = {()=>{props.changeMode('list')}}/>
            <Button btn='' icon='fas fa-backward' style={iconStyle} value = '' clickHanlder = {()=>{changeID(formID-1)}}/>
            <Button btn='' icon='fas fa-forward' style={iconStyle} value = '' clickHanlder = {()=>{changeID(formID+1)}}/>
            <Button btn='' icon='fas fa-edit' style={iconStyle} value = '' clickHanlder = {()=>{props.changeMode('edit')}}/>
            <Button btn='' icon='fas fa-plus' style={iconStyle} value = '' clickHanlder = {()=>{props.changeMode('add')}}/>
          </>}
        <Button btn='' icon='fas fa-gear' style={iconStyle} value = '' clickHanlder = {()=>{}}/>
        <Button btn='' icon='fas fa-question' style={iconStyle} value = '' clickHanlder = {()=>{}}/>
        {props.formMode ==='edit' ?
          <Button btn='DEACTIVATE' style={buttonStyle} value='' clickHanlder={()=>{}} />:<></>}

    </>
  );
}

export default FormHeader;