import React, { useState } from "react";
import CustomButton from "./../fields/CustomButton";


function TableHeader(props) {

  const [tableStatus,setTableStatus] = useState(true)
      
      let buttonStyle={
        padding:2,
        marginLeft:3,
        marginRight:3,
        width:50,
        float:'right'
      }  
      
  let changeStatus = () =>{
    setTableStatus(!tableStatus)
    if(document.getElementById(props.id).style.display==='none')
    {
        document.getElementById(props.id).style.display = ''
    }else{
        document.getElementById(props.id).style.display='none'
    }
  }  
      

  return (
    <>
        <i className='fas fa-address-card fa-2x'/>
        <label style={{marginLeft:10,fontSize:20}}>{props.title}</label>
        <CustomButton btn='' icon='fas fa-file-export' style={buttonStyle} value = '' clickHanlder = {()=>{}}/>
        {tableStatus===true?
            <CustomButton btn='' icon='fas fa-arrow-up' style={buttonStyle} value = '' clickHanlder = {()=>{changeStatus()}}/>:
            <CustomButton btn='' icon='fas fa-arrow-down' style={buttonStyle} value = '' clickHanlder = {()=>{changeStatus()}}/>}
         {props.tableMode==='add'?
            <CustomButton btn='' icon='fas fa-plus' style={buttonStyle} value = '' clickHanlder = {()=>{props.addRow()}}/>:
            <></>}
        <hr style={{height:2,marginTop:10,color:'gray',backgroundColor:'gray'}} />
    </>
  );
}

export default TableHeader;