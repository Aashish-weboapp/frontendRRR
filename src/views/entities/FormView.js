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
        props.getFormData(props.form_id).then(() => {})
    },[])

    useEffect(()=>{
        setFormInfo(props.form_info)
    },[props.form_info])

    useEffect(()=>{
        if(Object.keys(props.dataObj).length !== 0)
        {
            setFormData(props.dataObj)
            if(props.dataObj.id != undefined)
                setUpdateData({id:props.dataObj.id})
        }
    },[props.dataObj])

    //only for ordering purpose
    //useEffect(()=>{
        //if(props.form_data !=undefined && props.form_data != null )
            //props.getFields('?ordering=position&form='+props.form_data.id).then(() => {})
    //},[props.form_data])

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
        let fieldKey = field.data
        if(field.data===""||field.data===null)
            fieldKey=field.label
        let sepIndex = (field.data).indexOf('.')
        let dataMap = dataObj[field.data]
        if(sepIndex !== -1)
        {
            dataMap = dataObj[(field.data).substring(0, sepIndex)]
            if(dataMap != null)
                dataMap = dataMap[(field.data).substring(sepIndex+1, field.data.length)]
        }
        return dataMap
    }

    const groupByMake = (arr = [],key,key2) => {
        let result = [];
        if(arr.length > 0 ){
            result = arr.reduce((r, a) => {
            let divider = a[key]
            if (key2 != '' && key2 != null){
                divider = a[key][key2]
            }
            r[divider] = r[divider] || [];
            r[divider].push(a);
            return r;
            }, Object.create(null))};
        return result;
     };

     function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }

    let grouped_items = groupByMake(form_info.form_data,'section','section_title')

    let FormSkelton = Object.keys(grouped_items).map((fieldGrp,inx)=>{
        let column_grouped = groupByMake(grouped_items[fieldGrp],'column','')
        return (
        <div className='row' key={inx}>
            <div className='row'>
                <label className='section'><i>{fieldGrp}</i><span class="line"></span></label>
            </div>
            {Object.keys(column_grouped).map((columnGrp,indx)=>{
                return(
                <div className='col-6'>
                    {column_grouped[columnGrp].map((columnField,inddx)=>{
                    
                      let heading = ((columnField.label).charAt(0)).toUpperCase() + ((columnField.label).slice(1)).replace('_',' ')
                      let dataMap = manageFieldData(formData,columnField)
                      let fieldName = columnField.data
                      let fieldWdth = columnField.type === 'multi-line' ? '75%' : '25%'
                      if(fieldName =='' || fieldName == null)
                          fieldName = columnField.name
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
                                      <Input label={''} type={columnField.type} class='col-md-3 formInput' choices={columnField.choices}  value={dataMap} onChange={(event)=>{editChangeHandler(event,fieldName)}} />
                                  </div>:
                                  <div className='fieldWrap' style={{width:fieldWdth}}>
                                      <Input label={''} type={columnField.type} class='col-md-3 formInput' value={formData[fieldName]} onChange={(event)=>{addChangeHandler(event,fieldName)}} />
                                  </div>}
                          </React.Fragment>)   
                    })}
            </div>)})}
        </div>)
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
                <i className={props.icon+' fa-5x'} style={{color:iconColor[iconStage]}}></i>
                <label style={titleStyle}>{formData['name']}</label><br></br><br></br>
                {FormSkelton}
            </Card>
           {props.form_info.form_list != undefined?
                props.form_info.form_list.map((formList,indx)=>{
                    let columns = formList.list != null ? formList.list.columns : []
                    let label = formList.list != null ? formList.list.label : ''
                    return <SubListView title={label} changeMode={props.changeMode} tableMode={props.formMode}
                                        loadFormData={props.loadFormData} headers={columns} type={'Customer'}
                                        icon = {formList.icon}
                                        loadList={()=>{}} rows={[]}/>
                }):
            <></>}
          </Wrapper>
    );
}

const mapStateToProps = state => {
    return {
        form_info: state.sysData.form_info,
        field_items:state.sysData.field_items
    };
  };
  
const mapDispatchToProps = {
    getFormData,getFields
   
}
  
export default connect(mapStateToProps,mapDispatchToProps)(FormView);