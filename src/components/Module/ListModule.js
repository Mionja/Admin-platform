import React , {useState,useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'

function ListModule() {
  let [data,setData] = useState ([]);
  const grade = 'L1';

  useEffect (() =>{
  //   axios.all(
  //     [
  //      axios.get (`http://localhost:8000/api/module/list/${grade}`).then((res)=>{setData(res.data)   })       
  //     ]
  // )
      fetch(`http://localhost:8000/api/module/list/${grade}`).then((res)=>{
          return res.json()
      }).then((data)=>{
        //console.log(data.list_module)
        setData(data.list_module)
      })
},[]);


return (
    <div>
      <a href="/" className='btn btn-dark text-center'>Dashboard</a>
      <h1>LIST OF MODULES</h1>
      <table className="table border ml-5 mt-5" style={{width:80+"%"}}>
                <thead>
                    <tr className="mt-2 mb-3" style={{float:"right"}}>
                    <a href="/addModule"  className='btn btn-info'>Add module</a>
                    </tr>
                </thead>    
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>code</td>
                        <td>hour</td>
                        <td colSpan={2}></td>
                    </tr>
              
                    {data.map((data)=>{
                    return( 
                    <tr key={data.module.id}>
                    <td>{data.module.name}</td>
                    <td>{data.module.code}</td>
                    <td>{data.module.hour}</td>
                    <td>
                      <Link to={`/editModule/${data.module.id}`}  className='btn btn-warning ml-5'>Edit</Link>
                      {/* <a href="/editModule/{data.module.id}" className='btn btn-warning ml-5'>Edit</a> */}
                      </td>
                    <td><button className="btn btn-sm btn-danger">Delete</button></td>
                    </tr>
                    )
                })}
                </tbody>
                </table>
    </div>
  )
}

export default ListModule
