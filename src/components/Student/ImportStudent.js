import { Data } from "./Excel/table";
import { useState } from "react";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2'
import axios from 'axios'


function ImportStudent() {
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
      url: "http://127.0.0.1:8000/api/import/students",
      data: excelData,
    })
    console.log(res.status);
    if (res.status === 200) {
      console.log(res.data);
      Swal.fire({
        icon: 'success',
        title: 'Test add students success',
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
                Ajout Etudiants
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
                        <td>Nom</td>
                        <td>Email</td>
                        <td>Genre</td>
                        <td>Age</td>
                        <td>Classe</td>
                        <td>Groupe</td>
                        <td>Année scolaire</td>
                        <td>Mot de passe</td>
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
}

export default ImportStudent;
