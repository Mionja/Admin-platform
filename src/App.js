import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import Student from "./components/Student/ListStudent";
import AddStudent from "./components/Student/AddStudent";
import Header from './components/Dashboard/Header';


export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for students and marks*/}
            <Route path='/' element={<Student/>} />
            <Route path="/addStudent" element={<AddStudent/>}/>
            <Route path="/dashboard" element={<Header/>}/>
            
          {/* Route for  modules*/}

          {/* Route for teachers */}
        </Routes>
      </div>
    </Router>
  );
}