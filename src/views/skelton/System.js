import React, {useEffect, useState, useSyncExternalStore} from "react";
import { connect } from 'react-redux';

import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader, Modal, Dropdown } from '../../components'
import FormView from "../entities/FormView";
import ListView from "../entities/ListView";
import SubListView from "../entities/SubListView";


function System(props) {

    const [formMode,setFormMode] = useState('list');

  return (
    
    <Wrapper>
      {formMode === 'list'?
        props.list_items.map((list,indx)=>{
            return (
              <React.Fragment key={indx}>
                <ListView title={props.menu.menu_item}
                        menuToggle={props.menuToggle}
                        searchByName={()=>{}}
                        changeMode={()=>{}}
                        loadFormData={()=>{}}
                        headers={props.column_items}
                        rows={props.cust_list}/>
              </React.Fragment>  
            )
        }):
      formMode === 'edit' || formMode === 'view'?
       <Wrapper>
        <FormView recordID={1}
                  icon={'fas fa-user '}
                  menu_id = {props.menu.id}
                  loadFormData={()=>{}}
                  dataObj={{}}
                  formMode={()=>{}}
                  changeMode={()=>{}}
                  saveRecord={()=>{}}
                  updateRecord={()=>{}}/>
        <SubListView title='Contacts' 
                   changeMode={()=>{}}
                   tableMode={formMode}
                   loadFormData={()=>{}}
                   headers={[]}
                   type={'Customer'}
                   loadList={()=>{}}
                   rows={[]}/>
    
       </Wrapper>:

        <></>}
        <></>
    </Wrapper>
  );
}


const mapStateToProps = state => {
    return {
        list_items: state.sysData.list_items,
        column_items:state.sysData.column_items
    };
  };
  
  
  const mapDispatchToProps = {
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(System);