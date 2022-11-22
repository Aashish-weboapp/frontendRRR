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

  let widthset = props.type === 'search' ? 30 : props.type === 'modalField' ? props.width : 100

  let inputValue = props.value === null ? undefined :  props.value
  
  if(props.label === 'created_time' || props.label === 'modified_time' || props.label === 'used' )
  {
    inputValue = (new Date(props.value)).toLocaleDateString('en-US')
    console.log('in time',inputValue)
  }

  //composite ,, enterable , link

  return (
    <>
        {props.type === 'dropdown'?
        <select className={props.class} style={wdthStyle(100)}>
          {props.choices.map((choice,indx)=>{
            return <option key={'choice'+indx} value={choice.id}>{choice.label}</option>
          })}
        </select>:
        props.type === 'phone'?
        <>
          <input className={props.class} 
              placeholder={props.label}
              style={wdthStyle(50)} 
              type = 'number'
              value={inputValue} 
              onChange={props.onChange}/>
          <select style={nestedStyle(40)}>
            <option>Office</option>
            <option>Mobile</option>
          </select></>:
        props.type === 'multi-line'?
        <>
          <textarea className={props.class} style={wdthStyle(100)}/>
        </>:
        props.type === 'read-only'?
        <input className={props.class} readOnly
              placeholder={props.label}
              style={wdthStyle(widthset)} 
              type = {props.type}
              value={inputValue} 
              onChange={props.onChange}/>:
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
