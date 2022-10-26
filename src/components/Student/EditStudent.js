import React , {useState,useEffect} from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import loading from './../../assets/loading.gif';
import axios from 'axios'


function EditStudent() {

  const history = useNavigate();
  const {id} = useParams();
  let[data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();

      const student = { name, email, gender, age};
      console.log(student);

      const res = await axios({
          method: 'PUT',
          url: `http://127.0.0.1:8000/api/student/${id}`,
          data: student,
        })
      if (res.status === 200 ){
        console.log(res.data.status);
        alert("Un etudiant a été modifié(e)");
      }        
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/student/${id}`)
    .then( res => {
        console.log(res.data);
        setTimeout(() => {
          setData(res.data);
          setIsLoading(false);
        }, 3000);
    })

    

}, [])

    
  return (
    <div>
        <div className="limiter">

        <div className="container-login100" >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
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
            <form className="login100-form validate-form"  onSubmit={handleSubmit}>
              <span className="login100-form-title p-b-49">
                Modifier un étudiant
              </span>
    	<div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Nom </span>
						<input 
                  type="text"
                  name="name"
                  value = {data.student.name}
                  onChange={(e) => (setName(e.target.value))}
                  className="form-control"  ></input>
						
					</div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Email </span>
						<input 
                  type='text'
                  id="email" 
                  name="email" 
                  required 
                  value={data.student.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"  ></input>
						
					</div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Genre </span>
						<input
                   id="gender" 
                   name="gender" 
                   required 
                   value={data.student.gender}
                   onChange={(e) => setGender(e.target.value)}
                   type="text"
                  className="form-control"  ></input>
						
					</div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Age </span>
						<input
                    id="age" 
                    name="age" 
                    required 
                    value={data.student.age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                  className="form-control"  ></input>
						
					</div>

          <div className='row'>
          <button type='submit' value="envoyer"  className="btn btn-primary ">
           Enregistrer
           </button>
           <Link to={'/student'}>
            <p className='text-center mt-2' >Revenir dans liste etudiant? <a href="#">Retour</a></p>
           </Link>
           </div>
                
                    </form>
}
                </div>
            </div>
               
        </div>
    </div>
  )
}

export default EditStudent
