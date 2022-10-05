import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';

import {  getLists } from '../../actions/system'

import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'
import FormView from "../entities/FormView";
import ListView from "../entities/ListView";



function List(props) {

    let ListId=1;
    const [List,setLists] = useState({list:[],list_json:{'entity':'1'}});
    const [formMode,setFormMode] = useState('list');

    useEffect(()=>{
      props.getLists('/').then(() => {
        setLists(List => ({ ...List, list: props.list}))
      });
    },[])

    let ListMap = () =>{
      let List_list=[]
            props.list.map((cust,idx)=>{
              let List = cust
              List['address'] = {}
              props.addresses.map((addr,inndx)=>{
                if(addr.List != null)
                {
                  console.log('default',addr.default)
                  if (addr.List.id === cust.id && addr.default===true)
                  {
                    List['address'] = addr
                  }
                }
              })
            List_list.push(List)
          })
        setLists(List => ({ ...List, list: List_list}))
    }

    let searchByName = (name) =>{
      async function ListFetch(List_filter){
      await props.getLists(List_filter).then(() => {
        console.log('Lists',props.list)
      })
      console.log('Lists--',props.list)
      }
      ListFetch('?name='+name)
    }

    let changeMode = (mode) =>{
      if(mode==='save')
      {
        props.createList(List.list_json).then(() => {
          setFormMode('view')
        })
      }else if(mode==='edit')
      {
        setFormMode(mode)

      }else{
        setFormMode(mode)
      }
    }


    let addValue = (event,field) =>{
      const { value } = event.target;
      setLists(List => ({ ...List, list_json :{...List.list_json , [field]:value} }))
    }

    let loadFormData = (ListID) =>{
      console.log('----',ListID)
      props.getListAddress(ListID).then(() => {})
      props.list.map((cust,idx)=>{
        if(cust.id===ListID)
        {
          setLists(List => ({ ...List, list_json: cust}))
        }
      })
    }

   

  return (
    
    <Wrapper>
      {formMode === 'list'?
         <ListView title='Lists' 
                   menuToggle={props.menuToggle}
                   searchByName={searchByName}
                   changeMode={changeMode}
                   loadFormData={loadFormData}
                   headers={props.column_items}
                   rows={props.list}/>:
      formMode === 'add' || formMode === 'edit' || formMode === 'view'?
        <FormView recordID={ListId}
                  menu_id = {props.menu_id}
                  loadFormData={loadFormData}
                  dataObj={List.list_json}
                  formMode={formMode}
                  changeMode={changeMode}
          />:
        <></>}
        <></>
    </Wrapper>
  );
}


const mapStateToProps = state => {
    return {
        list: state.sysData.lists,
        list_items: state.sysData.list_items,
        column_items:state.sysData.column_items
    };
  };
  
  
  const mapDispatchToProps = {
    getLists
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(List);