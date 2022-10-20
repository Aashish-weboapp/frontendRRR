import { Dropdown } from '..'
import  '../../styles/components/Field.css'

function CustomIcon(props) {

  let clickHanlder = (value) => {
    props.clickHanlder(value)
  }                     

  return (
        <i className={props.icon} onClick={clickHanlder} style={props.style}></i>
  );
}

export default CustomIcon;