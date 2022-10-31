import React, { useEffect } from "react";
import  '../../styles/views/Login.css'

import { connect } from 'react-redux';
import { useNavigate  } from "react-router-dom";
import { user_login } from '../../actions/auth'

function Login(props) {

  const navigate = useNavigate();

      let handleSubmit = () => {
        let uname = document.getElementById('Uname').value;
        let pass = document.getElementById('Pass').value;
        let login_info={username:uname,password:pass}
        props.user_login(login_info).then(() => {
        }, () => {
                
        });
      }

      useEffect(()=>{
        if(props.loginDetails.status === 'success'){
          localStorage.setItem('accesToken',props.loginDetails.token.access)
          localStorage.setItem('configuration',JSON.stringify(props.loginDetails.configuration)) //[0].current_value
          navigate('/views');
        }

      },[props.loginDetails])

  return (
    <>
  
        <h2><center>Login Page</center> </h2>
        <br></br>    
        <div className="login">    
          <form id="login" onSubmit={handleSubmit}>    
              <label className='label'><b>User Name</b></label> 
              <br></br>      
              <input type="text" name="Uname" id="Uname" placeholder="Username"/>    
              <br></br><br></br>    
              <label className='label'><b>Password</b>    </label> 
              <br></br>  
              <input type="Password" name="Pass" id="Pass" placeholder="Password" />    
              <br></br><br></br>    
              <button className={`text-capitalize btn btn-secondary btn-lg"`} type="button" onClick={handleSubmit}>Login</button>      
              <br></br>    
                
          </form>     
      </div>
     

    </>
  );
}

const mapStateToProps = state => {
  return {
     loginDetails : state.authData.loginDetails
  };
};

const mapDispatchToProps = {
  user_login
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);