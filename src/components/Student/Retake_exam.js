import React , {useState,useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'

function Retake_exam() {
    const {id} = useParams();
  let[data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/student/re-take-exam/${id}`)
    .then( res => {
        console.log(res.data);
        setTimeout(() => {
          setData(res.data);
          setIsLoading(false);
        }, 2000);
    })
}, [])
  return (
    <div>
      <h2>Liste des modules à rattrapper: </h2>
      <table className="table table-hover">
        <thead>
          <th>Code</th>
          <th>Module</th>
          <th>Score</th>
          <th>Année</th>
          <th>Semestre</th>
        </thead>
        <tbody>
          {isLoading ? 
          <tr>
            <td></td>
            <td></td>
            <td><code className="text-warning">Loading...</code></td>
          </tr>
          :
          data.map((item)=>(
            <tr key={item.retake_exam.id}>
              <td>
                  <Link to={`/detailModule/${item.retake_exam.module.id}`} >
                    {item.retake_exam.module.code}
                  </Link>
                </td>
              <td>{item.retake_exam.module.name}</td>
              <td>{item.retake_exam.score}</td>
              <td>{item.retake_exam.year}</td>
              <td>{item.retake_exam.semester}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Retake_exam
