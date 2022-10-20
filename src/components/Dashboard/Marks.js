import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar, Doughnut, Pie } from 'react-chartjs-2';
  import React, {useState, useEffect} from "react";
  import {Link} from 'react-router-dom'
  import axios from 'axios';
  import '../../assets/style.css';
  
  ChartJS.register( 
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
    );
  
function Marks(props) {

    
    let [data,setData] = useState ([]);
    let [isLoading,setIsLoading] = useState ([]);
   
    let [Moyenne, setMoyenne] = useState({
        datasets: [],
    });

    let [MoyenneGenre, setMoyenneGenre] = useState({
        datasets: [],
    });

    let [PasMoyenneGenre, setPasMoyenneGenre] = useState({
        datasets: [],
    });

    let [Participation, setParticipation] = useState({
        datasets: [],
    });
  
    let [chartOptions, setChartOptions] = useState({});
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
          if(! isLoadingGraph)  {
            setParticipation({
                labels: ["Ont participé", "N'ont pas participé"],
                datasets: [
                    {
                        label: "Liste de participation des etudiants",
                        data: [graph.partipating, graph.not_partipating],
                        backgroundColor: ["cyan","red"],
                    },
                ],
            });
        
            setMoyenne({
                labels: ["Moyenne", "Pas la moyenne"],
                datasets: [
                    {
                        label: "Liste de ceux qui ont la moyenne parmis ceux qui ont participé",
                        data: [10,0],
                        backgroundColor: ["cyan","red"],
                    },
                   
                ],
            });
        
        
            setMoyenneGenre({
                labels: ["Fille", "Garçon"],
                datasets: [
                    {
                        label: "Ceux qui ont eu la moyenne",
                        data: [5, 5],
                        borderColor: ["green","red"],
                        backgroundCololr: ["red","green"],
                    },
                   
                ],
            });
        
            setPasMoyenneGenre({
                labels: ["Fille", "Garçon"],
                datasets: [
                    {
                        label: "Ceux qui n'ont pas eu la moyenne",
                        data: [0, 0],
                        borderColor: ["green","red"],
                        backgroundCololr: ["red","yellow"],
                    },
                   
                ],
            });
        
            setChartOptions({
                responsive: true,
                plugins: {
                    legend: {
                        position: "top"
                    },
                    title:{
                        dsiplay: true,
                        text: ""
                    },
                },
            })
   
          }
            
    }, [props.grade, props.year])

    
  

  return (
    <div>
        <h3 className='mb-5 mt-3 text-center'>Etudiants en {props.grade} ({props.year - 1}-{props.year})</h3>    
        <hr/>
        {
              
        }
    <div className='row'>
        <span className='col-3' >
            <Doughnut options={chartOptions} data={Participation}  /> 
        </span>
        <span className='col-3' >
            <Pie options={chartOptions} data={Moyenne}  /> 
        </span>
        <span className='col-3 mt-5' >
            <Bar options={chartOptions} data={MoyenneGenre}  className='mt-5'/> 
        </span>
        <span className='col-3 mt-5' >
            <Bar options={chartOptions} data={PasMoyenneGenre}  className='mt-5'/> 
        </span>
    </div>

    {/* List of students with their average points and retake module */}
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

    </div>
  )
}

export default Marks
