import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getMenus , getMenuLists , getColumns   } from '../../actions/system'

import { Wrapper } from '../../components'
import { Customer , Address , Country, Sidebar , List , Column , Form } from '../../views'

function Template(props) {

    const [menu_info,setMenuItems] = useState({menu_items:[],menuOpen:true,menu_margin:250,menu_id:0,selected:''});

    useEffect(()=>{
        props.getMenus('?ordering=sequence').then(() => {
            setMenuItems(menu_info => ({ ...menu_info, menu_items: props.menu_items }))
          })
    },[])

    useEffect(()=>{
      if((props.list_items).length>0)  
      {
        let column_filter = '?list='+props.list_items[0].id+'&ordering=position'
        props.getColumns(column_filter).then(() => {})
      }
    },[props.list_items])

    let  routeForm = (menu_name,menu_id) =>{
        setMenuItems(menu_info => ({ ...menu_info, selected: menu_name , menu_id:menu_id}))
        let list_filter = '?name='+menu_name 
        props.getMenuLists(list_filter).then(() => {})
      }

    let menuToggle = () =>{
        let sideBar = document.getElementById('sidebar');
        let menu_margin = 20 
        if(menu_info.menuOpen){
          sideBar.style.display='none'
        }else{
          sideBar.style.display='block'
          menu_margin = 250
        }
        setMenuItems(menu_info => ({ ...menu_info, menuOpen: !menu_info.menuOpen , menu_margin : menu_margin }))
    }

    return (
        <Wrapper class='screen'>
            <Sidebar items={props.menu_items} navigateMenu={routeForm} />
            <Wrapper class='mb-2' style={{marginLeft:menu_info.menu_margin,marginTop:30,marginRight:20}}>
                <></>
                {menu_info.selected==='Customers'?
                    <Customer  menuToggle={menuToggle} menu_id={menu_info.menu_id}/>:
                menu_info.selected==='Addresses'?
                    <Address  menuToggle={menuToggle} menu_id={menu_info.menu_id} />:
                menu_info.selected==='Countries'?
                    <Country  menuToggle={menuToggle} menu_id={menu_info.menu_id} />:
                menu_info.selected==='Lists'?
                    <List  menuToggle={menuToggle} menu_id={menu_info.menu_id} />:
                menu_info.selected==='Columns'?
                    <Column  menuToggle={menuToggle} menu_id={menu_info.menu_id} />:
                menu_info.selected==='Forms'?
                    <Form  menuToggle={menuToggle} menu_id={menu_info.menu_id} />:    
                <></>}    
            </Wrapper>
      </Wrapper> 
    );
}

const mapStateToProps = state => {
    return {
        menu_items: state.sysData.menu_items,
        list_items: state.sysData.list_items,
    };
  };
  
const mapDispatchToProps = {
    getMenus , getMenuLists , getColumns
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Template);