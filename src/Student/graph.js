
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
  import { Bar, Doughnut } from 'react-chartjs-2';
  import React, {useState, useEffect} from "react";
  
  ChartJS.register( 
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
    );
  
  function Graph() {
  
    const [chartData, setChartData] = useState({
        datasets: [],
    });
  
    const [chartOptions, setChartOptions] = useState({});
  
    useEffect(() => {
        setChartData({
            labels: ["Programmation Web", "Programmation mobile", "IA", "Systeme embarqué", "Optimisation logicielle"],
            datasets: [
                {
                    label: "Formation la plus vendue en 2021",
                    data: [12, 55, 34, 120, 720],
                    borderColor: "rgb(53, 162, 235) ",
                    backgroundCololr: "rgba(53, 162, 235, 0.4)",
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
                    text: "Formation la plus vendue en 2021"
                },
            },
        });       
    }, []);
   
  
    return (
        <div>
            <div className='Graph'>
            <Bar options={chartOptions} data={chartData}  /> 
            </div>

            <div className='Graph'>
                <Doughnut options={chartOptions} data={chartData}  /> 
            </div>
        </div>
    );
  }
  
  export default Graph;
  