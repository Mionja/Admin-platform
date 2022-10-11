import React , {useState,useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import RDN from "./RDN";


function DetailStudent() {
    const history = useNavigate();
    const {id} = useParams();
    let[year, setYear] = useState(2022);
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
  return (
    <div>
      <h1>Detail student {id}</h1>

      <div className='row'>
            <div class="col-4"></div>
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#"
                    onClick={Previous}>Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#"
                    onClick={() => setYear(2019)}>2019</a></li>
                    <li class="page-item"><a class="page-link" href="#"
                    onClick={() => setYear(2020)}>2020</a></li>
                    <li class="page-item"><a class="page-link" href="#"
                    onClick={() => setYear(2021)}>2021</a></li>
                    <li class="page-item active"><a class="page-link" href="#"
                        onClick={() => setYear(2022)}>2022</a></li>
                    <li class="page-item"><a class="page-link" href="#"
                    onClick={Next}>Next</a></li>
                </ul>
      </div>

      <RDN year={year} id={id}/>
    </div>
  )
}

export default DetailStudent
