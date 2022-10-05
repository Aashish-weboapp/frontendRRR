import  '../../styles/components/Table.css'


function Table(props) {

  let colorOptions = {"0":'red',"1":'blue',"2":'green'}

  let viewRecord = (record) =>{
    props.changeMode('view')
    loadRecord(record)
  }

  let loadRecord = (record) =>{
    props.loadFormData(record.id)
  }

  let tableHeaders = props.headers != undefined ? 
      props.headers.map((header, idx) => {
      let heading = header
      if(props.headerType==='Json'){
        heading = ((header.column).charAt(0)).toUpperCase() + ((header.column).slice(1)).replace('_',' ')
      }
      return (
          <th key={idx} className={"table-header"}>
              <i id="headerIcons"  style={{ paddingRight: 5 }} />{heading}
          </th>
      )
  }) : <></>

  let statusHeader = props.status === true ? 
                    (<th className={"table-header"}>
                              <i id="headerIcons"  style={{ paddingRight: 5 }} />Status
                    </th>) :
                    <></>

  let defaultHeaders = props.default === true ? 
                    (<th className={"table-header"}>
                              <i id="headerIcons"  style={{ paddingRight: 5 }} />Default
                    </th>) :
                    <></>
                    
  let tableRows = props.rows != undefined ? 
    props.rows.map((data, idx) => {
    return (
      <>
        <tr className='table-row ' key={idx} style={{ cursor: 'pointer' }}>
          {props.default === true?
            <td key=''>
              <input type='checkbox' style={{marginLeft:20}}/>
            </td>:<></>}
          {props.headers.map((header, indx) => {
            let sepIndex = (header.field).indexOf('.')
            let dataMap = data[header.field]
            if(sepIndex != -1)
              {
                dataMap = data[(header.field).substring(0, sepIndex)]
                if(dataMap != null)
                  dataMap = dataMap[(header.field).substring(sepIndex+1, header.field.length)]
              }
            return <td key={indx} style={{paddingLeft:10}} onClick={()=>{viewRecord(data)}} >{dataMap}</td>
          })}
          {props.status === true?
            <td key=''>
              <i className='fas fa-circle' style={{'color':colorOptions[data['status']],paddingLeft:20}}/>
            </td>:<></>}
        </tr>
      </> 
    )
  }) : <tr cols={5} style={{ cursor: 'pointer', textAlign:'center' }}></tr>

  let emptyRows = props.addMode == true ? 
        <tr className='table-row ' style={{ cursor: 'pointer' }}>
          {props.default === true?
            <td key=''>
              <input type='checkbox' style={{marginLeft:20}}/>
            </td>:<></>}
          {props.headers.map((header, indx) => {
            return <td key={indx} style={{paddingLeft:10}} onClick={()=>{}} ><input type='text'/></td>
          })}
        </tr> : <></>

  return (
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
    </table>
  );
}

export default Table; //<td><input type='checkbox' /></td>
