import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';


function Result(props) {
  let [data,setData] = useState ([]);
  if (props.grade === 'L1') {
    var G1 = data;
    var G2 = data;

    G1 = data.filter(data => ( data.data.group === 'G1'));
    G1 = [...G1].sort((a, b)=>(a.data.average_point.data > b.data.average_point.data ? -1:1))

    G2 = data.filter(data => ( data.data.group === 'G2'));
    G2 = [...G2].sort((a, b)=>(a.data.average_point.data > b.data.average_point.data ? -1:1))
  }
  else{
    var RSI = data;
    var IDEV = data;
  
    RSI = data.filter(data => ( data.data.group === 'RSI'));
    RSI = [...RSI].sort((a, b)=>(a.data.average_point.data > b.data.average_point.data ? -1:1))

    IDEV = data.filter(data => ( data.data.group === 'IDEV'));
    IDEV = [...IDEV].sort((a, b)=>(a.data.average_point.data > b.data.average_point.data ? -1:1))
  }

  useEffect(() => {
      axios.get (`http://localhost:8000/api/student/average-point/${props.grade}/${props.year}`)
      .then((res)=>{
          console.log('data',res.data);
          setData(res.data);
        })       
}, [props.grade, props.year])   


  return (
    <div>
        <div className="row mt-4">
            <div className="col-3"></div>
            <Link to={`/result/semester/1/${props.year}/${props.grade}`} className="btn btn-outline-dark col-3 mr-3">
            Semestre 1
            </Link>
            <Link to={`/result/semester/2/${props.year}/${props.grade}`} className=" ml-3 btn btn-outline-dark col-3">
            Semestre 2
            </Link>
        </div>
        <hr/>
      {
            (data.message === 'Fail') ? <p>Fail </p> :
            <div className='mt-5 mb-5'>
              <div className="container">
                  <b className='ml-3' style={{color: 'black'}}>
                     Résultat des élèves en {props.grade} ({props.year - 1}-{props.year})
                  </b>
                  {
                    (props.grade === 'L1') ? 
                    <h2 className="bg-dark text-light text-center mt-2">Goupe 1</h2>:
                    <h2 className="bg-dark text-light text-center mt-2">RSI</h2>
                  }

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
                        (props.grade === 'L1') ? 
                        G1.map((data)=>{
                        return(
                            <tr key={data.data.student.id}>
                                <td className='text-center'>
                                    <Link to={`/detailStudent/${data.data.student.id}`}  className='h6'>
                                        {data.data.student.name}
                                    </Link>
                                </td>
                                <td className='text-center'>
                                {
                                    (data.data.average_point.data < 10) ?
                                    <code style={{color: 'red'}}>{data.data.average_point.data}</code>
                                    : data.data.average_point.data
                                }
                                </td>
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
                                  <td className='text-center'>
                                  {
                                    (data.data.average_point.data < 10) ?
                                    <code style={{color: 'red'}}>{data.data.average_point.data}</code>
                                    : data.data.average_point.data
                                  } 
                                   </td>
                                  <td className='text-center'>{data.data.retake_module} - </td>
                              </tr>)
                          })
                      }
                        

                      </tbody>
                  </table>

                  {
                    (props.grade === 'L1') ? 
                    <h2 className="bg-dark text-light text-center mt-5">Goupe 2</h2>:
                    <h2 className="bg-dark text-light text-center mt-5">IDEV</h2>
                  }

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
                        (props.grade === 'L1') ? 
                        G2.map((data)=>{
                        return(
                            <tr key={data.data.student.id}>
                                <td className='text-center'>
                                    <Link to={`/detailStudent/${data.data.student.id}`}  className='h6'>
                                        {data.data.student.name}
                                    </Link>
                                </td>
                                <td className='text-center'>{
                                    (data.data.average_point.data < 10) ?
                                    <code style={{color: 'red'}}>{data.data.average_point.data}</code>
                                    : data.data.average_point.data
                                }</td>
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
                                  <td className='text-center'>{
                                    (data.data.average_point.data < 10) ?
                                    <code style={{color: 'red'}}>{data.data.average_point.data}</code>
                                    : data.data.average_point.data
                                }</td>
                                  <td className='text-center'>{data.data.retake_module} - </td>
                              </tr>)
                          })
                      }
                        

                      </tbody>
                  </table>
 
              </div>
            </div>
      }
    </div>
  )
}

export default Result
