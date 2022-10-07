import React , {useState,useEffect} from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';

function Student ()
{

 const [data,setData] = useState ([]);
 const [group,setGroup] = useState ("");
 const [gender,setGender] = useState ("");
 const grade = 'L1';
 const school_year = 2022;

    useEffect (() =>{
        if (gender == 'F' || gender == 'M') {
            axios
            .get (`http://localhost:8000/api/student/list/${grade}/${group}/${gender}/${school_year}`).then((res)=>{
               setData(res.data)   })
        }
        else{
            axios
            .get (`http://localhost:8000/api/student/list/${grade}/${school_year}`).then((res)=>{
               setData(res.data)   })
        }
    
    },[]);

var Fdata = data;
if (group !== '' && gender !== '') {
    Fdata = data.filter(data => ( data.group === group  && data.student.gender === gender ));   
}
else if (group !== '') {
    Fdata = data.filter(data => (data.group === group));   
}
else if (gender !== '') {
    Fdata = data.filter(data => (data.student.gender === gender));   
}

    return(
        <div>
            <div>
            <h2 className="text-center">LISTE DES ETUDIANT EN L1 </h2>
               
                <h3 className="mb-2">
                    <Link to={'dashboard'}>Dashboard</Link>
                </h3>
            </div>

            <div  className="mt-3">
            <form>
                <label>Search </label> 
                <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                >
                <option value="">--Group--</option>    
                <option value="G1">Group 1</option>
                <option value="G2">Group 2</option>
                </select>

                <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                >
                <option value="">--Gender--</option>
                <option value="F">Fille</option>
                <option value="M">Garçon</option>
               
                </select>
            </form>


                <table className="table border ml-5 mt-5" style={{width:80+"%"}}>
                <thead>
                    <div className="mt-2 mb-3" style={{float:"right"}}>
                        <Link to={'addStudent'} className="text-primary">+ Ajouter un etudiant</Link>
                    </div>
                </thead>    
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>email</td>
                        <td>age</td>
                        <td>gender</td>
                        <td>group</td>
                        <td colSpan={2}></td>
                    </tr>
                    {Fdata.map((students)=>{
                    return(
                    <tr key={students.student.id}>
                    <td>{students.student.name}</td>
                    <td>{students.student.email}</td>
                    <td>{students.student.age}</td>
                    <td>{students.student.gender}</td>
                    <td>{students.group}</td>
                    <td><button className="btn btn-sm btn-warning">Edit</button></td>
                    <td><button className="btn btn-sm btn-danger">Delete</button></td>
                    </tr>)
                })}
                </tbody>
                </table>
            </div>
        </div>
    );
}
export default Student;