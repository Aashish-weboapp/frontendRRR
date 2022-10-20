import React, { useState } from "react";
import { Icon } from "..";
import Wrapper from "../wrappers/Wrapper";
import CustomButton from "./../fields/CustomButton";


function TableHeader(props) {
      
      let buttonStyle={
        padding:2,
        marginLeft:3,
        marginRight:3,
        width:50,
        float:'right',
      }  
      
    let changeStatus = () =>{
     props.setVisible(!props.visible)
    }

    let icon = props.headerIcon == undefined ? 'fas fa-address-card' : props.headerIcon

  return (
    <Wrapper class='relHeader'>
        <i className={icon + ' fa-2x'} style={{color:'green'}}  onClick = {()=>{changeStatus()}} />
        <label style={{marginLeft:10,fontSize:20}} >{props.title}</label>
        <Icon icon='fad fa-arrow-up-from-line fa-2x' style={buttonStyle} clickHanlder = {()=>{props.toggleExportMode()}}/>
         {props.tableMode==='add' || props.tableMode==='edit'?
            <CustomButton btn='' icon='fas fa-plus' style={buttonStyle} value = '' clickHanlder = {()=>{props.toggleAddMode()}}/>:
          <></>}
        <hr style={{height:2,marginTop:10,color:'gray',backgroundColor:'gray'}} />
    </Wrapper>
  );
}

export default TableHeader;