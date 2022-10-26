import axios from 'axios';
import React, {useState, useEffect} from "react";
import Marks from './Marks'
import ListGraphs from './ListGraphs'

function Graph(props) {
    let[year, setYear] = useState(2022);

    let Previous = ()=>{
        if (year !==  2020) {
            setYear(year-1)   
        }
        else{
            alert("Pas d'année scolaire correspondant");
        }
    }

    let Next = ()=>{
        if (year <  2022) {
            setYear(year+1)   
        }
        else{
            alert("Pas d'année scolaire correspondant");
        }
    }
    
    let [graph, setGraph] = useState([])
    let[isLoadingGraph, setIsLoadingGraph] = useState(true)

    useEffect(() => {
        axios.get (`http://localhost:8000/api/student/data/graph-general/${props.grade}`)
            .then((res)=>{
            setTimeout(() => {
                console.log('ee', res.data);
                setGraph(res.data);
                setIsLoadingGraph(false)    
            }, 2000);
        })
    }, [props.grade]);


  return (
    <div>
       <h1 className='text-center text-light mt-5 bg-dark'>
            { props.grade }
       </h1>
        {
            (isLoadingGraph)? <div class="sk-cube-grid">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
          </div>:
            <ListGraphs data={graph}/>
        }
       
        {/** Choose the year */}
        <div className='row'>
            <div class="col-5"></div>
            <ul class="pagination div col-7">
                <li class="page-item"><a class="page-link" href="#"
                onClick={Previous}>Previous</a>
                </li>
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
        </div>

        <Marks year={year} grade={props.grade}/>
    </div>
  )
}

export default Graph
