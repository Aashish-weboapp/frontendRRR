import React , {useEffect} from 'react';
import { connect } from 'react-redux';

import {  getForms,
          getFields } from '../../actions/system'

import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'

function FormView(props) {

    useEffect(()=>{
        props.getForms('?menu='+props.menu_id).then(() => {})
    },[])

    useEffect(()=>{
        console.log('------------------------------------------')
        if((props.form_items).length > 0)
            props.getFields('?ordering=position&form='+props.form_items[0].id).then(() => {})
    },[props.form_items])

    let titleStyle={
        fontWeight:'bold',
        fontSize:20,
        marginLeft:10
        
      }

    let manageFieldData = (dataObj,field) =>{
        let fieldKey = field.field
        if(field.field===""||field.field===null)
            fieldKey=field.name
        let sepIndex = (field.field).indexOf('.')
        let dataMap = dataObj[field.field]
        if(sepIndex !== -1)
        {
            dataMap = dataObj[(field.field).substring(0, sepIndex)]
            if(dataMap != null)
                dataMap = dataMap[(field.field).substring(sepIndex+1, field.field.length)]
        }
        return dataMap
    }

    let FormSkelton = props.field_items.map((field,inx)=>{
        let heading = ((field.name).charAt(0)).toUpperCase() + ((field.name).slice(1)).replace('_',' ')
        let dataMap = manageFieldData(props.dataObj,field)
        return (
            <React.Fragment>
                <Label label={heading} class='col-md-3 formLabel' parentClass='fieldRtl'/>
                {props.formMode === 'view'?
                    <Label label={dataMap} class='col-md-3 formValue' parentClass='' />:
                    <div className='fieldWrap'>
                        <Input label={''} class='col-md-3 formInput'  value={dataMap} onChange={(event)=>{}} />
                    </div> }
            </React.Fragment>)
    })

    return (
        <Wrapper>
           <FormHeader recordID={props.recordID} changeMode={props.changeMode} formMode={props.formMode} 
                       recControl={()=>{props.loadFormData(props.recordID)}}/>
            <Card top={20}>
                <i className='fas fa-user fa-3x'></i>
                <label style={titleStyle}>{props.dataObj['name']}</label><br></br><br></br>
                {FormSkelton}
            </Card>
            
          </Wrapper>
    );
}

const mapStateToProps = state => {
    return {
        form_items: state.sysData.form_items,
        field_items:state.sysData.field_items
    };
  };
  
const mapDispatchToProps = {
    getForms,getFields
   
}
  
export default connect(mapStateToProps,mapDispatchToProps)(FormView);