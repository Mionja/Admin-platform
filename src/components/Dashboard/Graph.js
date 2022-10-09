
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
import Marks from './Marks'
ChartJS.register( 
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
    );

function Graph(props) {
    let[year, setYear] = useState(2022);

    const [ComparisonPerYear, setComparisonPerYear] = useState({
        datasets: [],
    });

    const [NombreEtudiants, setNombreEtudiants] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});

    const Previous = ()=>{
        if (year !==  2018) {
            setYear(year-1)   
        }
        else{
            alert("Pas d'année scolaire correspondant");
        }
    }

    const Next = ()=>{
        if (year <  2022) {
            setYear(year+1)   
        }
        else{
            alert("Pas d'année scolaire correspondant");
        }
    }

    useEffect(() => {
        setComparisonPerYear({
            labels: ["2018-2019", "2019-2020", "2020-2021", "2021-2022"],
            datasets: [
                {
                    label: "Moyenne generale",   
                    data: [12, 15, 10, 13],
                },
            
            ],
        });

        setNombreEtudiants({
            labels: ["2018-2019", "2019-2020", "2020-2021", "2021-2022"],
            datasets: [
                {
                    label: "Nombre d'etudiants",   
                    data: [40, 70, 77, 90],
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
        });    
        
    })

  return (
    <div>
       <h1 className='text-center text-light mt-5 bg-dark'>
            { props.grade }
        </h1>

        <div className="row mt-5">
            <div className="col-5 ml-5 mr-2">
                <Bar options={chartOptions} data={ComparisonPerYear}/> 
            </div>
            <div className="col-5 ml-4">
                <Bar options={chartOptions} data={NombreEtudiants}/> 
            </div>
        </div><hr/>

        {/** Choose the year */}
        <div className='row'>
                <div class="col-4"></div>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#"
                        onClick={Previous}>Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#"
                        onClick={() => setYear(2018)}>2018</a></li>
                        <li class="page-item"><a class="page-link" href="#"
                        onClick={() => setYear(2019)}>2019</a></li>
                        <li class="page-item"><a class="page-link" href="#"
                        onClick={() => setYear(2021)}>2021</a></li>
                        <li class="page-item active"><a class="page-link" href="#"
                            onClick={() => setYear(2022)}>2022</a></li>
                        <li class="page-item"><a class="page-link" href="#"
                        onClick={Next}>Next</a></li>
                    </ul>
        </div>

        <Marks year={year} grade={props.grade}/>
    </div>
  )
}

export default Graph
