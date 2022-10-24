import React from 'react';
export const IndividualData = ({ individuaLExcelData }) => {
        
    console.log(individuaLExcelData);
    return (
        <> 
         <td>{individuaLExcelData.name}</td>
         <td>{individuaLExcelData.email}</td>
         <td>{individuaLExcelData.gender}</td>
         <td>{individuaLExcelData.age}</td>
         <td>{individuaLExcelData.grade}</td>
         <td>{individuaLExcelData.group}</td>
         <td>{individuaLExcelData.year}</td>
         <td>{individuaLExcelData.password}</td>
        </>
    )
}
