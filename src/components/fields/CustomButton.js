import { Dropdown } from '..'
import  '../../styles/components/Field.css'

function CustomButton(props) {

  let clickHanlder = (value) => {
    props.clickHanlder(value)
  }

  let htmlButton = <button ref={props.ref} style={props.style} className='formButton' onClick={()=>clickHanlder(props.value)}>{props.btn}<i className={props.icon}></i></button>

  let typeButton =  props.type === 'dropdown' ? <Dropdown button = {htmlButton} icon={props.icon} options={props.options} check={props.check}/> : htmlButton
                        

  return (
        <>
         {typeButton}
        </>
  );
}

export default CustomButton;