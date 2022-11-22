import React, { useState } from "react";
import { Button , Dropdown, Input } from "../../components";


function ListHeader(props) {

    let searchStyle={
        height : 35,
        width : 150,
        float:'right',
        border: '1px solid black',
        padding:'8px'
      }
      
      let titleStyle={
        fontWeight:'bold',
        fontSize:20,
        marginLeft:5
      }
      
      let buttonStyle={
        padding:4,
        marginLeft:4,
        marginRight:3,
        width:40,
        height:35,
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
      props.searchControl(props.searchSelector,event.target.value)
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

    let reOrderLabel = 'Re-Order '+props.listTitle;

    let visHeaders = []

    props.headers.map((header,indx)=>{
      visHeaders.push(header.label)
    })

  return (
    <>
        <Button type='dropdown' btn='' icon='fas fa-gear' style={buttonStyle} value = '' clickHanlder = {()=>{}} 
                 options = {[reOrderLabel]} check={false}/>
        <Button type='dropdown' btn='' icon='fas fa-eye' style={buttonStyle} value = '' clickHanlder = {()=>{}}
                options = {visHeaders} check={true}  />
        <Button type='button' btn='' icon='fas fa-plus' style={buttonStyle} value = '' clickHanlder = {addRecord} />
        <Button type='dropdown' btn='' icon='fas fa-search' style={buttonStyle} value = '' clickHanlder = {searchAction} 
                options = {['Status','ID','Advanced Search']} check={false}/>
        <Button type='button' btn='' icon='fas fa-file-import' style={buttonStyle} value = '' clickHanlder = {openImport} />
       
        
        <Button btn='' icon={props.icon} style={borderStyle} value = '' clickHanlder = {()=>{props.iconHandler()}}/>
        <label style={titleStyle}>{props.listTitle}</label>
        
       
        
        
        <Input label={'search for '+props.listTitle} class='formField' type='search' style={searchStyle} onChange={hanldeChange} />
    </>
  );
}

export default ListHeader;