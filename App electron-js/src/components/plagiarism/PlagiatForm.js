import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setResult, AddToHestoric } from '../../redux/PlagiatSlice'
import { useHistory } from "react-router-dom";
import FormError from '../utils/FormError';
import Loading from '../utils/Loading';
import "./PlagiatForm.css";


export default function PlagiatForm() {


    const [text, setText] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false)

    const dispatch = useDispatch();
    const history = useHistory();

    const handleAPI = async (data, url) => {
        try {
            let formData = new FormData();
            formData.append('text', data.text);
            formData.append('file', data.file);
            const response = await axios.post(url, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            const result = response.data;
            dispatch(setResult(result));
            dispatch(AddToHestoric(result));
            history.push("/plagiarism/result");
            return true;
        }
        catch (err) {
            console.log(err);
            setErrors(["Bad Request"]);
        }
        finally {
            setLoading(false);
        };
    }
    const checkPlagit = () => {
        setLoading(true);
        if (text && !file) {
            handleAPI(
                { text: text },
                '/plagiat/text'
            )
        }
        else if (file && !text) {
            handleAPI(
                { file: file },
                '/plagiat/file'
            );
        }
        else alert("error");
    }
    const validation = () => {
        let er = [];
        if (!text && !file)
            er.push("Set your text or document ")
        if (text && file)
            er.push("Set just one text or document ")
        if (!text && file) {
            let allowedExtensions =
                /(\.doc|\.docx|\.pdf|\.txt)$/i;
            if (!allowedExtensions.exec(file.name))
                er.push("Extensions not allowed")
        }
        if (text && !file) {
            if (text.length < 60)
                er.push("minimum character in 60")
        }
        return er;
    }
    const handleFile = (file) => {
        setFile(file);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (validation().length > 0) setErrors(validation());
        else checkPlagit();
    }

    if (loading) {
        return (
            <div className="laoding-box">
                <h1 className="header-1 ">
                    in processing ...
                </h1>
                <br />
                <p> please wait a second </p>
                <br /><br />
                <Loading />
                <br />
                <Loading />
                <br />
                <Loading />
                <br />
                <Loading />
                <br />
            </div>
        );
    }
    return (
        <div>
            <br />
            <h1 className="header-1 mg-t-20 mg-b-40 ">
                Plagiat Checker
                <div className="border"></div>
            </h1>
            <form className="plagiat-form" onSubmit={handleSubmit} >
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form-input"
                    placeholder="Your Text ..."
                    rows="7" >
                </textarea>
                <FileUploader handleFile={handleFile} />
                <FormError errors={errors} />
                <button type="submit" className="btn-submit mg-t-25">Check</button>
            </form>
        </div>
    );
}

const FileUploader = ({ handleFile }) => {

    const [fileName, setFileName] = React.useState("")

    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        event.preventDefault();
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        if (!fileUploaded) {
            setFileName("")
        }
        else {
            setFileName(fileUploaded.name)
            handleFile(fileUploaded);
        }
    };
    return (
        <div className="upload-box">
            <button className="upload-btn" onClick={handleClick}>
                <i className="fas fa-file-upload"></i>
                <p>  {!fileName ? "Upload Your File" : fileName}</p>
            </button>

            <input type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};





 // const response = await fetch(url, {
            //     method: "POST",
            //     body: JSON.stringify(data),
            //     headers: {
            //         "Accept": "application/json",
            //         "Content-type": "application/json; charset=UTF-8",
            //         "Authorization": "Bearer 6|B9RkLkKM1OWkVp78FzR5LfzOyqBa18ev7g1S42Wr"
            //     }
            // });



// async function get() {

//     let url = 'http://127.0.0.1:8000/api/user-plagiat-Checks';
//     try {
//         let res = await fetch(url, {
//             method: "get",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-type": "application/json; charset=UTF-8",
//                 "Authorization": "Bearer 6|B9RkLkKM1OWkVp78FzR5LfzOyqBa18ev7g1S42Wr"
//             }
//         });

//         let data = await res.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }