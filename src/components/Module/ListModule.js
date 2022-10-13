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
            <h1 align = 'centre'>Les listes des modules</h1>
            <Link to={'/addModule'}>
              <button className="btn btn-info float-right mr-5">Ajouter une module</button>
            </Link>
            <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
            <td>Nom</td>
            <td>code</td>
            <td>Heure</td>
            <td colSpan={2}></td>
            </tr>
            </thead>
            <tbody>
              
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
