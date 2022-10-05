import React from "react";
import { connect } from 'react-redux';

import  '../../styles/views/Login.css'
import { user_login } from '../../actions/auth'

import { Wrapper , Card } from '../../components'

function Login(props) {

      let handleSubmit = () => {
        let uname = document.getElementById('Uname').value;
        let pass = document.getElementById('Pass').value;
        let login_info={username:uname,password:pass}
        props.user_login(login_info).then(() => {
          localStorage.setItem('token',)
        }, () => {
                
        });
      }

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
              <button className={`text-capitalize btn btn-secondary btn-lg"`} type="button">Login</button>      
              <br></br>    
                
          </form>     
      </div>
     

    </>
  );
}

const mapStateToProps = state => {
  return {
     
  };
};

const mapDispatchToProps = {
  user_login
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);