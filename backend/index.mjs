import express from "express"
import cors from "cors"
import multer from "multer";
import docxConverter from 'docx-pdf';

const app = express() ;
const upload = multer({ dest: 'uploads/' }); // Temporary storage
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000 ;



app.post('/convert', upload.single('file'),(req, res) => {
    console.log('Uploaded file details:', req.file);
    console.log("Inside the backend");

    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    
    const inputFile = req.file.path;
    const outputFile = `converted/${req.file.filename}.pdf`;

    docxConverter(inputFile, outputFile, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Conversion failed.");
        }
        res.download(outputFile); // Send the PDF back to the client
    });
});


app.listen(PORT,()=>{
    console.log(`The process is running on port ${PORT}`);
    
})