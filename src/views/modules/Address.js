import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';

import {  getAddresses } from '../../actions/app'

import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'
import FormView from "../entities/FormView";
import ListView from "../entities/ListView";



function Address(props) {

    let AddressId=1;
    const [Address,setAddresss] = useState({addr_list:[],cust_json:{'entity':'1'}});
    const [formMode,setFormMode] = useState('list');

    useEffect(()=>{
      props.getAddresses('/').then(() => {
      });
    },[])

    let searchByName = (name) =>{
      async function AddressFetch(Address_filter){
      await props.getAddresss(Address_filter).then(() => {
        console.log('Addresss',props.cust_list)
      })
      console.log('Addresss--',props.cust_list)
      }
      AddressFetch('?name='+name)
    }

    let changeMode = (mode) =>{
      if(mode==='save')
      {
        props.createAddress(Address.cust_json).then(() => {
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
      setAddresss(Address => ({ ...Address, cust_json :{...Address.cust_json , [field]:value} }))
    }

    let loadFormData = (AddressID) =>{
      console.log('----',AddressID)
      props.getAddressAddress(AddressID).then(() => {})
      props.cust_list.map((cust,idx)=>{
        if(cust.id===AddressID)
        {
          setAddresss(Address => ({ ...Address, cust_json: cust}))
        }
      })
    }

   

  return (
    
    <Wrapper>
      {formMode === 'list'?
         <ListView title='Addresses' 
                   menuToggle={props.menuToggle}
                   searchByName={searchByName}
                   changeMode={changeMode}
                   loadFormData={loadFormData}
                   headers={props.column_items}
                   rows={props.addresses}/>:
      formMode === 'add' || formMode === 'edit' || formMode === 'view'?
        <FormView recordID={AddressId}
                  loadFormData={loadFormData}
                  dataObj={Address.cust_json}
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
        addresses: state.appData.addresses,
        cust_addr: state.appData.AddressAddresses,
        list_items: state.sysData.list_items,
        column_items:state.sysData.column_items
    };
  };
  
  
  const mapDispatchToProps = {
    getAddresses
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Address);