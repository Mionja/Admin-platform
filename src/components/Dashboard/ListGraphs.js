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
ChartJS.register( 
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
    );


function ListGraphs({data}) {
  let [ComparisonPerYear, setComparisonPerYear] = useState({
    datasets: [],
});

let [NombreEtudiants, setNombreEtudiants] = useState({
    datasets: [],
});

let [chartOptions, setChartOptions] = useState({});

    console.log('d', data);
    console.log('test', data[2].LX2022);
    useEffect(() => {
      setComparisonPerYear({
          labels: [ "2019-2020", "2020-2021", "2021-2022"],
          datasets: [
              {
                  label: "Moyenne generale",   
                  data: [data[0].LX2020.moyenne, data[1].LX2021.moyenne, data[2].LX2022.moyenne],
              },
          
          ],
      });

      setNombreEtudiants({
          labels: [ "2019-2020", "2020-2021", "2021-2022"],
          datasets: [
              {
                  label: "Nombre d'etudiants",   
                  data: [ data[0].LX2020.nombre_etudiant, data[1].LX2021.nombre_etudiant, data[2].LX2022.nombre_etudiant ],
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
    }, [data])
  return (
    <div>
       <div className="row mt-5">
            <div className="col-5 ml-5 mr-2">
                <Bar options={chartOptions} data={ComparisonPerYear}/> 
            </div>
            <div className="col-5 ml-4">
                <Bar options={chartOptions} data={NombreEtudiants}/> 
            </div>
        </div><hr/>
    </div>
  )
}

export default ListGraphs
