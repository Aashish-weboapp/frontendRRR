import React , {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';

import {  getForms,
          getFields } from '../../actions/system'

import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'

function FormView(props) {

    const [formData,setFormData] = useState({})
    const [updateData,setUpdateData] = useState({})

    let iconColor ={'Normal':'#50C878','Urgent':'#F75D59','Warning':'yellow','no':'black'}

    let titleStyle={
        fontWeight:'bold',
        fontSize:20,
        marginLeft:10
        
      }

    useEffect(()=>{
        props.getForms('?menu='+props.menu_id).then(() => {})
    },[])

    useEffect(()=>{
        if(Object.keys(props.dataObj).length !== 0)
        {
            setFormData(props.dataObj)
            if(props.dataObj.id != undefined)
                setUpdateData({id:props.dataObj.id})
        }
    },[props.dataObj])

    useEffect(()=>{
        if((props.form_items).length > 0)
            props.getFields('?ordering=position&form='+props.form_items[0].id).then(() => {})
    },[props.form_items])

    let addChangeHandler = (event,name) =>{
        const { value } = event.target;
        let sepIndex = (name).indexOf('.')
        if(sepIndex !== -1)
        {
            let outerKey = name.substring(0, sepIndex)
            let innerKey = name.substring(sepIndex+1, name.length)
            if(formData[outerKey] != undefined)
            {
                setFormData(formData => ({ ...formData, [outerKey]: {...formData[outerKey],[innerKey]:value} }))
            }else{
                setFormData(formData => ({ ...formData, [outerKey]: {[innerKey]:value} }))
            }
        }else{
            setFormData(formData => ({ ...formData, [name]: value }))
        }
    }

    let editChangeHandler = (event,name) =>{
        const { value } = event.target;
        let sepIndex = (name).indexOf('.')
        if(sepIndex !== -1)
        {
            let outerKey = name.substring(0, sepIndex)
            let innerKey = name.substring(sepIndex+1, name.length)
            if(formData[outerKey] != undefined)
            {
                setFormData(formData => ({ ...formData, [outerKey]: {...formData[outerKey],[innerKey]:value} }))
                setUpdateData(updateData => ({ ...updateData, [outerKey]: {...updateData[outerKey],[innerKey]:value} }))
            }else{
                setFormData(formData => ({ ...formData, [outerKey]: {[innerKey]:value} }))
                setUpdateData(updateData => ({ ...updateData, [outerKey]: {[innerKey]:value} }))
            }
        }else{
            setFormData(formData => ({ ...formData, [name]: value }))
            setUpdateData(updateData => ({ ...updateData, [name]: value }))
        }
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

    const groupByMake = (arr = []) => {
        let result = [];
        if(arr.length > 0 ){
            result = arr.reduce((r, a) => {
            r[a.panel] = r[a.panel] || [];
            r[a.panel].push(a);
            return r;
            }, Object.create(null))};
        return result;
     };

    let grouped_items = groupByMake(props.field_items)

    let FormSkelton = Object.keys(grouped_items).map((fieldGrp,inx)=>{
        return (
        <React.Fragment key={inx}>
            {grouped_items[fieldGrp].map((field,indx)=>{
                let heading = ((field.name).charAt(0)).toUpperCase() + ((field.name).slice(1)).replace('_',' ')
                let dataMap = manageFieldData(formData,field)
                let fieldName = field.field
                let fieldWdth = field.type === 'multi-line' ? '75%' : '25%'
                if(fieldName =='' || fieldName == null)
                    fieldName = field.name
                if(fieldName=='entity' && dataMap == '1')
                    dataMap='Individual'
                if(fieldName=='entity' && dataMap == '2')
                    dataMap='Company'
                return (
                    <React.Fragment key={indx}>
                        <Label label={heading} class='col-md-3 formLabel' parentClass='fieldRtl'/>
                        {props.formMode === 'view'?
                            <Label label={dataMap} class='col-md-3 formValue' parentClass='' />:
                        props.formMode === 'edit'?
                            <div className='fieldWrap' style={{width:fieldWdth}}>
                                <Input label={''} type={field.type} class='col-md-3 formInput'  value={dataMap} onChange={(event)=>{editChangeHandler(event,fieldName)}} />
                            </div>:
                            <div className='fieldWrap' style={{width:fieldWdth}}>
                                <Input label={''} type={field.type} class='col-md-3 formInput' value={formData[fieldName]} onChange={(event)=>{addChangeHandler(event,fieldName)}} />
                            </div> }
                    </React.Fragment>)
            })}
            <div>
                <hr style={{width:'100%'}}></hr>
            </div>
        </React.Fragment>)
    })

    let iconStage = formData.stage != undefined ?  formData.stage.stage:'no'

    return (
        <Wrapper>
            {props.formMode === 'edit' ?
                <FormHeader recordID={props.recordID} changeMode={props.changeMode} formMode={props.formMode} 
                            recControl={(formID)=>{props.loadFormData(formID)}} saveRecord = {()=>props.updateRecord(updateData)}/>:
                <FormHeader recordID={props.recordID} changeMode={props.changeMode} formMode={props.formMode} 
                            recControl={(formID)=>{props.loadFormData(formID)}} saveRecord = {()=>props.saveRecord(formData)}/>}

            <Card top={20}>
                <i className={props.icon+' fa-4x'} style={{color:iconColor[iconStage]}}></i>
                <label style={titleStyle}>{formData['name']}</label><br></br><br></br>
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