import  '../../styles/components/Field.css'

function CustomButton(props) {

  let clickHanlder = (value) => {
    props.clickHanlder(value)
  }

  return (
        <button style={props.style} className='formButton' onClick={()=>clickHanlder(props.value)}>{props.btn}<i className={props.icon}></i></button>
  );
}

export default CustomButton;