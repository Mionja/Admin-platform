import React , {useState,useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditModule() {

  const history = useNavigate();
  const {id} = useParams();
  let [data,setData] = useState ([]);
  console.log(id);
  useEffect  (() =>{
      // const res = async(e)=>{
      //   e.preventDefault()
      //   await axios.get (`http://localhost:8000/api/module/${id}`).then((res)=>{setData(res.data)   })
      // }
        fetch(`http://localhost:8000/api/module/${id}`).then((res)=>{
            return res.json()
        }).then((data)=>{
          console.log(data)
          setData(data)
        })
  },[]);

  return (
    <div>
      <h1>EDIT MODULE</h1>
      <a href="/module">Back to list module</a>

      <form>
        <label>Name</label>
        <input type="text" 
        value={data.module.name}
        // onChange={(e) => setData(e.target.value)}
        />

        <label>Code</label>
        <input type="text" 
        value={data.module.code}
        // onChange={(e) => set(e.target.value)}
        />

        <label>Hour</label>
        <input type="number" 
        value={data.module.hour}
        // onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  )
}

export default EditModule
