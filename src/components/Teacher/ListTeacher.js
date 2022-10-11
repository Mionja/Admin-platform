import React from 'react'

function ListTeacher() {
  return (
    <div>
       <a href="/" className='btn btn-dark text-center'>Dashboard</a>
      <h1>LIST OF TEACHERS</h1>
      <a href="/addTeacher"  className='btn btn-info'>Add teacher</a>
      <a href="/editTeacher" className='btn btn-warning ml-5'>Edit teacher</a>
    </div>
  )
}

export default ListTeacher
