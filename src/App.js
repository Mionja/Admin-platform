import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import Student from "./Student/ListStudent";
import AddStudent from "./Student/AddStudent";
import Dashboard from "./Student/Dashboard";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for students and marks*/}
            <Route path='/' element={<Student/>} />
            <Route path="/addStudent" element={<AddStudent/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            
          {/* Route for  modules*/}

          {/* Route for teachers */}
        </Routes>
      </div>
    </Router>
  );
}