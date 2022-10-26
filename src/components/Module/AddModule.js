import React, { useState } from 'react';
// import react from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './../../assets/admin/css/util.css';
import './../../assets/admin/css/main.css';
import { Link, useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router';



function Modules() {
  
  // <script type="text/javascript"> 
  // window.csrf_token = "{ csrf_token() }"
  // </script>
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [hour, setHour] = useState(9);
  const [year, setYear] = useState(2020);
  const [category, setCategory] = useState('Informatique programmation');
  const [credits, setCredits] = useState(1);

  const [c, setC] = useState('INFO_'); 
  const [ode, setOde] = useState(110); 
  // let [code, setCode] = useState(c + ode);

  const handlesubmit= async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name) 
    formData.append("code", c + ode) 
    formData.append("hour", hour) 
    formData.append("year", year) 
    formData.append("credits", credits) 
    formData.append("category", category) 
  const res = await axios({
      method: 'POST',
      url: "http://127.0.0.1:8000/api/module",
      data: formData,
      
    })
    console.log(res.status);
    if (res.status === 200) {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Module Ajouter avec Succes',
        showConfirmButton: true,
      })
      // navigate('/module')
      // alert("Etudiant Ajouter avec Succes");
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
                  required
                  type="text"
                  name="name"
                  value = {name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"  ></input>
						
					</div>

          <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100">Unité d'enseignement</span>
            <select className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                      <option value="Informatique programmation" >Informatique programmation</option>  
                      <option value="Informatique système et réseau" >Informatique système et réseau</option>  
                      <option value="Mathématiques" >Mathématiques</option>  
                      <option value="Entreprise et communication" >Entreprise et communication</option>  
                      <option value="Projet de diplôme" >Projet de diplôme</option>  
                      <option value="Fondamentaux RSI" >Fondamentaux RSI</option>  
                      <option value="Complémentaire RSI" >Complémentaire RSI</option>  
                      <option value="Complémentaire IDEV" >Complémentaire IDEV</option>  
                      <option value="Fondamentaux IDEV" >Fondamentaux IDEV</option>  
                      <option value="Enseignement général" >Enseignement général</option>  
                      <option value="Entrepreneurial" >Entrepreneurial</option>  
                      <option value="Fondamentaux du développement MSI" >Fondamentaux du développement MSI</option>  
                      <option value="Gestion des systèmes d'information et de conception" >Gestion des systèmes d'information et de conception</option>  
                      <option value="Système d'Information Avancé et Science de Données MSI" >Système d'Information Avancé et Science de Données MSI</option>  
                      <option value="Complément opérationnel" >Complément opérationnel</option>
                      <option value="Complément management">Complément management</option>
            </select>
					</div>

					<div class="wrap-input100 validate-input">
            <div className='row'>
						<span className="label-input100 col" > 
              <select className="form-control"
              value={c}
              onChange={(e) => setC(e.target.value)}
              >
                <option value="INFO_">INFO_</option>
                <option value="MATH_">MATH_</option>
                <option value="ENTR_">ENTR_</option>
                <option value="LANG_">LANG_</option>
                <option value="PROJ_">PROJ_</option>
              </select>
            </span>
						<input
                  required
                  type="number"
                  name="code"
                  min={100}
                  max={1100}
                  value={ode}
                  onChange={(e) => setOde(e.target.value)}
                  className="form-control col"></input>
            </div>
					</div>
          <div class="text-right p-t-8 p-b-31">
						<a href="#">
						</a>
					</div>

          <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100">Heure</span>
						<input class="input100" 
                  required  
                  type="number"
                   name="hour"
                   min={9}
                   max={50}
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  className="form-control"  ></input>
					</div>

          <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100">Credits</span>
						<input class="input100" 
                  required  
                  type="number"
                   name="credits"
                   min={1}
                   max={15}
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  className="form-control"  ></input>
					
					</div>

          <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100">Year</span>
						<input class="input100" 
                  required  
                  type="number"
                   name="year"
                   min={2020}
                   max={2030}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
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
            <p className='text-center mt-2' >Revenir dans liste module? <a href="#">Retour</a></p>
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


export default Modules;

