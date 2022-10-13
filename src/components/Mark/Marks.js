import React,{ useState } from 'react'
import axios from 'axios'


function Marks() {
    const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:8000/mark';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
        console.log(response.data);
    });

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
                            <input type="file" onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                    <div className='col-3'></div>
                    <button classname="btn btn-dark mt-3" type="submit">Importer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Marks