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
import AddMark from './components/Student/AddMark';
import ResultHeader from './components/Result/ResultHeader';
import ImportStudent from './components/Student/ImportStudent';

import ModuleHeader from './components/Module/ModuleHeader';
import DetailModule from './components/Module/DetailModule';
import AddModule from './components/Module/AddModule';
import EditModule from './components/Module/EditModule';
import CopyModule from './components/Module/CopyModule';

import ListTeacher from './components/Teacher/ListTeacher';
import AddTeacher from './components/Teacher/AddTeacher';
import EditTeacher from './components/Teacher/EditTeacher';
import DetailTeacher from './components/Teacher/DetailTeacher';

// import Marks from './components/Mark/Marks';
import HeaderRetake_exam from './components/Retake_exam/Header';
import SendNotification from './components/Retake_exam/SendNotification';
import SemesterMarks from './components/Student/SemesterMarks';
// import MarksExcel from './components/Mark/MarksExcel';
import Import from './components/Mark/Import';
import PassStudent from './components/Student/PassStudent';
import SemesterResult from './components/Result/SemesterResult';


export default function App() {
  
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Accept'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
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
            {/* <Route path="/mark" element={<Marks/>}/>      */}
            <Route path="/addMark/:grade/:year" element={<AddMark/>}/>    
            <Route path="/RDN/semester/:semester/:year/:id" element={<SemesterMarks/>}/>     
            {/* <Route path="/mark" element={<MarksExcel/>}/>   */}
            <Route path="/mark" element={<Import/>}/>  
            <Route path="/result" element={<ResultHeader/>}/>    
            <Route path="/pass/:grade/:year" element={<PassStudent/>}/>   
            <Route path="/import/students" element={<ImportStudent/>}/>   
            <Route path="/result/semester/:semester/:year/:grade" element={<SemesterResult/>}/>    

          {/* Route resaka module*/}
            <Route path='/module' element={<ModuleHeader/>} />
            <Route path='/detailModule/:id' element={<DetailModule/>} />
            <Route path="/addModule" element={<AddModule/>}/>      
            <Route path="/editModule/:id" element={<EditModule/>}/>  
            <Route path="/copyModules/:grade/:year" element={<CopyModule/>}/>        

          {/* Route resaka mpampianatra */}
            <Route path='/teacher' element={<ListTeacher/>} />
            <Route path="/addTeacher" element={<AddTeacher/>}/>      
            <Route path="/editTeacher/:id" element={<EditTeacher/>}/>     
            <Route path="/detailTeacher/:id" element={<DetailTeacher/>}/>        

          {/* Route resaka rattrapages rehetra */}
          <Route path="/retake-exam" element={<HeaderRetake_exam/>}/>     
          <Route path="/sendNotification/:module" element={<SendNotification   />}/>     

        </Routes>
      </div>
    </Router>
    
    
        </div>
  );
}