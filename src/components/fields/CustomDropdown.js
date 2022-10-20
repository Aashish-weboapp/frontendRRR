import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from '..';

function CustomDropdown(props) {

  let buttonStyle={
    padding:2,
    marginLeft:4,
    marginRight:3,
    width:30,
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
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
        
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;