
import React, { useState } from 'react';
import  '../../styles/views/Sidebar.css'

function Sidebar(props) {

    const [prevItem,setPrevItem] = useState('Home')

    let shuffleDropdown = (menuID,blockID) =>{
        //document.getElementById(menuID).classList.toggle("active");
        var dropdownContent = document.getElementById(blockID);
        if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
        } else {
        dropdownContent.style.display = "block";
        }
    }

    const groupByMake = (arr = []) => {
        let result = [];
        if(arr.length > 0 ){
            result = arr.reduce((r, a) => {
            r[a.application] = r[a.application] || [];
            r[a.application].push(a);
            return r;
            }, Object.create(null))};
        return result;
     };

    let navigateMenu = (formName,id) =>{
        document.getElementById(prevItem).classList.remove('active')
        document.getElementById(formName).classList.add('active')
        setPrevItem(formName)
        props.navigateMenu(formName,id)
    }

     let grouped_items = groupByMake(props.items)

     let menu_items = Object.keys(grouped_items).map(key => {
        return(
            <li key={key}>
                <a href="#" id={key+'-text'} onClick={() => {shuffleDropdown(key+'-text',key) }} >
                    <span  className="menu-item">{key}<i className="fa fa-caret-down"></i></span>
                </a>
                <div className="dropdown-container" id={key}>
                {grouped_items[key].map((sub_item,indx)=>{
                    return <a href="#" className='' id = {sub_item.form_name} onClick={() => {navigateMenu(sub_item.form_name,sub_item.id)}}>{sub_item.menu_item}</a>
                })}
                </div>
            </li>  
        )
     });

    return (

        <div className="wrapper mb-2">
            <div className="sidebar" id='sidebar'>
                <div className="profile">
                    <h4>Conservation</h4>
                    <h4>Technology</h4>
                </div>
                <ul>
                <li>
                    <a href="#" id='Home'>
                        <span className="menu-item">Home</span>
                    </a>
                </li>
               {menu_items}
               
            </ul>
            </div>

          

        </div>
    );
  }

  // <img src="https://1.bp.blogspot.com/-vhmWFWO2r8U/YLjr2A57toI/AAAAAAAACO4/0GBonlEZPmAiQW4uvkCTm5LvlJVd_-l_wCNcBGAsYHQ/s16000/team-1-2.jpg" alt="profile_picture">
  
  export default Sidebar;
  