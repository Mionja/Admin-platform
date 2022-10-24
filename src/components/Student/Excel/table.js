import React from 'react' ;
import {IndividualData} from"./IndividualData";


export const Data = ({excelData}) => {
  console.log('excelData',excelData);
  return excelData.map((individuaLExcelData) =>(
  <tr key={individuaLExcelData.Id}>
      <IndividualData individuaLExcelData={individuaLExcelData}/>
  </tr>
  ))
} 