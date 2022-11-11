import React, {useEffect, useState, useSyncExternalStore} from "react";
import { connect } from 'react-redux';

import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader, Modal, Dropdown } from '../../components'
import FormView from "../entities/FormView";
import ListView from "../entities/ListView";
import { getImportData , getListForm } from '../../actions/system'
import { getListRows } from '../../actions/app'


function System(props) {

      const [formMode,setFormMode] = useState('list');
      const [listRows,setListRows] = useState([])
      const [listForm,setListForm] = useState({})
      const [rowData,setRowData] = useState({})

      useEffect(()=>{
        if(props.list_info.data_source != null && props.list_info.data_source != undefined)
          props.getListRows(props.list_info.data_source,'/').then(()=>{})
        if(props.list_info.id != null && props.list_info.id != undefined)
          props.getListForm('?list='+props.list_info.id+'&relation=parent').then(()=>{})
        setFormMode('list')
      },[props.list_info.id])

      useEffect(()=>{
       setListRows(props.listRows)
      },[props.listRows])

      useEffect(()=>{
        if((props.listForm).length > 0)
          setListForm(props.listForm[0].form)
       },[props.listForm])

      let searchControl = (field,value) =>{
        function rowsFetch(rows_filter){
          if(value=='')
          {
            rows_filter = '/'
          }
          props.getListRows(props.list_info.data_source,rows_filter).then(()=>{})
        }
        rowsFetch('?'+field+'='+value)
      }

      let changeMode = (mode) =>{
        if(mode==='save')
        {
        
        }else{
          setFormMode(mode)
        }
      }

      let loadFormData = (recordID) =>{
        let record = listRows.find(row => row.id === recordID);
        if(record != undefined)
        {
          setRowData(record)
        }
        else{
          alert('No Matching Record Found')
        }
      }

      let importData = (import_path,file)=>{
        let formData = new FormData();
        formData.append("file", file);
        props.getImportData(import_path,formData).then(() =>{
          alert('Data Import Operation Completed')
        })
      }

  return (
    
    <Wrapper>
      {formMode === 'list'?
         <ListView title={props.list_info.label}
                   menuToggle={props.menuToggle}
                   searchControl={searchControl}
                   changeMode={changeMode}
                   loadFormData={loadFormData}
                   headers={props.list_info.columns}
                   data_source={props.list_info.data_source}
                   importData = {importData}
                   rows={listRows}/>:
      formMode === 'edit' || formMode === 'view'?
       <Wrapper>
        {listForm.id !=null && listForm.id != undefined?
          <FormView recordID={rowData.id}
                    icon={props.icon}
                    form_id = {listForm.id }
                    loadFormData={()=>{}}
                    dataObj={rowData}
                    formMode={formMode}
                    changeMode={changeMode}
                    saveRecord={()=>{}}
                    lists={[]}
                    updateRecord={()=>{}}/>:
          <></>}
          <></>
       </Wrapper>:
      formMode === 'add' ?
       <Wrapper>
        <FormView   recordID={1}
                    icon={props.list_info.icon}
                    form_id = {''} //props.list_info.form.id
                    loadFormData={()=>{}}
                    dataObj={{}}
                    formMode={formMode}
                    changeMode={changeMode}
                    saveRecord={()=>{}}
                    lists={[]}
                    updateRecord={()=>{}}/><></>
    
       </Wrapper>:

        <></>}
        <></>
    </Wrapper>
  );
}


const mapStateToProps = state => {
    return {
        list_items: state.sysData.list_items,
        column_items:state.sysData.column_items,
        importData:state.sysData.importData,
        listRows:state.appData.listRows,
        listForm:state.sysData.listForm,
    };
  };
  
  
  const mapDispatchToProps = {
    getImportData , getListRows , getListForm
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(System);