import React, { useState } from "react";
import { Icon } from "..";
import Wrapper from "../wrappers/Wrapper";
import CustomButton from "./../fields/CustomButton";


function TableHeader(props) {
      
      let buttonStyle={
        marginTop:10,
        marginLeft:1,
        width:30,
        float:'right',
        color: 'rgb(12, 125, 177)'
      }  
      
    let changeStatus = () =>{
     props.setVisible(!props.visible)
    }

    let icon = props.headerIcon == undefined ? 'fas fa-address-card' : props.headerIcon

    let title = (props.title).toUpperCase()

  return (
    <Wrapper class='relHeader'>
        <i className={icon + ' fa-2x'} style={{color:'green'}}  onClick = {()=>{changeStatus()}} />
        <label style={{marginLeft:10,fontSize:20,fontWeight:'bold'}} >{title}</label>
        <Icon icon='fad fa-arrow-up-from-line fa-xl' style={buttonStyle} clickHanlder = {()=>{props.toggleExportMode()}}/>
         {props.tableMode==='add' || props.tableMode==='edit'?
             <Icon icon='fas fa-plus fa-xl' style={buttonStyle} clickHanlder = {()=>{props.toggleAddMode()}}/>:
          <></>}
        <hr style={{height:2,marginTop:10,color:'gray',backgroundColor:'gray'}} />
    </Wrapper>
  );
}

export default TableHeader;