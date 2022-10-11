import React , {useState,useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


function EditStudent() {

  const history = useNavigate();
  const {id} = useParams();

  return (
    <div>
      <h1>EDIT STUDENT HAVING ID:{id}</h1>
      <a href="/student">List student</a>
    </div>
  )
}

export default EditStudent
