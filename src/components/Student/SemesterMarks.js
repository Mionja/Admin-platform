import React , {useState, useEffect, useRef} from "react"
import { useReactToPrint } from "react-to-print";
import axios from 'axios'
import {  useParams, Link } from 'react-router-dom'
import logo from './../../assets/G_logo_esti.jpg'


function SemesterMarks() {
    const {id} = useParams('id')
    const {year} = useParams('year');
    const {semester} = useParams('semester');

    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year_now = new Date().getFullYear()
    const months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  
    console.log(day , months[month], year_now);

    const componentRef = useRef();
    const printData = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: "test",
      onafterprint: () => alert("print success"),
    });

    let[student, setStudent] = useState([])
    let[data, setData] = useState([])
    let[ap, setAp] = useState([])
    let[grades, setGrades] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let [isLoadingData, setIsLoadingData] = useState(true)
    let [isLoadingStudent, setIsLoadingStudent] = useState(true)
    
  useEffect(() => {
    axios.all([
        axios.get(`http://localhost:8000/api/student/average_point_by_semester/${year}/${id}/${semester}`)
        .then( res => {
            console.log('average-point',res.data);
            setTimeout(() => {
            setAp(res.data);
            setIsLoading(false);
            }, 1000);
        }),

        axios.get(`http://localhost:8000/api/student/all-marks-by-semester/${year}/${id}/${semester}`)
        .then( res => {
            console.log('all-marks',res.data);
            setTimeout(() => {
              setData(res.data);
              setIsLoadingData(false);
            }, 1000);
        }),

        axios.get(`http://localhost:8000/api/student/${id}`)
          .then( res => {
              console.log('etudiant',res.data);
              setTimeout(() => {
                setStudent(res.data);
                setGrades(res.data.student.grades)
                setIsLoadingStudent(false);
              }, 1000);
          })

    ])
  }, []);
  
console.log('grades', grades);
  return (
    <div>
        
        <div className="row">
            <div className="col-5"></div>
            {
                (isLoadingStudent)? <p>Loading...</p>:
            <Link to={`/detailStudent/${student.student.id}`} className='col-2 btn btn-sm btn-dark'>Revenir</Link>
            }
        </div>

        {/** 
         * We put bellow the data to be downloaded
         * Eto no atao le zavatra mitovy am RDN reny
        */}
       <div ref={componentRef} className='container border mt-4'>
            <img src={logo} alt="Logo" height={170+"px"}/>
            {/** Info perso*/}
            {
                (isLoadingStudent)? <p>Loading...</p>:
                <div className="row">
                    <div className="col-4">
                        {student.student.name} 
                        <br/>Relevé de notes - Semestre {semester}
                        <br/>Session {semester}
                        <br/>Année academique: {year-1}-{year}
                    </div>
                    <div className="col-4"></div>
                    {/* <div className="col-4">
                    {
                        grades.map((grade)=>{
                            if (grade.school_year === year) {
                                return(
                                    <> Inscrit en: {grade.name}<br/>
                                        Groupe {grade.group}
                                    </>
                                )
                            }
                            else{
                                return(
                                    <>
                                  ------ {grade.school_year} <br/>
                                  Chosen year: {year} <br/>
                                  {
                                    (year === grade.school_year)? 'mitovy': 'tsy mitovy'
                                  }
                                  <br/>
                                  {grade.name} <br/>
                                    </>
                                )   
                            }
                        })
                    }
                    
                    </div> */}
                 </div>
            }

            <div className="row mt-3">
                <div className="col-5"></div>
                <div className="col-4">Notes et résultats</div>
                <div className="col-4"></div>
            </div>
            {/** Data*/}
            <div style={{border:1+'px solid black', borderRadius:5+'px'}}>
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">Code</th>
                            <th className="text-center">Matières</th>
                            <th className="text-center">Coef</th>
                            <th className="text-center">Note</th>
                            <th className="text-center">Note Pondérée</th>
                            <th className="text-center">Obs</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map(data=>{
                            return(
                                <tr key={data.marks.id}>
                                <td> <b className="text-dark"> {data.marks.module.code} </b></td>
                                <td>{data.marks.module.name}</td>
                                <td>{data.marks.module.credits}</td>
                                <td>{data.marks.score}</td>
                                <td>{data.marks.module.credits * data.marks.score}</td>
                                {  
                                    (data.marks.score < 10) ? 
                                    <td>à rattrapper</td> 
                                    : ''
                                }
                                </tr>
                            )
                        }) 
                    }
                    <tr>
                        <td colSpan={2}>
                            Semestre(30 credits max)
                        </td>
                        <td colSpan={2}>Moy.GEN</td>
                        <td>
                        {
                            (isLoading) ? <p>Loading...</p>:
                            ( ap.message === 'Fail') ? <p>En cours</p> 
                            : ap.data
                        }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            
            {/** Footer*/}
            <div className="row mt-2 mb-lg-5">
                <div className="col-9"></div>
                <div className="col-3">
                Antananarivo, le {day}  {months[month]} {year_now}
                    <br/> Le directeur des Etudes
                </div>
            </div>
            <div className="mt-5 mb-5">.</div>
            <hr className="bg-danger"/>
            <div className="row mb-2">
                <div className="col-2"></div>
                <div className="col-8 pl-5">
                    Esti - 5 rue Pasteur - Immeuble CCIA - Antanimena - Antananarivo 101 - Madagascar
                    <br/> <span className="pl-4"> Tel: +261 (0) 20 22 248 74 - Email :  contact@esti.mg - Site: www.esti.mg</span>
                </div>
                <div className="col-2"></div>
            </div>
       </div>
       <div className="row mt-5">
            <div className="col-4"></div>
            {
                (isLoading) ? <button className="btn btn-dark text-center col-4 mb-5">Loading...</button>:
                ( ap.message === 'Fail') ? ''
                : <button onClick={printData} className="btn btn-dark text-center col-4 mb-5"> Télécharger en tant que pdf</button>  
            }
        </div>
    </div>
  )
}

export default SemesterMarks
