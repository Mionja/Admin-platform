import { Data } from "./table";
import { useState } from "react";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2'
import axios from 'axios'

//import { Link } from 'react-router-dom';

function Import() {
  const [excelData, setExcelData] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  
console.log()
  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type)
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("no excel file");
        setExcelFile(null);
      }
    } else {
      console.log("select file");
    }
  };
  const handleSubmit =  (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      console.log('excelData',excelData);
    } else {
      setExcelData(null);
    }
  };
  const save = async(e)=>{
    e.preventDefault()

    const res = await axios({
      method: 'POST',
      url: "http://127.0.0.1:8000/api/import",
      data: excelData,
      
    })
    console.log(res.status);
    if (res.status === 200) {
      console.log(res.data);
      Swal.fire({
        icon: 'success',
        title: 'Test success',
        showConfirmButton: true,
      })
    }
    
  }

  return (
    <div class="limiter">
		<div class="container-login100" >
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<form class="login100-form validate-form" onSubmit={handleSubmit}>
              <span class="login100-form-title p-b-49">
                Ajout notes
              </span>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-4'>
                          <input type="file" onChange={handleFile}></input>
                          {excelFileError && (
                            <div className="text-danger">{excelFileError}</div>
                          )}
                    </div>
                  </div>
                  <div className='row mt-3'>
                    <div className='col-5'></div>
                    <button className='col-3 btn btn-primary' type="submit">Importer</button>
                  </div>
                </form>
            </div>
        </div>

        <div className="container mb-5">
              <h1>Overview of data inside the file: </h1>

              {excelData === null && <span className="h6 mb-5">No filed selected <p className="mb-5">.</p></span>}
              {excelData !== null && (
                <div className="form">
                  <table className="table table-hover table-border">
                    <thead>
                      <tr>
                        <td>Email</td>
                        <td>Classe</td>
                        <td>Groupe</td>
                        <td>Module</td>
                        <td>Note</td>
                        <td>Année scolaire</td>
                        <td>Semestre</td>
                      </tr>
                    </thead>
                    <tbody>
                    <Data excelData={excelData} />
                    </tbody>
                  </table>
                  <button onClick={save} className="btn btn-info">Enregistrer</button>
                  <p className="mb-5">.</p>
                </div>
              )}
            
        </div>
    </div>
  );

  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     axios.get("http://localhost:8000/api/student").then((res) => {
  //       setData(res.data);
  //     });
  //   }, []);
  //   const deleteStudent = async (e, id) => {
  //     e.preventDefault();
  //     const click = e.currentTarget;
  //     click.innerText = "Deleting";
  //     const res = await axios.delete(`http://localhost:8000/api/student/${id}`);
  //     if (res.data.status === 200) {
  //       click.closest("tr").remove();
  //     }
  //   };

  //   return (
  //     <div>
  //       <table class="table table-striped">
  //         <thead class="thead-dark">
  //           <tr>
  //             <td>Nom</td>
  //             <td>email</td>
  //             <td>phone</td>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {data.map((student) => {
  //             return (
  //               <tr key={student.id}>
  //                 <td>{student.name}</td>
  //                 <td>{student.email}</td>
  //                 <td>{student.phone}</td>
  //                 <td>
  //                   <button
  //                     type="submit"
  //                     value="Envoyer"
  //                     className="btn btn-danger"
  //                     onClick={(e) => deleteStudent(e, student.id)}
  //                   >
  //                     Delete
  //                   </button>
  //                 </td>
  //               </tr>
  //             );
  //           })}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
}

export default Import;
// import React, { useState } from "react";
// // import react from 'react';
// import axios from "axios";

// //import { link } from 'react-router-dom';
// //import { useHistory } from 'react-router';

// function Table() {
//   // <script type="text/javascript">
//   // window.csrf_token = "{ csrf_token() }"
//   // </script>
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   // const [password, setPassword] = useState([]);

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("phone", phone);

//     const res = await axios({
//       method: "POST",
//       url: "http://127.0.0.1:8000/api/student",
//       data: formData,
//     });
//     console.log(res.status);
//     if (res.status === 200) {
//       //console.log(res);

//       alert("Etudiant Ajouter avec Succes");
//     }
//   };
//   return (
//     <div class="limiter">
//       <div class="container-login100">
//         <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
//           <form class="login100-form validate-form" onSubmit={handlesubmit}>
//             <div
//               class="wrap-input100 validate-input m-b-23"

//             >
//               <span class="label-input100"> Nom </span>
//               <input
//                 class="input100"
//                 type="text"
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="form-control"
//               ></input>
//             </div>

//             <div
//               class="wrap-input100 validate-input"

//             >
//               <span class="label-input100"> email</span>
//               <input
//                 class="input100"
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-control"
//               ></input>
//             </div>
//             <div class="text-right p-t-8 p-b-31">
//               <a href="#"></a>
//             </div>

//             <div
//               class="wrap-input100 validate-input m-b-23"

//             >
//               <span class="label-input100">phone</span>
//               <input
//                 class="input100"
//                 type="number"
//                 name="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="form-control"
//               ></input>
//             </div>

//             <div class="text-right p-t-8 p-b-31">
//               <a href="#"></a>
//             </div>

//             <button
//               type="submit"
//               value="envoyer"
//               className="btn btn-primary btn-sm "
//             >
//               Enregistrer
//             </button>
//             <div class="text-right p-t-8 p-b-31">
//               <a href="#"></a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Table;
