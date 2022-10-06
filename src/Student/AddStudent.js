import React, {setState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'


function AddStudent ()
{
    const state = {
        name:'',
        email:'',
        gender:'',
        age:'',
        grade:'',
        group:'',
        school_year:'',
        password:'',
    }

    const handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    const handleForm = async (e) => {
        e.preventDefault()

        const res = await axios.post('http://localhost:8000/api/student', this.state);
        if (res.data.status === 200) {
            console.log('Student added successfully');
            this.setState({
                name:'',
                email:'',
                gender:'',
                age:'',
                grade:'',
                group:'',
                school_year:'',
                password:'',
            });
        }
    }
    return(
        <div>
            <h1>
               ADD STUDENT
            </h1>

            <form onSubmit={ handleForm }>
                <label htmlFor="name">Name: </label><br/>
                <input 
                    id="name" 
                    name="name" 
                    onChange={this.handleInput}
                    value={this.state.name}
                    type="text"/>

<label htmlFor="email">Email: </label><br/>
                <input 
                    id="email" 
                    name="email" 
                    onChange={this.handleInput}
                    value={this.state.email}
                    type="text"/>

<label htmlFor="gender">Gender: </label><br/>
                <input 
                    id="gender" 
                    name="gender" 
                    onChange={this.handleInput}
                    value={this.state.gender}
                    type="text"/>

<label htmlFor="age">Age: </label><br/>
                <input 
                    id="age" 
                    name="age" 
                    onChange={this.handleInput}
                    value={this.state.age}
                    type="text"/>

<label htmlFor="grade">Grade: </label><br/>
                <input 
                    id="grade" 
                    name="grade" 
                    onChange={this.handleInput}
                    value={this.state.grade}
                    type="text"/>
<label htmlFor="group">Group: </label><br/>
                <input 
                    id="group" 
                    name="group" 
                    onChange={this.handleInput}
                    value={this.state.group}
                    type="text"/>
 <label htmlFor="school_year">School year: </label><br/>
                <input 
                    id="school_year" 
                    name="school_year" 
                    onChange={this.handleInput}
                    value={this.state.school_year}
                    type="text"/>
 <label htmlFor="password">Password: </label><br/>
                <input 
                    id="password" 
                    name="password" 
                    onChange={this.handleInput}
                    value={this.state.password}
                    type="text"/>
                <button type="submit" >Submit</button>
            </form>
            <h3>
                <Link to={'/'}>Back</Link>
            </h3>
        </div>
    );
}
export default AddStudent;