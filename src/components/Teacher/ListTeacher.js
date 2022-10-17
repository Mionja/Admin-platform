import axios from 'axios';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import List from './List';

function   Table (){
    const [data,setData] = useState ([]);

    useEffect (() =>{
     axios
    .get ('http://localhost:8000/api/teacher').then((res)=>{
        setData(res.data)
    })
    },[]);
    console.log(data);
    return (
        <div>
            <h1 align = 'center' className='mt-3'>Les listes des Professeurs</h1>
            <Link to={'/addTeacher'}>
                <button className="btn btn-info float-right mr-5">Ajouter un Professeur</button>
            </Link>
            <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
            <td>Nom</td>
            <td>Email</td>
            <td></td>

            </tr>
            </thead>
            <tbody>
                {data &&  data.map((prof)=>{
                    // var test =   prof.teacher.modules.map((m)=>{
                    //     <>
                    //         <span>{m.code}</span>
                    //     </>})
                    return(
                    <tr key={prof.teacher.id}>
                        <td>{prof.teacher.name}</td>
                        <td>{prof.teacher.email}</td>
                        <td><button className='text-primary'>Modifier</button></td>
                    </tr>)
                })
                
                }
                

            </tbody>
            </table>
        </div>

    )
} 



export default Table;
