import express from "express"
import cors from "cors"
import multer from "multer";
import docxConverter from 'docx-pdf';
import {exec} from "child_process"
import fs from "fs"
import path from "path";

const app = express() ;
const upload = multer({ dest: 'uploads/' }); // Temporary storage
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000 ;


// Ensure 'converted' directory exists
if (!fs.existsSync("converted")) {
    fs.mkdirSync("converted");
}


app.post("/convert/pptx", upload.single("file"), (req, res) => {
    console.log("Uploaded file details:", req.file);
    console.log("Inside the backend");

    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const inputFile = req.file.path;
    const outputFile = path.join("converted", `${req.file.filename}.pdf`);

    // Use LibreOffice to convert the .pptx file to .pdf
    const command = `libreoffice --headless --convert-to pdf "${inputFile}" --outdir "converted"`;

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error("Conversion error:", stderr);
            return res.status(500).send("Conversion failed.");
        }

        console.log("Conversion successful:", stdout);

        // Send the PDF back to the client
        res.download(outputFile, (err) => {
            if (err) {
                console.error("Error sending file:", err);
            }

            // Cleanup: Remove both input and output files
            fs.unlink(inputFile, (unlinkErr) => {
                if (unlinkErr) console.error("Failed to delete input file:", unlinkErr);
            });
            fs.unlink(outputFile, (unlinkErr) => {
                if (unlinkErr) console.error("Failed to delete output file:", unlinkErr);
            });
        });
    });
});



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