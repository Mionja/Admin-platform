  import React, {useState, useEffect} from "react";
  import {Link} from 'react-router-dom'
  import axios from 'axios';
  import '../../assets/style.css';
  import ListMarks from './ListMarks'
    
function Marks(props) {

    let [data,setData] = useState ([]);
    // var sup10 = data;
    // var inf10 = data;
    var test = data;
    test = [...data].sort((a, b)=>(a.data.average_point.data > b.data.average_point.data ? -1:1))
    // sup10 = data.filter(data => ( data.data.average_point.data >= 10));
    // inf10 = data.filter(data => ( data.data.average_point.data < 10));
  
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
                setIsLoadingGraph(true)
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
            (isLoadingGraph)?  <p className="text-center h3">Attendez un instant...<div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </p>:
            <ListMarks data={graph}/>
        }

        {
            (graph.ap === 0)  ? <p className="mt-5 mb-5">.</p> :
            <div className='mt-4'>

            <div className='mt-5'>
                 <b  className='ml-3 h4 b' style={{color: 'black'}}>
                    Liste de tous les étudiants avec leur moyenne:(Par ordre de mérite)
                 </b>
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
                    {test.map((d)=>{
                    return(
                        <tr key={d.data.student.id}>
                            <td className='text-center'>
                                <Link to={`/detailStudent/${d.data.student.id}`}  className='h6'>
                                    {d.data.student.name}
                                </Link>
                            </td>
                            <td className='text-center'>{d.data.student.email}</td>
                            <td className='text-center'>{ d.data.student.gender ==='M'? "Masculin": "Feminin" }</td>
                            <td className='text-center'>{d.data.group}</td>
                            <td className='text-center'>
                                {
                                    (d.data.average_point.data < 10) ?
                                    <code style={{color: 'red'}}>{d.data.average_point.data}</code>
                                    : d.data.average_point.data
                                }
                            </td>
                            <td className='text-center'>-{d.data.retake_module}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
            
            <p className="mt-5 mb-5"> .</p>
            {/* <div>
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
                            <td className='text-center'>{data.data.retake_module}--</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>

            <div className='mt-5'>
                <b  className='ml-3' style={{color: 'black'}}>
                    Liste des etudiants qui n'ont pas eu la moyenne :
                </b>
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
                            <td className='text-center'>{ data.data.student.gender ==='M'? "Masculin": "Feminin" }</td>
                            <td className='text-center'>{data.data.group}</td>
                            <td className='text-center'><code style={{color: 'red'}}>{data.data.average_point.data}</code></td>
                            <td className='text-center'>-{data.data.retake_module}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div> */}

            </div>
        }

    </div>
  )
}

export default Marks
