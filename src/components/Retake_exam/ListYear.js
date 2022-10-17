import React, {useState} from 'react'
import Students from './Students';

function ListYear(props) {
    let[year, setYear] = useState(2022);
    
    let Previous = ()=>{
        if (year !==  2019) {
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

  return (
    <div>
       <div className='row'>
            <div className="col-4"></div>
            <div className='col-8'>
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
        </div>

        <Students grade={props.grade} year={year}/>
    </div>
  )
}

export default ListYear
