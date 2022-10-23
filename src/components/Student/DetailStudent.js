import React , {useState,useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import axios from 'axios'
import RDN from "./RDN";
import loading from './../../assets/loading.gif';
import photo from './../../assets/photo.jpg';
import email from './../../assets/email.png';


function DetailStudent() {
    const history = useNavigate();
    const {id} = useParams();
    let[year, setYear] = useState(2022);
    let[data, setData] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const Previous = ()=>{
        if (year !==  2019) {
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

    // useEffect(()=>{
    //     fetch(`http://localhost:8000/api/student/${id}`).then((res)=>{
    //         return res.json()
    //     }).then((data)=>{
    //         console.log(data)
    //         setData(data)
    //     })

    //     axios
    //     .get (`http://localhost:8000/api/student/${id}`)
    //     .then((res)=>{
    //         console.log(res.data);
    //         setData(res.data)   
    //     })
    // },[]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/student/${id}`)
        .then( res => {
            console.log(res.data);
            setTimeout(() => {
              setData(res.data);
              setIsLoading(false);
            }, 1000);
        })
    }, [])
  return (
    <div>
        <div className="container border mt-3" style={{border:1+'px solid black', borderRadius:15+'px', backgroundColor:'gray'}}>
          { (isLoading) ? <img src={loading} className="ml-5"/> : 
              <div className="media-body mt-3">
                <div className="row">
                  <img src={photo} alt="photo" class="mr-3 mt-3 rounded-circle col-5"
                  style={{width:150+'px'}}/>
                  <span className="col-1"></span>
                  <h2 className="col-5 mt-5">{data.student.name}</h2>
                </div>

                <div className="row mt-5 mb-3">
                <div className="col"></div>
                    <div className="col">
                      <img src={email} alt="email photo" 
                      className="mr-2"/>
                      {data.student.email}
                      </div>
                    <div className="col">Age: {data.student.age}</div>
                    <div className="col">Genre: { data.student.gender ==='M'? "Masculin": "Feminin" }</div>
                </div>
              </div>
          }
        </div>


    {/* Choosing the Academic year  */}
      <div className='row mt-5'>
            <div class="col-4 mr-5"></div>
            <ul class="pagination col-6">
                        <li class="page-item"><a class="page-link" href="#"
                        onClick={Previous}>Previous</a></li> {
                            (year === 2019) ? 
                            <li className="page-item active" id='2019'><a className="page-link" href="#"
                            onClick={() => setYear(2019)}>2019</a></li>
                            :
                            <li className="page-item" id='2019'><a className="page-link" href="#"
                            onClick={() => setYear(2019)}>2019</a></li>
                        }
                        
                        {
                            (year === 2020) ? 
                        <li className="page-item active"><a className="page-link" href="#"
                        onClick={() => setYear(2020)}>2020</a></li>
                        :
                        <li className="page-item"><a className="page-link" href="#"
                        onClick={() => setYear(2020)}>2020</a></li>
                        }
    
                        {
                            (year === 2021) ? 
                        <li className="page-item active"><a className="page-link" href="#"
                        onClick={() => setYear(2021)}>2021</a></li>
                        :
                        <li className="page-item"><a className="page-link" href="#"
                        onClick={() => setYear(2021)}>2021</a></li>
                        }
    
                        {
                            (year === 2022) ? 
                        <li className="page-item active"><a className="page-link" href="#"
                        onClick={() => setYear(2022)}>2022</a></li>
                        :
                        <li className="page-item"><a className="page-link" href="#"
                        onClick={() => setYear(2022)}>2022</a></li>
                        }
    
                        <li class="page-item"><a class="page-link" href="#"
                        onClick={Next}>Next</a></li>
            </ul>
            <div class="col-3"></div>
      </div>
      <RDN year={year} id={id}/>
    </div>
  )
}

export default DetailStudent
