import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import Student from "./Student/ListStudent";
import AddStudent from "./Student/AddStudent";
import Graph from "./Student/graph";

export default function App() {
  return (
    <Router>
      <div>
        {/* 👇️ Wrap your Route components in a Routes component */}
        <Routes>
            <Route path='/' element={<Student/>} />
            <Route path="/addStudent" element={<AddStudent/>}/>
            <Route path="/graphStudent" element={<Graph/>}/>
        </Routes>
      </div>
    </Router>
  );
}