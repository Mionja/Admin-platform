import React, {useState, useEffect,useRef} from "react";
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import logo from './../../assets/G_logo_esti.jpg'

function SemesterResult() {
    const {grade} = useParams('grade')
    const {year} = useParams('year')
    const {semester} = useParams('semester')
    
    
    const componentRef1 = useRef();
    const printData1 = useReactToPrint({
      content: () => componentRef1.current,
      documentTitle: "test",
      onafterprint: () => alert("print success"),
    });

    const componentRef2 = useRef();
    const printData2 = useReactToPrint({
      content: () => componentRef2.current,
      documentTitle: "test",
      onafterprint: () => alert("print success"),
    });

    let [data,setData] = useState ([]);
    if (grade === 'L1') {
        var G1 = data;
        var G2 = data;
    
        G1 = data.filter(data => ( data.data.group === 'G1'));
        G2 = data.filter(data => ( data.data.group === 'G2'));
    }
    else{
        var RSI = data;
        var IDEV = data;
    
        RSI = data.filter(data => ( data.data.group === 'RSI'));
        IDEV = data.filter(data => ( data.data.group === 'IDEV'));
    }

    useEffect(() => {
      axios.get (`http://localhost:8000/api/student/average-point-semester/${grade}/${year}/${semester}`)
      .then((res)=>{
          console.log('data',res.data);
          setData(res.data);
        })       
    }, [])   


  return (
    <div>
        {
            (data.message === 'Fail') ? <p>Fail </p> :
            <div className='mt-5 mb-5'>
              <div className="container" ref={componentRef1}>
                <img src={logo} alt="logo of the school" height={130+'px'} className='mb-5'/>
                <br/>
                  <b className='ml-3 h4' style={{color: 'black'}}>
                     RESULTAT SEMESTRE {semester} {grade}
                     {
                    (grade === 'L1') ? 
                    <>G1</>:
                    <>RSI</>
                    }
                  </b>
                  <span className="float-right h3">({year - 1}-{year})</span>

                  <table class="table table-bordered table-hover mt-3">
                      <thead>
                          <tr>
                              <th className='text-center'>Nom</th>
                              <th className='text-center'>Moyenne</th>
                              <th className='text-center'>Module(s) à rattraper </th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                        (grade === 'L1') ? 
                        G1.map((data)=>{
                        return(
                            <tr key={data.data.student.id}>
                                <td className='text-center'>
                                    <Link to={`/detailStudent/${data.data.student.id}`}  className='h6'>
                                        {data.data.student.name}
                                    </Link>
                                </td>
                                {
                                (data.data.average_point.data < 10) ? 
                                <td className="text-danger text-center">{data.data.average_point.data}</td>
                                : <td className='text-center'>{data.data.average_point.data}</td>
                                }
                                <td className='text-center'>{data.data.retake_module} - </td>
                            </tr>)
                        })
                        :
                        RSI.map((data)=>{
                          return(
                              <tr key={data.data.student.id}>
                                  <td className='text-center'>
                                      <Link to={`/detailStudent/${data.data.student.id}`}  className='h6'>
                                          {data.data.student.name}
                                      </Link>
                                  </td>
                                  {
                                (data.data.average_point.data < 10) ? 
                                <td className="text-danger text-center">{data.data.average_point.data}</td>
                                : <td className='text-center'>{data.data.average_point.data}</td>
                                }
                                  <td className='text-center'>{data.data.retake_module} - </td>
                              </tr>)
                          })
                      }
                        

                      </tbody>
                  </table>
                    <p className="mt-5 mb-5">.</p>
              </div>
              <div className="row mb-5 mt-4">
                <div className="col-4"></div>
                <button onClick={printData1} className="btn btn-dark text-center col-4 mb-5"> Télécharger en tant que pdf</button>  
              </div>

              <div className="container" ref={componentRef2}>
                <img src={logo} alt="logo of the school" height={130+'px'} className='mb-5'/>
                <br/>
                  <b className='ml-3 h4 mt-5' style={{color: 'black'}}>
                     RESULTAT SEMESTRE {semester} {grade}
                     {
                    (grade === 'L1') ? 
                    <>G2</>:
                    <>IDEV</>
                    }
                  </b>
                  <span className="float-right h3">({year - 1}-{year})</span>
                  <table class="table table-bordered table-hover mt-3 mb-5">
                      <thead>
                          <tr>
                              <th className='text-center'>Nom</th>
                              <th className='text-center'>Moyenne</th>
                              <th className='text-center'>Module(s) à rattraper </th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                        (grade === 'L1') ? 
                        G2.map((data)=>{
                        return(
                            <tr key={data.data.student.id}>
                                <td className='text-center'>
                                    <Link to={`/detailStudent/${data.data.student.id}`}  className='h6'>
                                        {data.data.student.name}
                                    </Link>
                                </td>
                                {
                                (data.data.average_point.data < 10) ? 
                                <td className="text-danger text-center">{data.data.average_point.data}</td>
                                : <td className='text-center'>{data.data.average_point.data}</td>
                                }
                                <td className='text-center'>{data.data.retake_module} - </td>
                            </tr>)
                        })
                        :
                        IDEV.map((data)=>{
                          return(
                              <tr key={data.data.student.id}>
                                  <td className='text-center'>
                                      <Link to={`/detailStudent/${data.data.student.id}`}  className='h6'>
                                          {data.data.student.name}
                                      </Link>
                                  </td>
                                  {
                                (data.data.average_point.data < 10) ? 
                                <td className="text-danger text-center">{data.data.average_point.data}</td>
                                : <td className='text-center'>{data.data.average_point.data}</td>
                                }
                                  <td className='text-center'>{data.data.retake_module} - </td>
                              </tr>)
                          })
                      }
                        

                      </tbody>
                  </table>
              </div>
              <div className="row mb-5 mt-4">
                <div className="col-4"></div>
                <button onClick={printData2} className="btn btn-dark text-center col-4 mb-5"> Télécharger en tant que pdf</button>  
              </div>
            </div>
      }
    </div>
  )
}

export default SemesterResult
