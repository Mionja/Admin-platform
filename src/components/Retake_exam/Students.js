import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';


function Students(props) {
  let [data, setData] = useState([]);
  useEffect(() =>{
    fetch(`http://localhost:8000/api/student/list-retaking-exam/${props.module}`).then((res)=>{
        return res.json()
    }).then((data)=>{
      // console.log(data);
      setData(data)
    })
  },[props.module]);

  const module = 'INFO_210'
  const subject = 'Test subject'
  const title = 'Title test'
  let [body, setBody] = useState('Coucou nju')

  const getBody = ()=>{
    Swal.fire({
      title: "Corps du mail",
      text: "Veuillez écrire le corps du mail à envoyer à ces étudiants",
      input: 'text',
      showCancelButton: true        
      }).then((result) => {
          if (result.value) {
            console.log("Input: " + result.value);
            return result.value
          }
      })
  }

  const sendNotification = async()=>{
    setBody( getBody() )
    console.log( getBody() )
    const details = { module, subject, title, body };
    console.log('details',details);
    const res = await axios({
      method: 'POST',
      url: `http://localhost:8000/api/send-email`,
      data: details 
    })
    console.log('res.data',res.data);
    if (res.status === 200) {
      alert('Notification envoyée')
    }
  }

 
  if (! props.module) {
    return <h1 className='text-danger text-center mt-5'>Veuillez choisir une module</h1>
  }
  return (
    <div>
      <h2>Il y a {data.length} étudiant(s)</h2>
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
            <tr key={item.marks.id}>
              <td>{item.marks.students.name}</td>
              <td>{item.marks.students.email}</td>    
              <td>{item.marks.score}</td>
              <td>{item.marks.semester}</td>
              <td>{item.marks.year}</td>
            </tr>
          )
        })
      }
        </tbody>
      </table>
      <button className='btn btn-warning ml-5' onClick={sendNotification}>Envoyer notification</button>

      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
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
      {/* <Link to={`/sendNotification`}  className='text-primary'>
        <button className='btn btn-warning ml-5'>Envoyer notification</button>
      </Link> */}
