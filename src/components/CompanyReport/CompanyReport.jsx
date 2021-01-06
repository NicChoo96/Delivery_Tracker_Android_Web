import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const CompanyReport = ({ contractorArray }) => {
  const [countedContractorData, setCountedContractorData] = useState([]);

  useEffect(() => {
    const contractorNameMap = new Map();
    contractorArray.map((name) => {
      contractorNameMap.set(
        name,
        contractorNameMap.has(name)
          ? contractorNameMap.get(name) + 1
          : 1
      );
      return null;
    });

    let counterForId = 0;
    const outputArray = Array.from(contractorNameMap).map((value) => {
      return {
        name: value[0],
        count: value[1],
        id: counterForId++
      }
    });

    setCountedContractorData(outputArray);
  }, [contractorArray]);

  const columns = [
    { field: 'name', headerName: 'Company Name', width: 200 },
    { field: 'count', headerName: 'Jobs Done', width: 200 },
  ];

  const rows = countedContractorData;
  return (
    <>
      <p>This is a simple report that shows the number of jobs done by each company</p>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div>
    </>);
}

export default CompanyReport;
