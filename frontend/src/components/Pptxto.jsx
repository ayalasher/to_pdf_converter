import { useState } from "react"
import axios from "axios"
import styles from "./styles.module.css"
export default function Pptxto() {

    const [file ,setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState("")

    function handleuploadedfile(e) {
        setFile(e.target.files[0])   
    }

    const handleUpload = async () => {
        if (!file) {
          setError('Please upload a .pptx file.');
          return;
        }
        console.log("inside handle upload function");
        console.log("file to upload is " , file );
        
        
    
        setError('');
        setIsLoading(true);
        
        try {
          const formData = new FormData();
          formData.append('file', file);

          console.log("before axios operation");
          
          const response = await axios.post('http://localhost:3000/convert/pptx', formData , {
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob', // Important to handle binary files
          }); 
          console.log("after axios operation");
          
          console.log(response.data);
          
    
          // Create a download link for the converted PDF
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'converted.pdf');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          console.log("after creating a download link");
          
        } catch (err) {
          console.error(err);
          setError('An error occurred while converting the file.');
        } finally {
          setIsLoading(false);
        }
      };


    return <div className={styles.wordmaindiv}  >
        <div className={styles.wordpage} >

            <div className={styles.displayblockdiv} >
            <div>
            <p className={styles.mainheadingtxt} >Choose Power-Point document to upload for conversion</p>     
            </div>
        <div className={styles.labelandinput} >
        <label className={styles.labeltxt} htmlFor="document upload">Document upload.</label> <br />
        <label className={styles.labeltxt} htmlFor="document upload">The converted doc is going to be automatically downloaded .</label> <br />
        <input className={styles.input} type="file" accept=".pptx" onChange={handleuploadedfile} />  <br />
        </div>

        <div className={styles.btnanderror} >
        <button className={styles.convertbtn2} onClick={handleUpload} disabled={isLoading} >
        {isLoading ? 'Converting...' : 'Convert to PDF'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
            </div>
       
        </div>
    </div>
    
}