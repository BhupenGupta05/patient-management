import React from 'react'
import {AgGridReact} from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 


const Table = ({data, columnDefs, defaultColDef}) => {
  return (
    <div className='ag-theme-quartz' style={{ height: 500 }}>
        <AgGridReact 
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true} />
    </div>
  )
}

export default Table