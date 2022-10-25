import React , {useState,useEffect} from "react";
import { useNavigate, useParams ,Link } from 'react-router-dom'
import loading from './../../assets/loading.gif'
import axios from 'axios'

function DetailModule() {
    const history = useNavigate();
    const {id} = useParams();
    let[isLoading, setIsLoading] = useState(true)
    let[data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/module/${id}`)
        .then( res => {
            console.log(res.data);
            setTimeout(() => {
              setData(res.data);
              setIsLoading(false);
            }, 3000);
        })
    }, [])
    
  return (
    <div>
        <div class="limiter">
            <div class="container-login100" >
                <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                { (isLoading) ? <p className="text-center h3">Please, wait a moment...<img src={loading}/></p>: 
                    <form class="login100-form validate-form">
                        <span class="login100-form-title p-b-49">
                            Detail module
                        </span>

                        <div>
                            <p className="h6 mb-2"><span className="text-primary"> Nom:</span> {data.module.name}</p>
                            <p className="h6 mb-2"><span className="text-primary"> Code:</span> {data.module.code}</p>
                            <p className="h6 mb-2"><span className="text-primary"> Unité d'enseignement:</span> {data.module.category}</p>
                            <p className="h6 mb-2"><span className="text-primary"> Heure:</span> {data.module.hour}</p>
                        </div>
                        <hr/>
                        <div>
                            <h5>List d'enseignant:</h5>
                            {  
                                data.module.teachers.map((t)=>{
                                    return(
                                        <p>
                                            <Link to={`/detailTeacher/${t.id}`}>
                                                <button className='text-dark h6'>{t.name}</button>
                                            </Link>
                                        </p>
                                    )
                                }) 
                            }
                            
                        </div>
                        <a href="/module" className="btn btn-dark mt-5">Retour</a>
                    </form>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailModule
