import React, {useEffect, useState} from 'react'

function Students(props) {
  let [data, setData] = useState([]);
  useEffect(() =>{
    fetch(`http://localhost:8000/api/student/list-retaking-exam/${props.year}/${props.module}`).then((res)=>{
        return res.json()
    }).then((data)=>{
      console.log(data);
      setData(data)
    })
},[props.year, props.module]);
  if (! props.module) {
    return <h1 className='text-danger text-center mt-5'>Veuillez choisir une module</h1>
  }
  return (
    <div>
      <h2>Il y a {data.length} étudiant(s) manao rattrapage tam année scolaire {props.year}</h2>
      <table className='table table-bordered table-active mt-5'>
        <thead>
          <th>Nom</th>
          <th>Email</th>
          <th>Note(/20)</th>
          <th>Semestre</th>
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
            </tr>
          )
        })
      }
        </tbody>
      </table>
    </div>
  )
}

export default Students
