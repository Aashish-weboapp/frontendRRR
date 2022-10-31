import React, { useState } from 'react';
import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader, SubTable, CustomModal , Icon } from '../../components'

function ListModal(props) {

    let buttonStyle={
        marginTop:10,
        marginLeft:15,
        marginRight:0,
        width:35,
        float:'right',
        color: 'rgb(12, 125, 177)'
      }  

      let buttonStyle2={
        marginTop:10,
        marginLeft:1100,
        marginRight:0,
        width:30,
        float:'right',
        color: 'rgb(12, 125, 177)'
      }  

    let ModalHeader = <Wrapper>
                        <i className={props.icon + ' fa-2x'} style={{color:'green'}}  />
                        <label style={{marginLeft:10,fontSize:20,fontWeight:'bold'}} >{(props.title).toUpperCase()}</label>
                        <Icon icon='fad fa-arrow-down-to-line fa-xl' style={buttonStyle} clickHanlder = {()=>{props.toggleMode()}}/>
                        <Icon icon='fas fa-gear fa-xl' style={buttonStyle} clickHanlder = {()=>{props.toggleExportMode()}}/>
                        <Icon icon='fas fa-eye fa-xl' style={buttonStyle} clickHanlder = {()=>{props.toggleExportMode()}}/>
                        <Icon icon='fas fa-plus fa-xl' style={buttonStyle} clickHanlder = {()=>{props.shuffleMode()}}/>
                        <Icon icon='fas fa-search fa-xl' style={buttonStyle2} clickHanlder = {()=>{props.toggleExportMode()}}/>
                    </Wrapper>

    let FormSkelton = <React.Fragment>
                            <SubTable headers={props.fields} rows={props.rows} headerType='Json' defaultLabel={'Default'} visible={true}
                                status={false} default={true} changeMode={()=>{}} loadFormData={()=>{}}/>
                      </React.Fragment>

    


    return (
        <CustomModal display={props.modalShow} modalbody={FormSkelton} modalheader={ModalHeader}/>
    );
}

export default ListModal;