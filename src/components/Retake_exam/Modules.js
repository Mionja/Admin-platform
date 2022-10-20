import React, {useEffect, useState} from 'react'
import Students from './Students';


function Modules(props) {
    let[module, setModule] = useState();
    let [data,setData] = useState ([]);

    useEffect (() =>{
        fetch(`http://localhost:8000/api/module/list/${props.grade}`).then((res)=>{
            return res.json()
        }).then((data)=>{
          setData(data.list_module)
        })
    },[props.grade]);

  return (
    <div>
      <div class="wrap-input100 validate-input mt-3" width={30+"%"}>
        <select className="form-control text-center"
          id='module'
          name="module"
          value={module} 
          onChange={(e) => setModule(e.target.value)}>
            <option value=''>--Liste de tous les modules en {props.grade}--</option>
            {data.map((Item)=>{
            return( 
                <option value={Item.module.id} >{Item.module.code}</option>  
                  )
            })}
        </select>
      </div>

      <Students module={module}/>
    </div>
  )
}

export default Modules
