
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
  import '../assets/bootstrap.min.css';
  import '../assets/style.css';
  
  ChartJS.register( 
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
    );
  
  function Dashboard() {
  
    const [ComparisonPerYear, setComparisonPerYear] = useState({
        datasets: [],
    });

    const [NombreEtudiants, setNombreEtudiants] = useState({
        datasets: [],
    });

    const [Moyenne, setMoyenne] = useState({
        datasets: [],
    });

    const [MoyenneGenre, setMoyenneGenre] = useState({
        datasets: [],
    });

    const [PasMoyenneGenre, setPasMoyenneGenre] = useState({
        datasets: [],
    });

    const [Participation, setParticipation] = useState({
        datasets: [],
    });


  
    const [chartOptions, setChartOptions] = useState({});
  
    useEffect(() => {
        setParticipation({
            labels: ["Participating", "Not participating"],
            datasets: [
                {
                    label: "Liste de participation des etudiants",
                    data: [80, 20],
                    backgroundColor: ["cyan","red"],
                },
               
            ],
        });

        setMoyenne({
            labels: ["Moyenne", "Pas la moyenne"],
            datasets: [
                {
                    label: "Liste de ceux qui ont la moyenne parmis ceux qui ont participé",
                    data: [50, 30],
                    backgroundColor: ["cyan","red"],
                },
               
            ],
        });

        setMoyenneGenre({
            labels: ["Fille", "Garçon"],
            datasets: [
                {
                    label: "Ceux qui ont eu la moyenne",
                    data: [50, 30],
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
                    data: [10, 20],
                    borderColor: ["green","red"],
                    backgroundCololr: ["red","yellow"],
                },
               
            ],
        });

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
    }, []);
  
    // const handleClick = (event, param) => {
    //     console.log(event);
    //     console.log(param);
    //   };
  
      /* <div>
            <button onClick={event => handleClick(event, 'hello world')}>
                Click
            </button>
            </div> */
    return (
        <div>
            {/* Card boxes */}
           <div className="row ml-1 mt-3">
                <div className="col-1"></div>
                <div className="col-lg-3 col-6">
                    <div className="small-box" style={{backgroundColor: "rgb(171, 177, 176)", borderColor:"red" }}>
                        <div className="inner">
                        <h3>L1</h3>
                        <p>Lorem ipsum dolor sit amet.<code className='text-danger'>(selected)</code></p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-person-add" />
                        </div>
                        <a href='/' className="small-box-footer">Plus d'info<i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="small-box" style={{backgroundColor: "rgb(84, 175, 170)"}}>
                        <div className="inner">
                        <h3>L2</h3>
                        <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-person-add" />
                        </div>
                        <a href="#" className="small-box-footer">Plus d'info<i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="small-box" style={{backgroundColor: "rgb(84, 98, 175)"}}>
                        <div className="inner">
                        <h3>L3</h3>
                        <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-person-add" />
                        </div>
                        <a href="#" className="small-box-footer">Plus d'info<i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box" style={{backgroundColor: "rgb(175, 84, 89)"}}>
                        <div className="inner">
                        <h3>M1</h3>
                        <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-person-add" />
                        </div>
                        <a href="#" className="small-box-footer">Plus d'info<i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-warning">
                        <div className="inner">
                        <h3>M2</h3>
                        <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-person-add" />
                        </div>
                        <a href="#" className="small-box-footer">Plus d'info<i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
           </div>

            <h1 className='text-center text-light mt-5 bg-dark'>
                L1
            </h1>

            {/* First two graphs */}
            <div className="row mt-5">
                <div className="col-5 ml-5 mr-2">
                    <Bar options={chartOptions} data={ComparisonPerYear}/> 
                </div>
                <div className="col-5 ml-4">
                    <Bar options={chartOptions} data={NombreEtudiants}/> 
                </div>
            </div>

            <hr/>
            {/* Pagination */}
            <div className='row'>
                <div class="col-4"></div>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">2018</a></li>
                        <li class="page-item"><a class="page-link" href="#">2019</a></li>
                        <li class="page-item"><a class="page-link" href="#">2021</a></li>
                        <li class="page-item active"><a class="page-link" href="#">2022</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
            </div>

            {/* List of those who had more than 10 */}
            <h3 className='mb-5 mt-3 text-center'>Etudiants en L1 (2021-2022)</h3>    
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
            <hr/>
            {/* List of those who had less than 10 */}
            <div className='mt-4'>
                <div>
                    <b className='ml-3' style={{color: 'black'}}>
                        Liste des etudiants qui ont eu la moyenne (par ordre de mérite) :

                                <span className='float:right ml-5'>
                                    <select
                                    // value={group}
                                    // onChange={(e) => setGroup(e.target.value)}
                                    >
                                    <option value="">--Group--</option>    
                                    <option value="G1">Group 1</option>
                                    <option value="G2">Group 2</option>
                                    </select>

                                    <select
                                    // value={gender}
                                    // onChange={(e) => setGender(e.target.value)}
                                    >
                                    <option value="">--Gender--</option>
                                    <option value="F">Fille</option>
                                    <option value="M">Garçon</option>
                                
                                    </select>
                                </span>     
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
                            <tr>
                                <td className='text-center'>test</td>
                                <td className='text-center'>test@gmail.com</td>
                                <td className='text-center'>Feminin</td>
                                <td className='text-center'>G2</td>
                                <td className='text-center'>16</td>
                                <td className='text-center'>-</td>
                            </tr>

                            <tr>
                                <td className='text-center'>test1</td>
                                <td className='text-center'>test1@gmail.com</td>
                                <td className='text-center'>Masculin</td>
                                <td className='text-center'>G2</td>
                                <td className='text-center'>14</td>
                                <td className='text-center'>Info_100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='mt-5'>
                <b  className='ml-3' style={{color: 'black'}}>Liste des etudiants qui n'ont pas eu la moyenne (avec tous les modules à rattraper)
                            <span className='float:right ml-5'>
                                <select
                                // value={group}
                                // onChange={(e) => setGroup(e.target.value)}
                                >
                                <option value="">--Group--</option>    
                                <option value="G1">Group 1</option>
                                <option value="G2">Group 2</option>
                                </select>

                                <select
                                // value={gender}
                                // onChange={(e) => setGender(e.target.value)}
                                >
                                <option value="">--Gender--</option>
                                <option value="F">Fille</option>
                                <option value="M">Garçon</option>
                            
                                </select>
                            </span>     
                </b>
                    <code style={{color: 'red'}}>
                    <table className="table table-hover mt-3">
                        <thead className='text-dark'>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Sexe</th>
                                <th>Groupe</th>
                                <th>Moyenne</th>
                                <th>Module(s) à rattraper </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>test</td>
                                <td>test@gmail.com</td>
                                <td>Feminin</td>
                                <td>G2</td>
                                <td>8.5</td>
                                <td>Info_250, Info_150</td>
                            </tr>

                            <tr>
                                <td>test1</td>
                                <td>test1@gmail.com</td>
                                <td>Masculin</td>
                                <td>G2</td>
                                <td>9.2</td>
                                <td>Info_150</td>
                            </tr>
                        </tbody>
                    </table>

                    </code>
                </div>
            </div>

        </div>
    );
  }
  
  export default Dashboard;
  