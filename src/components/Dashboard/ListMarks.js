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

function ListMarks({data}) {
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
      

      useEffect(()=>{
        setParticipation({
          labels: ["Ont participé", "N'ont pas participé"],
          datasets: [
              {
                  label: "Liste de participation des etudiants",
                  data: [data.participating, data.not_participating],
                  backgroundColor: ["cyan","red"],
              },
          ],
        });

      setMoyenne({
          labels: ["Moyenne", "Pas la moyenne"],
          datasets: [
              {
                  label: "Liste de ceux qui ont la moyenne parmis ceux qui ont participé",
                  data: [data.ap,data.nap],
                  backgroundColor: ["cyan","red"],
              },
              
          ],
      });


      setMoyenneGenre({
          labels: ["Fille", "Garçon"],
          datasets: [
              {
                  label: "Ceux qui ont eu la moyenne",
                  data: [data.girl_Gt10, data.boy_Gt10],
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
                  data: [data.girl_Lt10, data.boy_Lt10],
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
      }, [data])


  return (
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
  )
}

export default ListMarks
