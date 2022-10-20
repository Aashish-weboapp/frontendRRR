import './App.css';
import React from "react";
import { connect } from 'react-redux';
import { Routes, Route , Navigate} from 'react-router-dom';
import { RestrictedRoute } from './routes/RestrictedRoute';
import indexRoutes from "./routes/SecureRoutes";

import Login from './views/authorization/Login';
import { Template } from './views'

function App(props) {

  return (  
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<Login />} ></Route>
        </Routes>
        <Routes>
          <Route path="/views" element={<Template />} ></Route>
          {indexRoutes.map((prop, key) => {
              return <Route key={key} path={prop.path} element={<RestrictedRoute component={prop.component}/>} ></Route>
          })} 
        </Routes>
      </>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {}

export default connect(mapStateToProps,mapDispatchToProps)(App);