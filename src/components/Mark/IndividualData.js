import React from 'react';
export const IndividualData = ({ individuaLExcelData }) => {
        
    console.log(individuaLExcelData);
    return (
        <> 
         <td>{individuaLExcelData.email}</td>
         <td>{individuaLExcelData.grade}</td>
         <td>{individuaLExcelData.group}</td>
         <td>{individuaLExcelData.module}</td>
         <td>{individuaLExcelData.score}</td>
         <td>{individuaLExcelData.year}</td>
         <td>{individuaLExcelData.semester}</td>
        </>
    )
}
