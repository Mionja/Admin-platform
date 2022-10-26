import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function AddTable() {
  const [data, setData] = useState([]);
    const deleteModule =  async(e,id) =>{
    e.preventDefault();
    const click = e.currentTarget;
    click.innerText = "suppression";
    const res = await 
    axios
    .delete(`http://localhost:8000/api/module/${id}`)
    // w.WriteHeader(http.StatusOK);
    if(res.data.status ===200){
      click.closest('tr').remove();
    //  Swal.fire({
    //   title: 'Supprimer!',
    //   text: "Voulez-vous vraiment supprimer l'etudiant ? ",
    //   icon: 'error',
    //   confirmButtonText: 'OUI'
    // })
    }}

  useEffect(() => {
    axios.get("http://localhost:8000/api/module").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
      <h1 align="centre">Les listes des modules</h1>
      <Link to={'/Ajout'}>
              <button className="btn btn-info float-right mr-5">Ajouter une module</button>
            </Link>
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <td>Nom</td>
            <td>code</td>
            <td>Heure</td>
          </tr>
        </thead>
        <tbody>
          {data.map((Item) => {
            return (
              <tr key={Item.module.id}>
                <td>{Item.module.name}</td>
                <td>{Item.module.code}</td>
                <td>{Item.module.hour}</td>
                <button
                          type="submit"
                          className="btn btn-danger"
                          onClick = {(e) =>deleteModule(e,Item.module.id)}
                        >
                          suprimer
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default AddTable;


// import { useState,useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom'

// function ListModule(props) {
//   const navigate = useNavigate()
//   let [data,setData] = useState ([]);
  

//   const deleteModule =  async(e,id) =>{
//     e.preventDefault();
//     const click = e.currentTarget;
//     click.innerText = "suppression";
//     const res = await 
//     axios
//     .delete(`http://127.0.0.1:8000/api/module/${id}`)
//     // w.WriteHeader(http.StatusOK);
//     if(res.data.status ===200){
//       click.closest('tr').remove();
//     //  Swal.fire({
//     //   title: 'Supprimer!',
//     //   text: "Voulez-vous vraiment supprimer l'etudiant ? ",
//     //   icon: 'error',
//     //   confirmButtonText: 'OUI'
//     // })
//     }}


//   useEffect(() => {
//     const res = axios.get('http://localhost:8000/api/module').then((res) => {
//         console.log(res);
//         setData(res.data);
//       });
//     }, []);


// return (
   
//       <div className="container mb-5">
//             <h1 align = 'center' className="mt-3 mb-5">Les listes de module des {props.grade}</h1>
//             <Link to={`/copyModules/${props.grade}/${props.year}`}>
//               <button className="btn btn-warning float-right">Copier tous ces modules</button>
//             </Link>
//             <Link to={'/Ajout'}>
//               <button className="btn btn-info float-right mr-5">Ajouter une module</button>
//             </Link>
          
//             <table class="table table-striped table-hover">
//             <thead class="thead-dark">
//             <tr>
//             <td>Nom</td>
//             <td>Code</td>
//             <td>Heure</td>
//             <td colSpan={2}></td>
//             </tr>
//             </thead>
//             <tbody>
              
//                     {data.map((data)=>{
//                     return( 
//                     <tr key={data.module.id}>
//                     <td>
//                     <Link to={`/detailModule/${data.module.id}`} className='h6 text-dark'>
//                           {data.module.name}
//                     </Link>
//                       </td>
//                     <td>{data.module.code}</td>
//                     <td>{data.module.hour}</td>
//                     <td>
//                       <Link to={`/editModule/${data.module.id}`}  className='text-primary'>Modifier</Link>
//                       {/* <a href="/editModule/{data.module.id}" className='btn btn-warning ml-5'>Edit</a> */}
//                       </td>
//                       <button
//                           type="submit"
//                           className="btn btn-danger"
//                           onClick = {() =>deleteModule(module.id)}
//                         >
//                           suprimer
//                         </button>
//                     </tr>
//                     )
//                 })}
//                 </tbody>
//                 </table>
//                 <div className="mt-5 mb-5">.</div>
                
//     </div>
//   )
// }

// export default ListModule