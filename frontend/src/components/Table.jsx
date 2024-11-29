import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"

const Table = ({ data, columnDefs, defaultColDef }) => {
  return (
    <div className='ag-theme-quartz w-full overflow-x-auto'>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        domLayout="autoHeight"
        resizable={true} 
        suppressHorizontalScroll={false}
        suppressColumnVirtualisation={true} 
      />
    </div>
  )
}

export default Table;
