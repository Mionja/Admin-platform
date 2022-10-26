import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import loading from './../../assets/loading.gif';
import './../../assets/admin/css/util.css';
import './../../assets/admin/css/main.css';
import { useNavigate, useParams, Link } from 'react-router-dom'


function Professeurs() 
{
  const history = useNavigate();
  const {id} = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [diploma, setDiploma] = useState('');
  const [module_id, setModule_id] = useState( 1 );
  const [data ,  setData] = useState ([]);
  let[teacher, setTeacher] = useState();
  let[isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
      e.preventDefault();

      const teacher = { name, email, diploma, module_id };
      console.log(teacher);

      const res = await axios({
          method: 'PUT',
          url: `http://127.0.0.1:8000/api/teacher/${id}`,
          data: teacher,
        })
        if (res.status === 200) {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Professeur modifié avec Succes',
            showConfirmButton: true,
          })
        }
    }

useEffect (() =>{
  axios.all([
    axios.get('http://localhost:8000/api/module').then((res)=>{
     setData(res.data)
    }),
    axios.get(`http://localhost:8000/api/teacher/${id}`).then((res)=>{
        setTimeout(() => {
            setTeacher(res.data);
            setIsLoading(false);
          }, 3000);
    }),
  ])
 },[]);

return (
 
  <div class="limiter">
		<div class="container-login100" >
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            { (isLoading) ?  <p className="text-center h3">Attendez un instant...<div class="sk-cube-grid">
                                    <div class="sk-cube sk-cube1"></div>
                                    <div class="sk-cube sk-cube2"></div>
                                    <div class="sk-cube sk-cube3"></div>
                                    <div class="sk-cube sk-cube4"></div>
                                    <div class="sk-cube sk-cube5"></div>
                                    <div class="sk-cube sk-cube6"></div>
                                    <div class="sk-cube sk-cube7"></div>
                                    <div class="sk-cube sk-cube8"></div>
                                    <div class="sk-cube sk-cube9"></div>
                                    </div>
                                </p>: 
				<form class="login100-form validate-form"  onSubmit={ handleSubmit }>
					<span class="login100-form-title p-b-49">
						Modification professeur
					</span>

					<div class="wrap-input100 validate-input m-b-23" >
						<span class="label-input100" > Nom </span>
						<input class="input100"
                  id="name" 
                  type="text"
                  name="name"
                  value = {teacher.teacher.name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"  ></input>
						
					</div>

					<div class="wrap-input100 validate-input" >
						<span class="label-input100">Email</span>
						<input class="input100" 
                  id="email" 
                  type="email"
                  name="email"
                  value={teacher.teacher.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"></input>
						
					</div>
          <div class="text-right p-t-8 p-b-31">
						<a href="#">
						</a>
					</div>

          <div class="wrap-input100 validate-input m-b-23" >
						<span class="label-input100">Diplome</span>
						<input class="input100" 
                  id="diploma"
                  type="text"
                   name="diploma"
                  value={teacher.teacher.diploma}
                  onChange={(e) => setDiploma(e.target.value)}
                  className="form-control"  ></input>
					
					</div>
            <div class="wrap-input100 validate-input mt-3" data-validate="Password is required">
						<span class="label-input100"> Code module </span>
                    <select className="form-control"
                    id='module_id'
                    name="module_id"
                    value={module_id} 
                    onChange={(e) => setModule_id(e.target.value)}>
                      {data.map((Item)=>{
                      return( 
                        
                         <option value={Item.module.id} >{Item.module.code}</option>  
                            )
                       })}
                    </select>
                    </div>
					<div class="text-right p-t-8 p-b-31">
						<a href="#">
						</a>
					</div>
				  <div className='row'>
          <button type='submit' value="envoyer"  className="btn btn-primary ">
           Enregistrer
           </button>
           <Link to={'/teacher'}>
            <p className='text-center mt-2' >Revenir dans liste professeurs? <a href="#">Retour</a></p>
           </Link>
           </div>
           <div class="text-right p-t-8 p-b-31">
						<a href="#">
						</a>
					</div>
						
				</form>
    }
			</div>
		</div>
	</div>
  )  
}
export default Professeurs;

