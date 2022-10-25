import React , {useState,useEffect} from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from "axios";

function PassStudent() {
    const navigate = useNavigate();
    const {grade} = useParams('grade');
    const {year} = useParams('year');
    let[isLoading, setIsLoading] = useState(true);
    let[student, setStudent] = useState([]);
    let [id, setId] = useState();
    let [group, setGroup] = useState('IDEV');

    console.log(id);
    const handlSubmit = async(e)=>{
        e.preventDefault();
  
        const data = { grade, year, group};
        console.log('data',data);
  
        const res = await axios({
            ContentType:'application/json',
            method: 'POST',
            url: `http://localhost:8000/api/student/pass/${id}`,
            data: data,
          })
          console.log(res.status);
          if (res.status === 200) {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: "Success",
              showConfirmButton: true,
            })
          }
      
    }

    useEffect (() =>{
          axios.get(`http://localhost:8000/api/student/list/${grade}/${year}`)
          .then((res)=>{
            setTimeout(() => {
                setStudent(res.data)
                setIsLoading(false)
            }, 1000);
            })
       },[]);

  return (
    <div class="limiter">
    <div class="container-login100" >
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <form class="login100-form validate-form"  onSubmit={handlSubmit}>
          <span class="login100-form-title p-b-49">
            Passer un étudiant en  {grade} de l'année scolaire <br/> ({year-1} - {year}) 
          </span>

          <div class="wrap-input100 validate-input mt-3" data-validate="Password is required">
            <span class="label-input100"> Email étudiant </span>
            <select className="form-control"
            required
            id='student'
            name="student"
            value={id}
            onChange={(e) => setId(e.target.value)}>
                {
                (isLoading) ?
                <option value="" >Loading...</option>
                :
                <>
                <option value=""></option>
                {
                student.map((Item)=>{
                    return( 
                    <option value={Item.student.id} key={Item.student.id}>{Item.student.email}</option>  
                        )
                    })
                }
                </>
                }
                
            </select>
          </div>
          
          <div class="wrap-input100 validate-input m-b-23 mt-3" data-validate = "Username is reauired">
            <span class="label-input100">Groupe</span>
            <select className="form-control"
            value={group}
            onChange={(e) => setGroup(e.target.value)}>
                <option value='RSI' > RSI </option>  
                <option value='IDEV' > IDEV </option>  
            </select>
          
          </div>  
          
          <div class="text-right p-t-8 p-b-31">
            <a href="#">
            </a>
          </div>
            <div className='row'>
          <button type='submit' value="envoyer"  className="btn btn-primary ">
          Envoyer
          </button>
          <Link to={'/student'}>
            <p className='text-center mt-2' >Voir liste étudiant? <a href="#">Oui</a></p>
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
  )
}

export default PassStudent
