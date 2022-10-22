import React , {useState,useEffect} from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from "axios";


function AddMark() {
    const navigate = useNavigate();
    const {grade} = useParams('grade');
    const {year} = useParams('year');
    let [module, setModule] = useState(0);
    let [email, setEmail] = useState(''); 
    let [semester, setSemester] = useState(1);
    let [score, setScore] = useState(10);
    let[data, setData] = useState([]);
    let[student, setStudent] = useState([]);
    let[isLoading, setIsLoading] = useState(true);
    let[isLoadingS, setIsLoadingS] = useState(true);

    const handlesubmit = async (e) => {
        e.preventDefault();
  
        const note = { email, module, semester, year, score};
        console.log(note);
  
        const res = await axios({
            method: 'POST',
            url: "http://127.0.0.1:8000/api/mark",
            data: note,
          })
          console.log(res.status);
          if (res.status === 201) {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: "Note Ajoutée avec Succes",
              showConfirmButton: true,
            })
          }
      
    }

    useEffect (() =>{
        axios.all([
          axios.get(`http://localhost:8000/api/module/list/${grade}/${year}`)
          .then((res)=>{
                setTimeout(() => {
                    setData(res.data.list_module)
                    setIsLoading(false)
                }, 2000);    
            }),
  
          axios.get(`http://localhost:8000/api/student/list/${grade}/${year}`)
          .then((res)=>{
            setTimeout(() => {
                setStudent(res.data)
                setIsLoadingS(false)
            }, 1000);
            }),
          ])
       },[]);


  return (
    <div>

      <div class="limiter">
		<div class="container-login100" >
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<form class="login100-form validate-form"  onSubmit={handlesubmit}>
					<span class="login100-form-title p-b-49">
						Ajout note  <br/> {grade}  ({year-1} - {year})
					</span>

          <div class="wrap-input100 validate-input mt-3" data-validate="Password is required">
						<span class="label-input100"> Email étudiant </span>
                    <select className="form-control"
                    id='student'
                    name="student"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                      {
                        (isLoadingS) ?
                        <option value="" >Loading...</option>
                        :
                        <>
                        <option value=""></option>
                        {
                        student.map((Item)=>{
                          return( 
                             <option value={Item.student.email} >{Item.student.email}</option>  
                                )
                           })
                        }
                        </>
                      }
                      
                    </select>
                    </div>
          
          <div class="wrap-input100 validate-input mt-3" data-validate="Password is required">
						<span class="label-input100"> Code module </span>
                    <select className="form-control"
                    id='module_id'
                    name="module_id"
                    value={module} 
                    onChange={(e) => setModule(e.target.value)}>
                      {
                        (isLoading) ?
                        <option value=''>Loading...</option>  
                        :
                        <>
                        <option value=''></option>  
                        {data.map((Item)=>{
                        return( 
                          
                          <option value={Item.module.code} >{Item.module.code}</option>  
                              )
                        })}
                        </>
                      }
                    </select>
                    </div>
          <div class="wrap-input100 validate-input m-b-23 mt-3" data-validate = "Username is reauired">
						<span class="label-input100">Semestre</span>
            <select className="form-control"
                     value={semester}
                     onChange={(e) => setSemester(e.target.value)}>
                         <option value={1} > 1er semestre </option>  
                         <option value={2} > 2em semestre </option>  
                    </select>
					
					</div>
                    
          <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100">Note</span>
						<input class="input100" 
                  required
                  type="number"
                  min={0}
                  max={20}
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="form-control"  ></input>
					
					</div>
	
					
					<div class="text-right p-t-8 p-b-31">
						<a href="#">
						</a>
					</div>
            <div className='row'>
          <button type='submit' value="envoyer"  className="btn btn-primary ">
           Enregistrer
           </button>
           <Link to={'/module'}>
            <p className='text-center mt-2' >Voir liste module? <a href="#">Oui</a></p>
           </Link>
           </div>
           <div class="text-right p-t-8 p-b-31">
						<a href="#">
						</a>
					</div>
						
				</form>
          
			</div>
		</div>
	</div>
    </div>
  )
}

export default AddMark
