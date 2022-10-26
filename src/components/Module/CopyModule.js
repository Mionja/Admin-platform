import React , {useState,useEffect} from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from "axios";

function CopyModule() {

    const navigate = useNavigate();
    const {grade} = useParams('grade');
    const {year} = useParams('year');
    let[body, setBody] = useState(year)
    console.log(body);

    const copyModules = async (e) => {
        e.preventDefault();

        const res = await axios.get(`http://localhost:8000/api/copy-modules/${grade}/${year}/${body}`)

        console.log(res.status);
        if (res.status === 200 ){
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            showConfirmButton: true,
          })
        }        
    }

  return (
    <div>
         <div class="limiter">
    <div class="container-login100" >
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form class="login100-form validate-form"  onSubmit={copyModules}>
                <span class="login100-form-title p-b-49">
                    Copier tous les modules des {grade}  en {year} vers 
                    modules des {grade} en?
                </span>

      <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
                    <span class="label-input100">L'année scolaire</span>
                    <input class="input100" 
                    type='number'
              required  
              value={body}
              min={ 2020 }
              onChange={(e) => setBody(e.target.value)}
              className="form-control"  ></input>
                
                </div>
                
                <div class="text-right p-t-8 p-b-31">
                    <a href="#">
                    </a>
                </div>
        <div className='row'>

        <button type='submit' value="envoyer"  className="btn btn-primary">
        Copier
       </button>
      
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

export default CopyModule
