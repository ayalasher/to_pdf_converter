import { useState } from "react"
import axios from "axios"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom"


export default function Pptxto() {

    const [file ,setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState("")
    const [downloadLink, setDownloadLink] = useState("");

    

    function navigatetohome() {
        navigaateto(-1)
    }

    function handleuploadedfile(e) {
        setFile(e.target.files[0]) ;
        setError("");
        setDownloadLink("");  
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
          setError("Please upload a file before submitting.");
          return;
        }
    
        // Validate file type
        if (file.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
          setError("Invalid file type. Please upload a .pptx file.");
          return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
          setError(""); // Clear previous errors
          const response = await axios.post("http://localhost:3000/convert/pptx/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "blob", // To handle binary file downloads
          });
    
          // Create a download link for the converted PDF
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          setDownloadLink(url);
        } catch (err) {
          console.error("Conversion error:", err);
          setError("Failed to convert the file. Please try again.");
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
      </button><br />
            <button onClick={navigatetohome} className={styles.homebtn} >Home</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {downloadLink && (
        <div style={{ marginTop: "20px" }}>
          <a href={downloadLink} download="converted.pdf" style={{ color: "blue", textDecoration: "underline" }}>
            Download PDF
          </a>
        </div>
      )}
        </div>
            </div>
       
        </div>
    </div>
    
}