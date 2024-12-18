import { useState } from "react"
import axios from "axios"
import styles from "./styles.module.css"
export default function Wordto() {

    const [file ,setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error,seterror] = useState("")

    function handleuploadedfile(e) {
        setFile(e.target.files[0])   
    }

    const handleUpload = async () => {
        if (!file) {
          setError('Please upload a .docx file.');
          return;
        }
    
        setError('');
        setIsLoading(true);
    
        try {
          const formData = new FormData();
          formData.append('file', file);
    
          const response = await axios.post('http://localhost:3000/convert', formData, {
            responseType: 'blob', // Important to handle binary files
          });
    
          // Create a download link for the converted PDF
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'converted.pdf');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
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
            <p className={styles.mainheadingtxt} >Choose word document to upload for conversion</p>     
            </div>
        <div className={styles.labelandinput} >
        <label className={styles.labeltxt} htmlFor="document upload">Document upload</label> <br />
        <input className={styles.input} type="file" accept=".docx" onChange={handleuploadedfile} />  <br />
        </div>

        <div className={styles.btnanderror} >
        <button className={styles.convertbtn} onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Converting...' : 'Convert to PDF'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
            </div>
       
        </div>
    </div>
    
}