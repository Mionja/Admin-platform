import React from "react";
import { Link } from 'react-router-dom'

function Student ()
{
    return(
        <div>
            <div>
                LIST OF STUDENTS
                <h3>
                <p>
                <Link to={'addStudent'}>Add Student</Link>
                </p>
                <p>
                <Link to={'graphStudent'}>Graph of Student</Link>
                </p>
            </h3>
            </div>
        </div>
    );
}
export default Student;