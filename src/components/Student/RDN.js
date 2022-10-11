import React , {useState,useEffect} from "react"
import axios from 'axios'


function RDN(props) {

    let [data, setData] = useState([]);

    useEffect(()=>{
        // axios.get (`http://localhost:8000/api/student/all-marks/${props.year}/${props.id}`).then((res)=>{setData(res.data)   })
    // }, [props.year]);
        fetch(`http://localhost:8000/api/student/all-marks/${props.year}/${props.id}`).then((res)=>{
            return res.json()
        }).then((data)=>{
        console.log(data)
        setData(data)
        })
    },[]);


  return (
    <div>
      <h3>Relevé de note de l'etudiant {props.id} pendant l'année scolaire {props.year - 1}-{props.year}</h3>
      <table className="table table-hover">
        <thead>
            <th>Code</th>
            <th>Module</th>
            <th>Score</th>
            <th>Semestre</th>
        </thead>
        <tbody>
            {
                data.forEach(data => {
                    <tr>
                        <td>Test</td>
                    </tr>
                    // <tr key={data.marks.id}>
                    //     <td>{data.marks.score}</td>
                    //     <td>Test</td>
                    // </tr> 
                })
            }
        </tbody>
      </table>
    </div>
  )
}

export default RDN
