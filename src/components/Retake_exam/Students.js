import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


function Students(props) {
  let [data, setData] = useState([]);
  useEffect(() =>{
    fetch(`http://localhost:8000/api/student/list-retaking-exam/${props.module}`).then((res)=>{
        return res.json()
    }).then((data)=>{
      console.log('data',data);
      setData(data)
    })
  },[props.module]);
 
  if (! props.module) {
    return <h1 className='text-danger text-center mt-5'>Veuillez choisir une module</h1>
  }
  return (
    <div>
      <h2>Il y a {data.length} étudiant(s) qui a/ont un rattrapage à faire avec ce module</h2>
      <table className='table table-bordered table-active mt-5'>
        <thead>
          <th>Nom</th>
          <th>Email</th>
          <th>Note(/20)</th>
          <th>Semestre</th>
          <th>Année</th>
        </thead>
        <tbody>
        {
        data.map((item)=>{
          return(
            <>
            {
              item.marks.year &&
              <Link to={`/sendNotification/${props.module}`}>
              <button className='btn bg-danger'>Envoyer notification</button>
              </Link>
            }
            <tr key={item.marks.id}>
              <td>{item.marks.students.name}</td>
              <td>{item.marks.students.email}</td>    
              <td>{item.marks.score}</td>
              <td>{item.marks.semester}</td>
              <td>{item.marks.year}</td>
            </tr>
            </>
          )
        })
      }
        </tbody>
      </table>
      

    
    </div>
  )
}

export default Students








 {/* <button type='button' className='btn btn-primary' data-toggle='modal' data-target = '#exampleModal'>
          Launch test
      </button>
      <div className='modal fade' id='exampleModal' tabIndex={-1} role='dialog' aria-labelledby='exampleModal' aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
             <div className='modal-header'>
                <h5 className='modal-title'>Modal title</h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>    
              <div className='modal-body'>
                  <p>Modal body text  goes here </p>
              </div>
              <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                  <button type='button' className='btn btn-primary'>Send</button>
              </div>
          </div>  
        </div>  
      </div> */}

