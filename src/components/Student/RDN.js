import React , {useState,useEffect} from "react"
import axios from 'axios'
import MarksList from "./MarksList";

function RDN(props) {

    let [data, setData] = useState([]);
    let [moyenne, setMoyenne] = useState(0);

    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch('SamplePDF.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'SamplePDF.pdf';
                alink.click();
            })
        })
      };
    
    let [isLoadingData, setIsLoadingData] = useState(true);
    let [isLoadingMoyenne, setIsLoadingMoyenne] = useState(true);

    useEffect(() => {
      axios.all([
          axios.get(`http://localhost:8000/api/student/all-marks/${props.year}/${props.id}`)
          .then( res => {
              console.log(res.data);
              setTimeout(() => {
                setData(res.data);
                setIsLoadingData(false);
              }, 3000);
          }),

          axios.get(`http://localhost:8000/api/student/average_point/${props.year}/${props.id}`)
          .then( res => {
              console.log(res.data);
              setTimeout(() => {
                setMoyenne(res.data);
                console.log(moyenne);
                setIsLoadingMoyenne(false);
              }, 3000);
          })

      ])
    }, [props.year, props.id])

  return (
    <div>
      <h3>Relevé de note de l'etudiant {props.id} pendant l'année scolaire {props.year - 1}-{props.year}</h3>
      
        { (isLoadingData) ? <p className="mt-5 ml-5 text-warning">Loading...</p> :""}

        {data && <MarksList data={data} />}

        {moyenne && 
          ( moyenne.message === 'Fail') ? <p>Tsy afaka mcalcul moyenne satria mbola misy examen tsy natao</p> : 
          <p>{moyenne.data}</p>
        }
       
      <button onClick={onButtonClick}> Export to pdf</button>  
    </div>
  )
}

export default RDN
