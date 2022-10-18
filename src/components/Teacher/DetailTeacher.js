import React, { useState, useEffect } from 'react'
import {  useParams, Link } from 'react-router-dom'
import axios from 'axios'
import loading from './../../assets/loading.gif';
import './../../assets/admin/css/util.css';
import './../../assets/admin/css/main.css';

function DetailTeacher() {
    const {id} = useParams();
    let[teacher, setTeacher] = useState([]);
    let[modules, setModules] = useState([]);
    let[isLoading, setIsLoading] = useState(true);

    useEffect (() =>{
          axios.get(`http://localhost:8000/api/teacher/${id}`).then((res)=>{
              setTimeout(() => {
                console.log(res.data.teacher.modules);
                  setTeacher(res.data);
                  setModules(res.data.teacher.modules);
                  setIsLoading(false);
                }, 3000);
          })
       },[]);
      
  return (
    <div class="limiter">
		<div class="container-login100" >
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            { (isLoading) ? <p className="text-center h3">Please, wait a moment...<img src={loading}/></p>: 
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-49">
						Professeur {teacher.teacher.name}
					</span>
                    <p className='mt-4'>
                        Diplome: {teacher.teacher.diploma}
                    </p>
                    <hr/>
                    <div>
                        Liste de(s) module(s) enseignée(s): 
                        <ul className='mt-2'>
                            {
                                modules.map((item)=>{
                                    return(
                                        <li key={item.id}>{item.code}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </form>
            }   
            </div>
        </div>
    </div>
  )
}

export default DetailTeacher
