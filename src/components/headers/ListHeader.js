import React, { useState } from "react";
import { Button , Dropdown, Input } from "../../components";


function ListHeader(props) {

    let searchStyle={
        height : 30,
        width : 150,
        float:'right',
        border: '1px solid black',
      }
      
      let titleStyle={
        fontWeight:'bold',
        fontSize:20,
        marginLeft:5
      }
      
      let buttonStyle={
        padding:2,
        marginLeft:4,
        marginRight:3,
        width:30,
        float:'right',
        border: '1px solid black',
        borderRadius: '3px',
        color:'#0c7db1'
      } 

    let borderStyle = {
      color:'#0c7db1',
      border: '1px solid black',
      borderRadius: '3px'
    }
      
      
    let hanldeChange = (event) =>{
      props.searchControl(event.target.value)
    }

    let searchAction = () =>{
      //props.searchControl(filterValue)
    }

    let openImport = () =>{
      props.openImport()
    }

    let addRecord = () =>{
      props.changeMode('add')
    }

  return (
    <>
        <Button type='dropdown' btn='' icon='fas fa-search' style={buttonStyle} value = '' clickHanlder = {searchAction} />
        <Button type='button' btn='' icon='fas fa-gear' style={buttonStyle} value = '' clickHanlder = {openImport} />
        <Button type='dropdown' btn='' icon='fas fa-eye' style={buttonStyle} value = '' clickHanlder = {()=>{}} />
        <Button type='button' btn='' icon='fas fa-plus' style={buttonStyle} value = '' clickHanlder = {addRecord} />
        <Button btn='' icon={props.icon} style={borderStyle} value = '' clickHanlder = {()=>{props.iconHandler()}}/>
        <label style={titleStyle}>{props.listTitle}</label>
        
       
        
        
        <Input label={'search for '+props.listTitle} class='formField' type='search' style={searchStyle} onChange={hanldeChange} />
    </>
  );
}

export default ListHeader;