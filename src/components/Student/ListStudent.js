import React , {useState,useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


function Student (props)
{

    let [graph, setGraph] = useState('')
    let[isLoadingGraph, setIsLoadingGraph] = useState(true)
    const [data,setData] = useState ([]);
    const [group,setGroup] = useState ("");
    let [gender, setGender] = useState("");
    const history = useNavigate();
    let [year, setYear] = useState('LX'+props.school_year)
    console.log(year);
    const delteStudent = (id)=>{
        fetch(`http://localhost:8000/student/${id}`, {
            method: 'DELETE'
        }).then(() => {
            alert('Un etudiant supprimé')
            history.push('/student');
        }) 
    }

    useEffect (() =>{
        axios.all([
            axios.get (`http://localhost:8000/api/student/list/${props.grade}/${props.school_year}`)
            .then((res)=>{setData(res.data)   }),

            axios.get (`http://127.0.0.1:8000/api/student/general/average_point/${props.grade}/${props.school_year}`)
            .then((res)=>{
                setIsLoadingGraph(true)
                setTimeout(() => 
                {
                    console.log('ee', res.data);
                    setGraph(res.data);
                    setIsLoadingGraph(false)    
                }, 2000)
            })
        ])
        
    },[props.grade, props.school_year]);


var Fdata = data;
// var list_module = module.list_module;
// console.log(module.list_module);
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
             <h2 className="text-center mt-4">
                LISTE DES ETUDIANT EN {props.grade} ({props.school_year - 1} - {props.school_year })
                <Link to={`/addMark/${props.grade}/${props.school_year}`} className="text-primary ml-5 h6">
                    Ajouter note
                </Link>

                <Link to={'/addStudent'} className="text-primary ml-5 h6">
                    Ajouter un etudiant
                </Link>
                {
                    (isLoadingGraph) ? <p>Loading...</p> : 

                    (graph.message === 'Fail')?'': 
                    <Link to={`/pass/${props.grade}/${props.school_year}`} className="btn btn-danger ml-5 h6">
                        Afindra classe
                    </Link>
                }
            </h2>
            <hr/>

            <div  className="mt-3 container">
                <form>
                    <label className="mr-3 h5">Rechercher: </label> 
                    <select
                    className="mr-2 h6"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    >
                    <option value="" className="pt-2 pb-2 "> -- Groupe --</option>    
                    { (props.grade == 'L1') ?
                    <>
                        <option value="G1">Groupe 1</option>
                        <option value="G2">Groupe 2</option>
                    </>
                    :
                    <>
                        <option value="RSI">RSI</option>
                        <option value="IDEV">IDEV</option>
                    </>
                    }
                    </select>

                    <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    >
                    <option value=""> -- Genre -- </option>
                    <option value="F">Fille</option>
                    <option value="M">Garçon</option>
                
                    </select>
                </form>

                <table className="table border ml-5 mt-5" style={{width:80+"%"}}>
                <thead>
                
                        <th className="text-center">Nom</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Groupe</th>
                        <th className="text-center" colSpan={2}></th>
                </thead>    
                <tbody>
                    {Fdata.map((students)=>{
                    return(
                    <tr key={students.student.id}>
                    <td  className="text-center" >
                        <Link to={`/detailStudent/${students.student.id}`}  className='h6'>
                            {students.student.name}
                        </Link>
                    </td>
                    <td  className="text-center" >{students.student.email}</td>
                    <td  className="text-center" >{students.group}</td>
                    <td>
                        <Link to={`/editStudent/${students.student.id}`} 
                        className="btn btn-sm btn-warning">Modifier</Link>
                    </td>
                    <td><button className="btn btn-sm btn-danger"
                    onClick={()=>delteStudent(students.student.id)}>Supprimer</button></td>
                    </tr>)
                })}
                </tbody>
                </table>  
            </div>
        </div>
    );
}
export default Student;