import { Link } from "react-router-dom";
import styles from "./styles.module.css"
import { GoFileSymlinkFile } from "react-icons/go";
import { FaFileWord } from "react-icons/fa";
import { FaFilePowerpoint } from "react-icons/fa";

export default function Home() {
    return <div className={styles.maincontainer} >
        <div className={styles.innermaincontainer} >
        <p className={styles.mainheadingtxt} >Word and pptx to PDF converter <GoFileSymlinkFile /> </p>
        <p className={styles.smallheadingtxt} >Choose document type you want to convert to PDF</p>
        <div className={styles.linkscontainer} >
            <Link className={styles.twolinks1} to={"/word"}>Word document  <FaFileWord /> </Link>
            <Link className={styles.twolinks2} to={"/pptx"} >Power point document <FaFilePowerpoint /> </Link>
        </div>
        </div>
      
    </div>
}