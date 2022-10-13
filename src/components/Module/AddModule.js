import React, { useState } from 'react';
// import react from 'react';
import axios from 'axios';
// import Swal from 'sweetalert2';
import './../../assets/admin/css/util.css';
import './../../assets/admin/css/main.css';
//import { link } from 'react-router-dom';
//import { useHistory } from 'react-router';



function Modules() {


  
  // <script type="text/javascript"> 
  // window.csrf_token = "{ csrf_token() }"
  // </script>
  const [name, setName] = useState('');
  const [code, setCode] = useState(''); 
  const [hour, setHour] = useState('');
  // const [password, setPassword] = useState([]);

  const handlesubmit= async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name) 
    formData.append("code", code) 
    formData.append("hour", hour) 

  const res = await axios({
      method: 'POST',
      url: "http://127.0.0.1:8000/api/module",
      data: formData,
      
    })
    console.log(res.status);
    if (res.status === 200) {
      //console.log(res);
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Module Ajouter avec Succes',
      //   showConfirmButton: true,
      // })
      alert("Etudiant Ajouter avec Succes");
    }

};
return (


  <div class="limiter">
		<div class="container-login100" >
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<form class="login100-form validate-form"  onSubmit={handlesubmit}>
					<span class="login100-form-title p-b-49">
						Ajouts modules
					</span>

					<div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100" > Nom </span>
						<input class="input100" 
                  type="text"
                  name="name"
                  value = {name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"  ></input>
						
					</div>

					<div class="wrap-input100 validate-input" data-validate="Password is required">
						<span class="label-input100"> Code </span>
						<input class="input100"  
                  type="text"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="form-control"></input>
						
					</div>
          <div class="text-right p-t-8 p-b-31">
						<a href="#">
						</a>
					</div>

          <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100">Heure</span>
						<input class="input100" 
                  type="number"
                   name="hour"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  className="form-control"  ></input>
					
					</div>
					
					<div class="text-right p-t-8 p-b-31">
						<a href="#">
						</a>
					</div>
				
              <button type='submit' value="envoyer"  className="btn btn-primary btn-sm ">
           Enregistrer
           </button>
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


export default Modules;

// <div className="contener">
  //     <div className="row">
  //         <div className="col-md-12">
  //           <div className="card">
  //              <div className="card-header">
  //              <h1>
  //               Ajouts des Modules.
  //               {/* <link onTouchCancel={"/"} className="btn btn-primarybtn-sm float-end">
  //               </link> */}
  //              </h1>
  //             </div>
  //             <div className='card-body'>
  //             <form onSubmit={handlesubmit}>
  //             <div className='form-group mb-3'>
  //             <label>Nom</label>
  //             <input
  //                 type="text"
  //                 name="name"
  //                 value = {name}
  //                 onChange={(e) => setName(e.target.value)}
  //                 className="form-control"              
  //             ></input>
  //             </div>
  //             <div className='form-group mb-3'>
  //             <label>code</label>
  //             <input
  //                 type="text"
  //                 name="code"
  //                 value={code}
  //                 onChange={(e) => setCode(e.target.value)}
  //                 className="form-control"              
  //             ></input>
  //             </div>
  //             <div className='form-group mb-3'>
  //             <label>hour</label>
  //             <input
  //                 type="number"
  //                 name="hour"
  //                 value={hour}
  //                 onChange={(e) => setHour(e.target.value)}
  //                 className="form-control"             
  //             ></input>
  //             </div>
              
  //             <div className='form-group mb-3'>
  //             <button type='submit' value="envoyer"  className="btn btn-primary btn-sm float-end">
  //               enregistrer
  //               </button>  
  //             </div>
  //             </form>
  //             </div>
  //           </div>
  //         </div>
  //        </div>
  //       </div>