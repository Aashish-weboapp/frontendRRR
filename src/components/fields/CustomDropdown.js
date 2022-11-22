import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from '..';

function CustomDropdown(props) {

  let buttonStyle={
    padding:4,
    marginLeft:4,
    marginRight:3,
    marginBottom:4,
    width:40,
    height:35,
    float:'right',
    border: '1px solid black',
    borderRadius: '3px',
    color:'#0c7db1'
  } 


  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button type='button' btn='' icon={props.icon} style={buttonStyle} value = '' clickHanlder = {onClick} />
  ));

  const CustomButton = React.forwardRef(({ children, onClick }, ref) => (
    <button onClick={onClick}>in this</button>
  ));

  

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" >
        
      </Dropdown.Toggle>

      <Dropdown.Menu drop={'start'} align='end'>
        {props.options.map((option,indx)=>{
          return <Dropdown.Item href={"#/"+option}>{props.check== true?<><input type='checkbox' checked />&nbsp;&nbsp;</>:<></>}{option}</Dropdown.Item>
        })}
        
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;