import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';

import {  getCountries,
          getCountryData,
          createCountry} from '../../actions/system'

import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'
import FormView from "../entities/FormView";
import ListView from "../entities/ListView";



function Country(props) {

    let CountryId=1;
    const [Country,setCountries] = useState({cont_list:[],cont_json:{'entity':'1'}});
    const [formMode,setFormMode] = useState('list');

    useEffect(()=>{
      props.getCountries('/').then(() => {
        setCountries(Country => ({ ...Country, cont_list: props.cont_list}))
      });
    },[])

    let CountryMap = () =>{
      let Country_list=[]
            props.cont_list.map((cust,idx)=>{
              let Country = cust
              Country['address'] = {}
              props.addresses.map((addr,inndx)=>{
                if(addr.Country != null)
                {
                  if (addr.Country.id === cust.id && addr.default===true)
                  {
                    Country['address'] = addr
                  }
                }
              })
            Country_list.push(Country)
          })
        setCountries(Country => ({ ...Country, cont_list: Country_list}))
    }

    let searchByName = (name) =>{
      async function CountryFetch(Country_filter){
      await props.getCountries(Country_filter).then(() => {
      })
      }
      CountryFetch('?name='+name)
    }

    let changeMode = (mode) =>{
      if(mode==='save')
      {
        props.createCountry(Country.cont_json).then(() => {
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
      setCountries(Country => ({ ...Country, cont_json :{...Country.cont_json , [field]:value} }))
    }

    let loadFormData = (CountryID) =>{
      props.getCountryAddress(CountryID).then(() => {})
      props.cont_list.map((cust,idx)=>{
        if(cust.id===CountryID)
        {
          setCountries(Country => ({ ...Country, cont_json: cust}))
        }
      })
    }

   

  return (
    
    <Wrapper>
      {formMode === 'list'?
         <ListView title='Countries' 
                   menuToggle={props.menuToggle}
                   searchByName={searchByName}
                   changeMode={changeMode}
                   loadFormData={loadFormData}
                   headers={props.column_items}
                   rows={props.cont_list}/>:
      formMode === 'add' || formMode === 'edit' || formMode === 'view'?
        <FormView recordID={CountryId}
                  menu_id = {props.menu_id}
                  loadFormData={loadFormData}
                  dataObj={Country.cont_json}
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
        cont_list: state.sysData.countries,
        cust_data : state.sysData.countryData,
        list_items: state.sysData.list_items,
        column_items:state.sysData.column_items
    };
  };
  
  
  const mapDispatchToProps = {
    getCountries , getCountryData , createCountry
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Country);