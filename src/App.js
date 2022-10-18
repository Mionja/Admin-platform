import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import './assets/admin/css/styles.css';
import './assets/admin/js/scripts';

import Header from './components/Dashboard/Header';
import Navbar from './components/Layouts/Navbar';

import HeaderStudent from './components/Student/HeaderStudent';
import AddStudent from "./components/Student/AddStudent";
import EditStudent from "./components/Student/EditStudent";
import DetailStudent from './components/Student/DetailStudent';

import ModuleHeader from './components/Module/ModuleHeader';
import DetailModule from './components/Module/DetailModule';
import AddModule from './components/Module/AddModule';
import EditModule from './components/Module/EditModule';

import ListTeacher from './components/Teacher/ListTeacher';
import AddTeacher from './components/Teacher/AddTeacher';
import EditTeacher from './components/Teacher/EditTeacher';
import DetailTeacher from './components/Teacher/DetailTeacher';

import Marks from './components/Mark/Marks';
import HeaderRetake_exam from './components/Retake_exam/Header';
// import MarksExcel from './components/Mark/MarksExcel';

export default function App() {
  
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.delete['Accept'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

  return (
    
    <div>
      <Navbar/>
    <Router>
      <div>
        <Routes>
          {/* Route  mikasika mpianatra sy ny note-ny*/}
            <Route path="/" element={<Header/>}/>
            <Route path='/student' element={<HeaderStudent/>} />
            <Route path="/addStudent" element={<AddStudent/>}/>      
            <Route path="/editStudent/:id" element={<EditStudent/>}/> 
            <Route path="/detailStudent/:id" element={<DetailStudent/>}/>    
            <Route path="/mark" element={<Marks/>}/>     
            {/* <Route path="/mark" element={<MarksExcel/>}/>     */}
                   
          {/* Route resaka module*/}
            <Route path='/module' element={<ModuleHeader/>} />
            <Route path='/detailModule/:id' element={<DetailModule/>} />
            <Route path="/addModule" element={<AddModule/>}/>      
            <Route path="/editModule/:id" element={<EditModule/>}/>        

          {/* Route resaka mpampianatra */}
            <Route path='/teacher' element={<ListTeacher/>} />
            <Route path="/addTeacher" element={<AddTeacher/>}/>      
            <Route path="/editTeacher/:id" element={<EditTeacher/>}/>     
            <Route path="/detailTeacher/:id" element={<DetailTeacher/>}/>        

          {/* Route resaka rattrapages rehetra */}
          <Route path="/retake-exam" element={<HeaderRetake_exam/>}/>        

        </Routes>
      </div>
    </Router>
    
    
        </div>
  );
}