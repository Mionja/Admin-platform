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
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.headers.common = {
        //     'X-Requested-With': 'HttpRequest',
        //     'X-CSRF-TOKEN': window.csrf_token,
        // };
        
        axios.defaults.withCredentials = true;
        await axios.post('http://localhost:8000/api/student', student).then(res => {
            if (res.data.status === 200) {
                console.log('student added successfully');
            }
        })
        // setTimeout(()=>{
        // fetch('http://localhost:8000/api/student', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(student)
        // }).then(() => {
        //     console.log('new student added');
        //     // history.push('/')
        //     })
        // },3000) 
        console.log(student);
    }

       
    return(
        <div style={{marginLeft: 20+"px"}}>
            <h1>
               Ajouter un etudiant
            </h1>

            <form onSubmit={ handleSubmit }>
                <label htmlFor="name">Name: </label><br/>
                <input 
                    id="name" 
                    name="name" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"/>
<br/>
<label htmlFor="email">Email: </label><br/>
                <input 
                    id="email" 
                    name="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"/>
<br/>
<label htmlFor="gender">Gender: </label><br/>
                <input 
                    id="gender" 
                    name="gender" 
                    required 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    type="text"/>
<br/>
<label htmlFor="age">Age: </label><br/>
                <input 
                    id="age" 
                    name="age" 
                    required 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"/>
<br/>
<label htmlFor="grade">Grade: </label><br/>
                <input 
                    id="grade" 
                    name="grade" 
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    type="text"/><br/>
<label htmlFor="group">Group: </label><br/>
                <input 
                    id="group" 
                    name="group" 
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    type="text"/><br/>
 <label htmlFor="school_year">School year: </label><br/>
                <input 
                    id="school_year" 
                    name="school_year" 
                    value={school_year}
                    onChange={(e) => setSchool_year(e.target.value)}
                    type="text"/><br/>
 <label htmlFor="password">Password: </label><br/>
                <input 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"/><br/>
                <button type="submit" >Submit</button>
            </form>
            <h3>
                <Link to={'/'}>Back</Link>
            </h3>
        </div>
    );
}


export default AddStudent;