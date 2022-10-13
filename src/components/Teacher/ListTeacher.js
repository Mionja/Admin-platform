import axios from 'axios';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

function   Table (){
    const [data,setData] = useState ([]);

    useEffect (() =>{
     axios
    .get ('http://localhost:8000/api/teacher').then((res)=>{
        setData(res.data)
    })
    },[]);
    console.log(data);
    return (
        <div>
            <h1 align = 'centre'>Les listes des Professeurs</h1>
            <Link to={'/addTeacher'}>
                <button className="btn btn-info float-right mr-5">Ajouter un Professeurs</button>
            </Link>
            <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
            <td>id</td>
            <td>Nom</td>
            <td>Email</td>
            <td>Diplome</td>
            <td>modules</td>

            </tr>
            </thead>
            <tbody>
                {data &&  data.map((prof)=>{
                    return(
                    <tr key={prof.teacher.id}>
                    <td>{prof.teacher.id}</td>
                    <td>{prof.teacher.name}</td>
                    <td>{prof.teacher.email}</td>
                    <td>{prof.teacher.diploma}</td>
                    <td>{prof.teacher.modules.code}</td>
                    </tr>)
                })}
            </tbody>
            </table>
        </div>

    )
} 



export default Table;

// import React, {useState, useEffect} from 'react';


// import {Link} from 'react-router-dom';
// import axios from 'axios';
// import swal from 'sweetalert';


// function ViewCategory() {

//     const [loading, setLoading] = useState(true);
//     const [categorylist, setCategorylist] = useState([]);

//     useEffect(() => {
//         let isMounted = true;
//        // http://127.0.0.1:8000/api/${grade}

//         axios.get(``).then(res=>{
//             if(isMounted)
//             {
//                 if(res.status === 200)
//                 {
//                     setCategorylist(res.data.category)
//                     setLoading(false);
//                 }
//             }
//         });

//         return () => {
//             isMounted = false
//         };

//     }, []);

//     const deleteCategory = (e, id) => {
//         e.preventDefault();
        
//         const thisClicked = e.currentTarget;
//         thisClicked.innerText = "Deleting";

//         axios.delete(`/api/delete-category/${id}`).then(res=>{
//             if(res.data.status === 200)
//             {
//                 swal("Success",res.data.message,"success");
//                 thisClicked.closest("tr").remove();
//             }
//             else if(res.data.status === 404)
//             {
//                 swal("Success",res.data.message,"success");
//                 thisClicked.innerText = "Delete";
//             }
//         });

//     }

//     var viewcategory_HTMLTABLE = "";
//     if(loading)
//     {
//         return <h4>Loading Category...</h4>
//     }
//     else
//     {
//         viewcategory_HTMLTABLE = 
//         categorylist.map( (item) => {
//             return (
//                 <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.name}</td>
//                     <td>{item.email}</td>
//                     <td>{item.status}</td>
//                     <td>
//                         <Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
//                     </td>
//                     <td>
//                         <button type="button" onClick={ (e) => deleteCategory(e, item.id) } className="btn btn-danger btn-sm">Delete</button>
//                     </td>
//                 </tr>
//             )
//         });
//     }

//     return  (
//         <div className="container px-4">
//             <div className="card mt-4">
//                 <div className="card-header">
//                     <h4>Category List 
//                         <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Add Category</Link>
//                     </h4>
//                 </div>
//                 <div className="card-body">
//                     <table className="table table-bordered table-striped">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>nom</th>
//                                 <th>Email</th>
//                                 <th>Status</th>
//                                 <th>Edit</th>
//                                 <th>Delete</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {viewcategory_HTMLTABLE}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ViewCategory;



