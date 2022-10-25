import React , {useState,useEffect, useRef} from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import loading from './../../assets/loading.gif';
import axios from 'axios'

function EditModule() {

  const history = useNavigate();
  const {id} = useParams();
  let [data,setData] = useState ([]);
  let[isLoading, setIsLoading] = useState(true);

  useEffect  (() =>{
        fetch(`http://localhost:8000/api/module/${id}`).then((res)=>{
            return res.json()
        }).then((data)=>{
          setTimeout(() => {
            setData(data);
            setIsLoading(false);
          }, 3000);
        })
  },[]);

  const name = useRef(null)
  const c = useRef(null)
  const ode = useRef(null)
  const hour = useRef(null)
  const year = useRef(null);
  const category = useRef(null);
  const credits = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('name',name.current.value);
    console.log('code',c.current.value + ode.current.value);
    console.log('hour',hour.current.value);
    console.log('year',year.current.value);
    console.log('credits',credits.current.value);
    console.log('category',category.current.value);
    const formData = new FormData()
    formData.append('name',name.current.value);
    formData.append('code',c.current.value + ode.current.value);
    formData.append('hour',hour.current.value);
    formData.append('year',year.current.value);
    formData.append('credits',credits.current.value);
    formData.append('category',category.current.value);
    console.log(formData);
    // const res = await axios({
    //     method: 'PUT',
    //     url: `http://127.0.0.1:8000/api/module/${id}`,
    //     data: module,
    //   })
    // if (res.status === 200 ){
    //   console.log(res.data.status);
    //   alert("Un etudiant a été modifié(e)");
    // }        
  }
  
  return (
    <div class="limiter">
		<div class="container-login100" >
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
      { (isLoading) ? <p className="text-center h3">Please, wait a moment...<img src={loading}/></p>: 
				<form class="login100-form validate-form"  onSubmit={handleSubmit}>
					<span class="login100-form-title p-b-49">
						Modification module
					</span>

          <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100" > Nom </span>
						<input class="input100" 
                  type="text"
                  name="name"
                  defaultValue={data.module.name}
                  ref={name}
                  className="form-control"  />
					</div>

          <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100">Unité d'enseignement</span>
            <select className="form-control"
                defaultValue={data.module.category}
                ref={category}>
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
              defaultValue={c}
              ref={c}
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
                  defaultValue={ode}
                  ref={ode}
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
                  defaultValue={data.module.hour}
                  ref={hour}
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
                  defaultValue={data.module.credits}
                  ref={credits}
                  className="form-control"  ></input>
					
					</div>

          <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span class="label-input100">Year</span>
						<input class="input100" 
                  required  
                  type="number"
                   name="year"
                   min={2021}
                  defaultValue={data.module.year}
                  ref={year}
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
    } 
			</div>
		</div>
	</div>
//     <div class="limiter">
// 		<div class="container-login100" >
// 			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
//       { (isLoading) ? <p className="text-center h3">Please, wait a moment...<img src={loading}/></p>: 
// 				<form class="login100-form validate-form" onSubmit={handleSubmit}>
// 					<span class="login100-form-title p-b-49">
// 						Modification module {id}
// 					</span>
                  
// 					<div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
// 						<span class="label-input100" > Nom </span>
// 						<input class="input100" 
//                   type="text"
//                   name="name"
//                   defaultValue={data.module.name}
//                   ref={name}
//                   className="form-control"  ></input>
						
// 					</div>

// 					<div class="wrap-input100 validate-input" data-validate="Password is required">
// 						<span class="label-input100"> Code </span>
// 						<input class="input100"  
//                   type="text"
//                   name="code"
//                   ref={code}
//                   defaultValue={data.module.code}
//                   className="form-control"></input>
						
// 					</div>
//           <div class="text-right p-t-8 p-b-31">
// 						<a href="#">
// 						</a>
// 					</div>

//           <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
// 						<span class="label-input100">Heure</span>
// 						<input class="input100" 
//                   type="number"
//                    name="hour"
//                    ref={hour}
//                   defaultValue={data.module.hour}
//                   className="form-control"  ></input>
					
// 					</div>
					
// 					<div class="text-right p-t-8 p-b-31">
// 						<a href="#">
// 						</a>
// 					</div>
				
//           <div className='row'>
//           <button type='submit' value="envoyer"  className="btn btn-primary ">
//            Enregistrer
//            </button>
//            <Link to={'/module'}>
//             <p className='text-center mt-2' >Revenir dans liste module? <a href="#">Retour</a></p>
//            </Link>
//            </div>

//            <div class="text-right p-t-8 p-b-31">
// 						<a href="#">
// 						</a>
// 					</div>

// 				</form>
// }
// 			</div>
// 		</div>
// 	</div>

     
  )
}

export default EditModule
