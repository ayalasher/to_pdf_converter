import express from "express"
import cors from "cors"
import multer from "multer";
import docxConverter from 'docx-pdf';

const app = express() ;
app.use(express.json)
app.use(cors())

const PORT = process.env.PORT || 3000 ;

const upload = multer({ dest: 'uploads/' }); // Temporary storage

app.post('/convert', upload.single('file'), (req, res) => {
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
    console.log(`The process is running on port  ${PORT}`);
    
})