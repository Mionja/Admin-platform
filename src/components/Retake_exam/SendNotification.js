import React, {useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import loading from './../../assets/loading.gif';
import axios from 'axios'
import Swal from 'sweetalert2';


function SendNotification() {
    const {module} = useParams();
    let [data, setData] = useState([])
    let [body, setBody] = useState('')
    let[isLoading, setIsLoading] = useState(true);

    useEffect  (() =>{
            fetch(`http://localhost:8000/api/module/${module}`).then((res)=>{
                return res.json()
            }).then((data)=>{
            setTimeout(() => {
                // console.log(data);
                setData(data);
                setIsLoading(false);
            }, 2000);
            })
    },[]);
    
    const sendNotification = async(e)=>{
        e.preventDefault()
      const details = { module, body };
      console.log('details',details);
      const res = await axios({
        method: 'POST',
        url: `http://localhost:8000/api/send-email`,
        data: details 
      })
      console.log('res.data',res.data);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Notification envoyée',
          showConfirmButton: true,
        })
      }
    }
  return (
    <div class="limiter">
    <div class="container-login100" >
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        { (isLoading) ? <p className="text-center h3">Please, wait a moment...<img src={loading}/></p>: 
            <form class="login100-form validate-form"  onSubmit={sendNotification}>
                <span class="login100-form-title p-b-49">
                    Rattrapage pour le module { data.module.code }
                </span>

      <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
                    <span class="label-input100">Corps du mail</span>
                    <textarea class="input100" 
              required  
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="form-control"  ></textarea>
                
                </div>
                
                <div class="text-right p-t-8 p-b-31">
                    <a href="#">
                    </a>
                </div>
        <div className='row'>

        <button type='submit' value="envoyer"  className="btn btn-primary">
        Envoyer
       </button>
      
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

export default SendNotification
