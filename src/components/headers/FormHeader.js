import React, { useState } from "react";
import CustomButton from "./../fields/CustomButton";

function FormHeader(props) {

  const [formID,setFormID] = useState(props.recordID)
      
      let buttonStyle={
        padding:2,
        marginLeft:3,
        marginRight:3,
        width:50,
        color:'#33BEFF'
      }  
      
  let changeID = (form_id) =>{
    setFormID(form_id)
    props.recControl(form_id)
  }  
      

  return (
    <>
        {props.formMode==='add'||props.formMode==='edit'?
          <>
            <CustomButton btn='' icon='fas fa-save' style={buttonStyle} value = '' clickHanlder = {()=>{props.changeMode('save')}}/>
            <CustomButton btn='' icon='fas fa-window-minimize' style={buttonStyle} value = '' clickHanlder = {()=>{props.changeMode('list')}}/>
          </>:
          <>
            <CustomButton btn='' icon='fas fa-arrow-left' style={buttonStyle} value = '' clickHanlder = {()=>{props.changeMode('list')}}/>
            <CustomButton btn='' icon='fas fa-backward' style={buttonStyle} value = '' clickHanlder = {()=>{changeID(formID-1)}}/>
            <CustomButton btn='' icon='fas fa-forward' style={buttonStyle} value = '' clickHanlder = {()=>{changeID(formID+1)}}/>
            <CustomButton btn='' icon='fas fa-pen' style={buttonStyle} value = '' clickHanlder = {()=>{props.changeMode('edit')}}/>
            <CustomButton btn='' icon='fas fa-plus' style={buttonStyle} value = '' clickHanlder = {()=>{props.changeMode('add')}}/>
          </>}
        <CustomButton btn='' icon='fas fa-bars' style={buttonStyle} value = '' clickHanlder = {()=>{}}/>
        <CustomButton btn='' icon='fas fa-question' style={buttonStyle} value = '' clickHanlder = {()=>{}}/>
    </>
  );
}

export default FormHeader;