import  '../../styles/components/Field.css'

function CustomInput(props) {

  return (
    <input className={props.class} placeholder={props.label} style={props.style} value={props.value} onChange={props.onChange}/>
  );
}

export default CustomInput;
