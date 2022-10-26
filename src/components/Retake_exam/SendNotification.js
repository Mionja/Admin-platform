import React, {useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import loading from './../../assets/loading.gif';
import axios from 'axios'
import Swal from 'sweetalert2';


function SendNotification() {
    const {module} = useParams();
    let [data, setData] = useState([])
    let [body, setBody] = useState('')
    let[isLoading, setIsLoading] = useState(true)
    // let [isSending, setIsSending] = useState(false)
    // console.log(module);
    useEffect  (() =>{
            fetch(`http://localhost:8000/api/module/${module}`).then((res)=>{
                return res.json()
            }).then((data)=>{
            setTimeout(() => {
                console.log(data)
                setData(data)
                setIsLoading(false)
            }, 2000)
            })
    },[]);
    // console.log(isSending);
    const sendNotification = async(e)=>{
        e.preventDefault()
      const details = { module, body }
      console.log('details',details)
      const res = await axios({
        method: 'POST',
        url: `http://localhost:8000/api/send-email`,
        data: details 
      })
      console.log('res.data',res.data);
      if (res.status === 200) {
        // setIsSending(false)
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
          {/* {
            (isSending) ?  <p className="text-center h3">Attendez un instant...<div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </p>:''
          } */}
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

        <button type='submit' value="envoyer" className="btn btn-primary">
        Envoyer
        {/* onClick={setIsSending(true)} */}
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
