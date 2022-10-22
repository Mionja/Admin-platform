  import React, {useState, useEffect} from "react";
  import {Link} from 'react-router-dom'
  import axios from 'axios';
  import '../../assets/style.css';
  import ListMarks from './ListMarks'
    
function Marks(props) {

    let [data,setData] = useState ([]);
    var sup10 = data;
    var inf10 = data;
    sup10 = data.filter(data => ( data.data.average_point.data >= 10));
    inf10 = data.filter(data => ( data.data.average_point.data < 10));
  
    let[ graph, setGraph ] = useState([]);
    let[isLoadingGraph, setIsLoadingGraph] = useState(true)
    
    useEffect(() => {
        axios.all([
            axios.get (`http://localhost:8000/api/student/average-point/${props.grade}/${props.year}`)
            .then((res)=>{
                console.log('data',res.data);
                setData(res.data);
             }),  

             axios.get (`http://localhost:8000/api/student/data/graph-specific/${props.grade}/${props.year}`)
            .then((res)=>{
                setTimeout(() => {
                    console.log('graph', res.data);
                    setGraph(res.data);
                    setIsLoadingGraph(false)    
                }, 2000);
                
             })   
        ])   
    }, [props.grade, props.year])    
  

  return (
    <div>
        <h3 className='mb-5 mt-3 text-center'>Etudiants en {props.grade} ({props.year - 1}-{props.year})</h3>    
        <hr/>
        {
            (isLoadingGraph)? <h2>Loading...</h2>:
            <ListMarks data={graph}/>
        }
        {
            (data.message === 'Fail') ? <p>Fail </p> :
            <div className='mt-4'>
            <div>
                <b className='ml-3' style={{color: 'black'}}>
                    Liste des etudiants qui ont eu la moyenne:
                </b>

                <table class="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th className='text-center'>Nom</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Sexe</th>
                            <th className='text-center'>Groupe</th>
                            <th className='text-center'>Moyenne</th>
                            <th className='text-center'>Module(s) à rattraper </th>
                        </tr>
                    </thead>
                    <tbody>
                    {sup10.map((data)=>{
                    return(
                        <tr key={data.data.student.id}>
                            <td className='text-center'>
                                <Link to={`/detailStudent/${data.data.student.id}`}  className='h6'>
                                    {data.data.student.name}
                                </Link>
                            </td>
                            <td className='text-center'>{data.data.student.email}</td>
                            <td className='text-center'>
                            { data.data.student.gender ==='M'? "Masculin": "Feminin" }
                            </td>
                            <td className='text-center'>{data.data.group}</td>
                            <td className='text-center'>{data.data.average_point.data}</td>
                            <td className='text-center'>-{data.data.retake_module}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>

            <div className='mt-5'>
            <b  className='ml-3' style={{color: 'black'}}>Liste des etudiants qui n'ont pas eu la moyenne :</b>
                <table className="table table-hover mt-3">
                    <thead className='text-dark'>
                        <tr>
                        <th className='text-center'>Nom</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Sexe</th>
                            <th className='text-center'>Groupe</th>
                            <th className='text-center'>Moyenne</th>
                            <th className='text-center'>Module(s) à rattraper </th>
                        </tr>
                    </thead>
                    <tbody>
                    {inf10.map((data)=>{
                    return(
                        <tr key={data.data.student.id}>
                            <td className='text-center'>
                                <Link to={`/detailStudent/${data.data.student.id}`}  className='h6'>
                                    {data.data.student.name}
                                </Link>
                            </td>
                            <td className='text-center'>{data.data.student.email}</td>
                            <td className='text-center'>{data.data.student.gender}</td>
                            <td className='text-center'>{data.data.group}</td>
                            <td className='text-center'><code style={{color: 'red'}}>{data.data.average_point.data}</code></td>
                            <td className='text-center'>-{data.data.retake_module}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
            </div>
        }

    </div>
  )
}

export default Marks
