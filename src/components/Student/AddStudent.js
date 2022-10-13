import React, {setState, useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'


const AddStudent = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [grade, setGrade] = useState('');
    const [group, setGroup] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [school_year, setSchool_year] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const student = { name, email, password, grade, group, age, gender, school_year };
        console.log(student);

        const res = await axios({
            method: 'POST',
            url: "http://127.0.0.1:8000/api/student",
            data: student,
          })
        if (res.data.status === 200 ){
          console.log(res.data.status);
          alert("Un etudiant est ajouté");
        }        
        // axios.defaults.xsrfCookieName = "csrftoken";
        // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.headers.common = {
        //     'X-Requested-With': 'HttpRequest',
        //     'X-CSRF-TOKEN': window.csrf_token,
        // };
        
        // axios.defaults.withCredentials = true;
        // await axios.post('http://localhost:8000/api/student', student).then(res => {
        //     if (res.data.status === 200) {
        //         console.log('student added successfully');
        //     }
        // })
        // setTimeout(()=>{
        // await fetch(' http://localhost:8000/api/student', {
        //     method: 'POST',
        //     headers: { "Accept": "application/json",
        //                "Content-Type": "application/json",
        //              },
        //     xsrfCookieName: "csrftoken",
        //     xsrfHeaderName: "X-CSRFTOKEN",
        //     body: JSON.stringify(student)
        // })
        // .then(() => {
        //     console.log('new student added');
        //     // history.push('/')
        // })
        // .catch(error=>{setState({errorMessage:error.toString() });
        // console.error('There was an error', error)
        // })
        // // },3000) 
    }

       
    return(
<div className="limiter">

		<div className="container-login100" >
			<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">

				<form className="login100-form validate-form"  onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-49">
						Ajout d'un étudiant
					</span>

					<div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Nom </span>
						<input className="input100" 
                  type="text"
                  name="name"
                  value = {name}
                  onChange={(e) => setName(e.target.value)}
                  classNameName="form-control"  ></input>
						
					</div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Email </span>
						<input className="input100" 
                  type='text'
                  id="email" 
                  name="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  classNameName="form-control"  ></input>
						
					</div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Genre </span>
						<input className="input100" 
                   id="gender" 
                   name="gender" 
                   required 
                   value={gender}
                   onChange={(e) => setGender(e.target.value)}
                   type="text"
                  classNameName="form-control"  ></input>
						
					</div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Age </span>
						<input className="input100" 
                    id="age" 
                    name="age" 
                    required 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                  classNameName="form-control"  ></input>
						
					</div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Classe </span>
						<input className="input100" 
                   id="grade" 
                   name="grade" 
                   value={grade}
                   onChange={(e) => setGrade(e.target.value)}
                   type="text"
                  classNameName="form-control"  ></input>
						
					</div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Groupe </span>
						<input className="input100" 
                  id="group" 
                  name="group" 
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                   type="text"
                  classNameName="form-control"  ></input>
						
					</div>

                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Année scolaire </span>
						<input className="input100" 
                  id="school_year" 
                  name="school_year" 
                  value={school_year}
                  onChange={(e) => setSchool_year(e.target.value)}
                   type="text"
                  classNameName="form-control"  ></input>
						
					</div>

                    
                    <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
						<span className="label-input100" > Mot de passe </span>
						<input className="input100" 
                 id="password" 
                 name="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                   type="password"
                  classNameName="form-control"  ></input>
						
					</div>

                    <button type='submit' value="envoyer"  className="btn btn-primary btn-sm ">
                     Enregistrer  
                    </button>
                    <span className="h3 ml-5">
                        <Link to={'/student'}>Back</Link>
                    </span>
                </form>
            </div>
        </div>
           
        </div>
    );
}


export default AddStudent;