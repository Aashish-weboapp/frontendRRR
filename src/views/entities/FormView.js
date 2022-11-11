import React , {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';

import {  getFormData,
          getFields } from '../../actions/system'

import { Card , Wrapper , Input , Label, FormHeader, Table, ListHeader, TableHeader } from '../../components'
import SubListView from './SubListView';

function FormView(props) {

    const [form_info,setFormInfo] = useState({})
    const [formData,setFormData] = useState({})
    const [updateData,setUpdateData] = useState({})

    let iconColor ={'Normal':'#50C878','Urgent':'#F75D59','Warning':'yellow','no':'black'}

    let titleStyle={
        fontWeight:'bold',
        fontSize:33,
        marginLeft:20
        
      }

    useEffect(()=>{
        if((props.listForm).length > 0)
        {
            props.getFormData(props.listForm[0].form.id).then(() => {})
        }
    },[props.listForm])

    useEffect(()=>{
        if((props.listForm).length > 0){
            setFormInfo(props.form_info)
        }else{
            setFormInfo({})
        }
        
    },[props.form_info])

    useEffect(()=>{
        if(Object.keys(props.dataObj).length !== 0)
        {
            setFormData(props.dataObj)
            if(props.dataObj.id != undefined)
                setUpdateData({id:props.dataObj.id})
        }
    },[props.dataObj])

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

    let manageFieldData = (dataObj,field,fieldType) =>{
        let fieldKey = field.field
        if(field.data===""||field.data===null)
            fieldKey=field.label
        let sepIndex = (fieldKey).indexOf('.')
        let dataMap = ''
        if(fieldType=='composite')
        {
            let compFields = fieldKey.split('+')
            compFields.map((field,indx)=>{
                if(dataObj[field]!= null && dataObj[field] != '')
                    dataMap = dataObj[field] + ' '
            })
            
        }else{
            dataMap = dataObj[fieldKey]
        }
        if(sepIndex !== -1)
        {
            dataMap = dataObj[(fieldKey).substring(0, sepIndex)]
            if(dataMap != null)
                dataMap = dataMap[(fieldKey).substring(sepIndex+1, fieldKey.length)]
        }
        return dataMap
    }

    //Comparer Function    
    let GetSortOrder = (key,nkey) => {    
        return function(a, b) {
            if(a[key] != null && b[key] != null)
            { 
                if (a[key][nkey] > b[key][nkey]) {  
                    return 1;    
                } else if (a[key][nkey] < b[key][nkey]) {    
                    return -1;    
                }
            }
            return 0;    
        }   
    }

    const groupByMake = (arr = [],key,key2) => {
        arr.sort(GetSortOrder('section','section_sequence'))
        let result = [];
        if(arr.length > 0 ){
            result = arr.reduce((r, a) => {
            let divider = a[key]
            if (key2 != '' && key2 != null && a[key] != null){
                divider = a[key][key2]
            }
            r[divider] = r[divider] || [];
            r[divider].push(a);
            return r;
            }, Object.create(null))};
        return result;
     };

    let grouped_items = groupByMake(form_info.form_data,'section','section_title')


    let FormSkelton = Object.keys(grouped_items).map((fieldGrp,inx)=>{
        let column_grouped = groupByMake(grouped_items[fieldGrp],'column','')
        return (
        <div className='row' key={inx}>
            {fieldGrp != null && fieldGrp != undefined  && fieldGrp != 'null'? 
                <div className='row'>
                    <label className='section'><i>{fieldGrp}</i><span class="line"></span></label>
                </div>:
                <></>}
            {Object.keys(column_grouped).map((columnGrp,indx)=>{
                return(
                <div className='col-6' key={'column-'+indx}>
                    {column_grouped[columnGrp].map((columnField,inddx)=>{
                    
                      let heading = ((columnField.label).charAt(0)).toUpperCase() + ((columnField.label).slice(1)).replace('_',' ')
                      let dataMap = manageFieldData(formData,columnField,columnField.type)
                      let fieldName = columnField.field
                      let fieldWdth = '25%'
                      if(fieldName =='' || fieldName == null)
                          fieldName = columnField.data
                      if(fieldName=='entity' && dataMap == '1')
                          dataMap='Individual'
                      if(fieldName=='entity' && dataMap == '2')
                          dataMap='Company'
                      return (
                          <React.Fragment key={columnField.id}>
                              <Label label={heading} class='col-md-3 formLabel' parentClass='fieldRtl'/>
                              {props.formMode === 'view'?
                                  <Label label={dataMap} class='col-md-3 formValue' parentClass='' />:
                              props.formMode === 'edit'?
                                  <div className='fieldWrap' style={{width:fieldWdth}}>
                                      <Input label={''} type={columnField.type} class='col-md-3 formInput' choices={columnField.choices}  value={dataMap} onChange={(event)=>{editChangeHandler(event,fieldName)}} />
                                  </div>:
                                  <div className='fieldWrap' style={{width:fieldWdth}}>
                                      <Input label={''} type={columnField.type} class='col-md-3 formInput' choices={columnField.choices} value={formData[fieldName]} onChange={(event)=>{addChangeHandler(event,fieldName)}} />
                                  </div>}
                          </React.Fragment>)   
                    })}
            </div>)})}
        </div>)
    })

    let iconStage = formData.stage != undefined ?  formData.stage.stage:'no'

    let formLists = form_info.form_list != undefined ? form_info.form_list.filter(formList=>formList.relation != 'parent') : []

    return (
        <Wrapper>
            {props.formMode === 'edit' ?
                <FormHeader recordID={props.recordID} changeMode={props.changeMode} formMode={props.formMode} 
                            recControl={(formID)=>{props.loadFormData(formID)}} saveRecord = {()=>props.updateRecord(updateData)}/>:
                <FormHeader recordID={props.recordID} changeMode={props.changeMode} formMode={props.formMode} 
                            recControl={(formID)=>{props.loadFormData(formID)}} saveRecord = {()=>props.saveRecord(formData)}/>}

            <Card top={20} style={{minHeight:'200px'}}>
                {props.icon != undefined && props.icon != ''?
                    <i className={props.icon+' fa-4x'} style={{color:iconColor[iconStage]}}></i>:
                    <></>}
                <label style={titleStyle}>{formData['name']}</label><br></br><br></br>
                {FormSkelton}
            </Card>
            {formLists.map((formList,indx)=>{
                let columns = formList.list != null ? formList.list.columns : []
                let label = formList.list != null ? formList.list.label : ''
                let rows = props.lists.length != undefined ? props.lists.filter(record=>record.type==formList.relation):[] 
                return <React.Fragment key={indx}>
                            <SubListView title={label} changeMode={props.changeMode} tableMode={props.formMode}
                                        loadFormData={props.loadFormData} headers={columns} type={formList.relation}
                                        icon = {formList.icon}
                                        loadList={props.loadList} rows={rows}/>
                       </React.Fragment>
            })}
          </Wrapper>
    );
}

const mapStateToProps = state => {
    return {
        form_info: state.sysData.form_info,
        field_items:state.sysData.field_items,
        listForm:state.sysData.listForm
    };
  };
  
const mapDispatchToProps = {
    getFormData,getFields
   
}
  
export default connect(mapStateToProps,mapDispatchToProps)(FormView);