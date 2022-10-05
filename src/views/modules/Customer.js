import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';

import {  getCustomers,
          getAddresses,
          getCustomerData,
          getCustomerAddress, 
          createCustomer} from '../../actions/app'

import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'
import FormView from "../entities/FormView";
import ListView from "../entities/ListView";
import SubListView from "../entities/SubListView";



function Customer(props) {

    let customerId=1;
    const [customer,setCustomers] = useState({cust_list:[],cust_json:{'entity':'1'}});
    const [formMode,setFormMode] = useState('list');

    useEffect(()=>{
      props.getCustomers('/').then(() => {
        props.getAddresses('/').then(() => {

        });
      },[])
    },[])

    useEffect(()=>{
      if((props.cust_list) != undefined ) 
      {
        customerMap()
      }
        
    },[props.cust_list,props.addresses])

    let customerMap = () =>{
      let customer_list=[]
            props.cust_list.map((cust,idx)=>{
              let customer = cust
              customer['address'] = {}
              props.addresses.map((addr,inndx)=>{
                if(addr.customer != null)
                {
                  if (addr.customer.id === cust.id && addr.default===true)
                  {
                    customer['address'] = addr
                  }
                }
              })
            customer_list.push(customer)
          })
        setCustomers(customer => ({ ...customer, cust_list: customer_list}))
    }

    let searchByName = (name) =>{
      async function customerFetch(customer_filter){
      await props.getCustomers(customer_filter).then(() => {
        console.log('customers',props.cust_list)
      })
      console.log('customers--',props.cust_list)
      }
      customerFetch('?name='+name)
    }

    let changeMode = (mode) =>{
      if(mode==='save')
      {
        props.createCustomer(customer.cust_json).then(() => {
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
      setCustomers(customer => ({ ...customer, cust_json :{...customer.cust_json , [field]:value} }))
    }

    let loadFormData = (customerID) =>{
      props.getCustomerAddress(customerID).then(() => {})
      props.cust_list.map((cust,idx)=>{
        if(cust.id===customerID)
        {
          setCustomers(customer => ({ ...customer, cust_json: cust}))
        }
      })
    }

   

  return (
    
    <Wrapper>
      {formMode === 'list'?
         <ListView title='Customers' 
                   menuToggle={props.menuToggle}
                   searchByName={searchByName}
                   changeMode={changeMode}
                   loadFormData={loadFormData}
                   headers={props.column_items}
                   rows={props.cust_list}/>:
      formMode === 'add' || formMode === 'edit' || formMode === 'view'?
       <Wrapper>
        <FormView recordID={customerId}
                  menu_id = {props.menu_id}
                  loadFormData={loadFormData}
                  dataObj={customer.cust_json}
                  formMode={formMode}
                  changeMode={changeMode}/>
        <SubListView title='Billing Addresses' 
                   changeMode={changeMode}
                   tableMode={formMode}
                   loadFormData={loadFormData}
                   headers={props.column_items}
                   rows={props.cust_list}/>
        <SubListView title='Shipping Addresses' 
                   changeMode={changeMode}
                   tableMode={formMode}
                   loadFormData={loadFormData}
                   headers={props.column_items}
                   rows={props.cust_list}/>
       </Wrapper>:
        <></>}
        <></>
    </Wrapper>
  );
}


const mapStateToProps = state => {
    return {
        cust_list: state.appData.customers,
        cust_data : state.appData.customerData,
        addresses: state.appData.addresses,
        cust_addr: state.appData.customerAddresses,
        list_items: state.sysData.list_items,
        column_items:state.sysData.column_items
    };
  };
  
  
  const mapDispatchToProps = {
    getCustomers , getCustomerData , getCustomerAddress , createCustomer , getAddresses
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Customer);