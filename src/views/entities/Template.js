import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getMenus  , getColumns   , getListData } from '../../actions/system'

import { PushNotify, Wrapper } from '../../components'
import { Customer , Address , Country, Sidebar , List , Column , Form } from '../../views'
import System from '../skelton/System';
import Configuration from '../drag&drop/Draggable'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Draggable from '../drag&drop/Draggable';
import Section from '../drag&drop/Section';
import Droppable from '../drag&drop/Droppable';

function Template(props) {

    const [menu_info,setMenuItems] = useState({menu_items:[],menuOpen:true,menu_margin:250});
    const [list_info,setListInfo] = useState({label:'Home',id:0})

    useEffect(()=>{
        props.getMenus('?ordering=sequence').then(() => {
            setMenuItems(menu_info => ({ ...menu_info, menu_items: props.menu_items }))
          })
    },[])

    useEffect(()=>{
      setListInfo(props.list_data)        
    },[props.list_data])

    let  routeForm = (list) =>{
        props.getListData(list.id).then(() => {})
        //calling it to maintain ordering
        //let column_filter = '?list='+list.id+'&ordering=position'
        //props.getColumns(column_filter).then(() => {})
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
                {list_info.label==='Home'?
                <></>:
                list_info.label ==='Customers'?
                    <Customer  menuToggle={menuToggle} list_info={list_info}/>:
                list_info.label ==='Configurations'?
                    <DndProvider backend={HTML5Backend}><Droppable list_info={list_info}/></DndProvider>:
                <System list_info={list_info} />}  
            </Wrapper>
      </Wrapper> 
    );
}

const mapStateToProps = state => {
    return {
        menu_items: state.sysData.menu_items,
        list_data:state.sysData.list_data
    };
  };
  
const mapDispatchToProps = {
    getMenus  , getColumns , getListData
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Template);