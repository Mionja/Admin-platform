import React , {useState,useEffect,useRef} from "react"
import axios from 'axios'
import MarksList from "./MarksList";
import { useReactToPrint } from "react-to-print";
import logo from './../../assets/G_logo_esti.jpg'
import { Link } from 'react-router-dom'

function RDN(props) {

    let [data, setData] = useState([]);
    let [student, setStudent] = useState([]);
    let [moyenne, setMoyenne] = useState(0);
    let[grades, setGrades] = useState([])

    const componentRef = useRef();
    const printData = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: "test",
      onafterprint: () => alert("print success"),
    });

    let [isLoadingData, setIsLoadingData] = useState(true);
    let [isLoadingMoyenne, setIsLoadingMoyenne] = useState(true);
    let [isLoadingStudent, setIsLoadingStudent] = useState(true);

    useEffect(() => {
      axios.all([
          axios.get(`http://localhost:8000/api/student/all-marks/${props.year}/${props.id}`)
          .then( res => {
              console.log(res.data);
              setTimeout(() => {
                setData(res.data);
                setIsLoadingData(false);
              }, 1000);
          }),

          axios.get(`http://localhost:8000/api/student/average_point/${props.year}/${props.id}`)
          .then( res => {
              console.log(res.data);
              setTimeout(() => {
                setMoyenne(res.data);
                console.log(moyenne);
                setIsLoadingMoyenne(false);
              }, 1000);
          }),

          axios.get(`http://localhost:8000/api/student/${props.id}`)
          .then( res => {
              console.log('etudiant',res.data);
              setTimeout(() => {
                setStudent(res.data);
                setGrades(res.data.student.grades)
                setIsLoadingStudent(false);
              }, 1000);
          })

      ])

    }, [props.year, props.id])

    console.log('grade', grades);
  return (
    <div>
      { (isLoadingData) ? <p className="mt-5 ml-5 text-warning">Loading data marks...</p> :""}
    <hr/>
    <Link to={`/RDN/semester/1/${props.year}/${props.id}`} className="btn btn-warning">
      Semestre 1
    </Link>
    <Link to={`/RDN/semester/2/${props.year}/${props.id}`} className="btn btn-warning ml-5">
      Semestre 2
    </Link>
    <div   ref={componentRef} className='container border mt-4'>
            <img src={logo} alt="Logo" height={170+"px"}/>
            {/** Info perso*/}
            {
                (isLoadingStudent)? <p>Loading...</p>:
                <div className="row">
                    <div className="col-4">
                        {student.student.name} 
                        <br/>Relevé de notes - Semestre 1 et 2
                        <br/>Session 1 et 2
                        <br/>Année academique: {props.year-1}-{props.year}
                    </div>
                    <div className="col-4"></div>
                    <div className="col-4">
                    {
                        grades.map((grade)=>{
                                return(
                                    <>
                                    { (grade['school_year'] === props.year) ? '':
                                       <> Inscrit en: {grade['name']}
                                        <br/>Groupe {grade['group']}
                                        </>
                                    }
                                    </>
                                )   
                        })
                    }
                    
                    </div>
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
                            <th className="text-center">Semestre</th>
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
                                        : <td></td>
                                    }
                                    <td>{data.marks.semester}</td>
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
                            (isLoadingMoyenne) ? <p>Loading...</p>:
                            ( moyenne.message === 'Fail') ? <p>En cours</p> 
                            : moyenne.data
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
                    Antananarivo, le 7 Juillet 2022
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
<hr/>
        <div className="row mb-5">
          <div className="col-4"></div>
      <button onClick={printData} className="btn btn-dark text-center col-4 mb-5"> Télécharger en tant que pdf</button>  
      </div>
    </div>
  )
}

export default RDN
