import React from 'react'

function Students(props) {
  return (
    <div>
      <h1 className='text-center mt-3'>Liste des élèves ayant des rattrapages à faire
        <br/>
         {props.grade} ({props.year - 1}-{props.year})
      </h1>
      <hr/>
    </div>
  )
}

export default Students
