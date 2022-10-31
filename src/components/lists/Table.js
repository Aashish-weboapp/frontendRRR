import { useState } from 'react'
import  '../../styles/components/Table.css'


function Table(props) {

  let colorOptions = {'0':'green','1':'red','2':'yellow','no':'black'}
  const [rowValue,setRowValue] = useState({})

  let viewRecord = (record) =>{
    props.changeMode('view')
    loadRecord(record)
  }

  let loadRecord = (record) =>{
    props.loadFormData(record.id)
  }

  let pushRow = (row) =>{
    props.pushRow(row)
    setRowValue({})
  }

  let changeHandler = (event,name) =>{
    const { value } = event.target;
    setRowValue(rowValue => ({ ...rowValue, [name]: value }))
  } 

  let tableHeaders = props.headers != undefined ? 
      props.headers.map((header, idx) => {
      let heading = header
      if(props.headerType==='Json'){
        heading = ((header.label).charAt(0)).toUpperCase() + ((header.label).slice(1)).replace('_',' ')
      }
      return (
          <th key={idx} className={"table-header"}>
            {heading}
          </th>
      )
  }) : <></>

  let statusHeader = props.status === true ? 
                    (<th className={"table-header"}>
                        Status
                    </th>) :
                    <></>

  let defaultLabel= <input type='checkbox' style={{marginLeft:10}}/>

  let defaultHeaders = props.default === true ? 
                    (<th className={"table-header"} onClick={()=>{}}>
                      {defaultLabel}
                    </th>) :
                    <></>
                    
  let tableRows = props.rows != undefined ? 
    props.rows.length > 0 ?
      props.rows.map((data, idx) => {
      return (
        <>
          <tr className='table-row ' key={idx} style={{ cursor: 'pointer' }}>
            <td key={'check'+idx}>  
              <input type='checkbox' style={{marginLeft:10}}/>
            </td>
            {props.headers.map((header, indx) => {
              let sepIndex = (header.column).indexOf('.')
              let dataMap = data[header.column]
              if(sepIndex != -1)
                {
                  dataMap = data[(header.column).substring(0, sepIndex)]
                  if(dataMap != null)
                    dataMap = dataMap[(header.column).substring(sepIndex+1, header.column.length)]
                }
              return <td key={indx}  onClick={()=>{viewRecord(data)}} >{dataMap}</td>
            })}
            {props.status === true?
              <td key={'status-'+idx}>
                <i className='fas fa-circle' style={{'color':colorOptions[data['status']],paddingLeft:20}}/>
              </td>:<></>}
          </tr>
        </> 
      )
    }) : <></>:
    <></>

  let emptyRows = props.addMode == true ? 
        <tr className='table-row ' key={'add'} style={{ cursor: 'pointer' }}>
          {props.default === true?
            <td key=''>
              <input type='checkbox' style={{marginLeft:20}}/>
            </td>:<></>}
          {props.headers.map((header, indx) => {
            return <td key={indx} style={{paddingLeft:10}} onClick={()=>{}} >
              <input type='text' value={rowValue[header.column]} onChange={(event)=>{changeHandler(event,header.column)}} /></td>
          })}
          <i className='fas fa-check fa-2x' style={{paddingTop:3}} onClick={()=>{pushRow(rowValue)} } />
          <i className='fas fa-close fa-2x' style={{paddingLeft:10,paddingTop:3}} onClick={()=>{props.removeRow()} } />
        </tr> : <></>

  return (
    <>
    {props.visible === true?
      <table id={props.id}>
        <thead>
          <tr>
            {defaultHeaders}
            {tableHeaders}
            {statusHeader}
          </tr>
        </thead>
        <tbody>
          {tableRows}
          {emptyRows}
        </tbody>
      </table>:
     <></>}
    </>
  );
}

export default Table; //<td><input type='checkbox' /></td>
