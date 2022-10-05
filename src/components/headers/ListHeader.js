import React, { useState } from "react";
import { Button , Input } from "../../components";


function ListHeader(props) {

    const [filterValue,setFilterValue] = useState('')

    let searchStyle={
        height : 30,
        width : 250,
        float:'right'
      }
      
      let titleStyle={
        fontWeight:'bold',
        fontSize:20,
        marginLeft:5
      }
      
      let buttonStyle={
        padding:2,
        marginLeft:2,
        marginRight:3,
        width:30,
        float:'right'
      } 
      
      
    let hanldeChange = (event) =>{
      setFilterValue(event.target.value)
    }

    let searchAction = () =>{
      props.searchControl(filterValue)
    }

    let addRecord = () =>{
      props.changeMode('add')
    }

  return (
    <>
        <i className={props.icon} onClick={props.iconHandler}></i>
        <label style={titleStyle}>{props.listTitle}</label>
        <Button btn='' icon='fas fa-eye' style={buttonStyle} value = '' clickHanlder = {()=>{}}/>
        <Button btn='' icon='fas fa-plus' style={buttonStyle} value = '' clickHanlder = {addRecord}/>
        <Button btn='' icon='fas fa-search' style={buttonStyle} value = '' clickHanlder = {searchAction}/>
        <Input label={'search for '+props.listTitle} class='formField' style={searchStyle} onChange={hanldeChange} />
    </>
  );
}

export default ListHeader;