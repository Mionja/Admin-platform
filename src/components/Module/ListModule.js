import React , {useState,useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'

function ListModule(props) {
  let [data,setData] = useState ([]);

  const deleteModule = (id)=>{
    //here, we don't delete the module but put it in the historic
  }

  useEffect (() =>{
      fetch(`http://localhost:8000/api/module/list/${props.grade}/${props.year}`).then((res)=>{
          return res.json()
      }).then((data)=>{
        //console.log(data.list_module)
        setData(data.list_module)
      })
},[props.grade, props.year]);


return (
   
      <div>
            <h1 align = 'center' className="mt-3 mb-5">Les listes de module des {props.grade}</h1>

            <Link to={'/addModule'}>
              <button className="btn btn-info float-right mr-5">Ajouter une module</button>
            </Link>
            <table class="table table-striped table-hover">
            <thead class="thead-dark">
            <tr>
            <td>Nom</td>
            <td>Code</td>
            <td>Coef</td>
            <td>Heure</td>
            <td colSpan={2}></td>
            </tr>
            </thead>
            <tbody>
              
                    {data.map((data)=>{
                    return( 
                    <tr key={data.module.id}>
                    <td>
                    <Link to={`/detailModule/${data.module.id}`} className='h6 text-dark'>
                          {data.module.name}
                    </Link>
                      </td>
                    <td>{data.module.code}</td>
                    <td>{data.module.credits}</td>
                    <td>{data.module.hour}</td>
                    <td>
                      <Link to={`/editModule/${data.module.id}`}  className='text-primary'>Modifier</Link>
                      {/* <a href="/editModule/{data.module.id}" className='btn btn-warning ml-5'>Edit</a> */}
                      </td>
                      <td>
                      <a href='#' onClick={()=>deleteModule(data.module.id)}  className='text-danger'>Supprimer</a>
                      </td>
                    </tr>
                    )
                })}
                </tbody>
                </table>
    </div>
  )
}

export default ListModule
