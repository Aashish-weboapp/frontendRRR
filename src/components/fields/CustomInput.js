import { useEffect } from 'react'
import  '../../styles/components/Field.css'
import { connect } from 'react-redux';

function CustomInput(props) {

  let wdthStyle = (width) =>{
    return ({
      ...props.style,
      width:width+'%',
    })
  }

  let nestedStyle = (width) =>{
    return ({
      marginLeft:'4px',
      width:width+'%',
    })
  }

  useEffect(()=>{
    if(props.type === 'lookup')
    {

    }
  },[props.type])

  let widthset = props.type === 'search' ? 30 : props.type === 'modalField' ? props.width : 50

  let inputValue = props.value === null ? undefined : props.value

  return (
    <>
        {props.type === 'dropdown'?
        <select className={props.class} style={wdthStyle(50)}>
          <option>Individual</option>
          <option>Company</option>
        </select>:
        props.type === 'phone'?
        <>
          <input className={props.class} 
              placeholder={props.label}
              style={wdthStyle(25)} 
              type = 'number'
              value={inputValue} 
              onChange={props.onChange}/>
          <select style={nestedStyle(24)}>
            <option>Office</option>
            <option>Mobile</option>
          </select></>:
        props.type === 'multi-line'?
        <>
          <textarea className={props.class} style={wdthStyle(100)}/>
        </>:
        <input className={props.class} 
              placeholder={props.label}
              style={wdthStyle(widthset)} 
              type = {props.type}
              value={inputValue} 
              onChange={props.onChange}/>}
    </>
  );
}

export default CustomInput;
