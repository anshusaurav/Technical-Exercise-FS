import React from "react";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const bucket = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION
});

const endPoint = "http://localhost:8080/api/uploads";

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { progress: 0, status: '', name: '', startTime: '', endTime: '', size: 0, disabled: false }
        this.fileInput = React.createRef();
    }

    uploadfile = (fileName, file, folderName) => {
        const params = {
            Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
            Key: folderName + fileName,
            Body: file,
            ContentType: file.type
        };
        return bucket.upload(params, (err, data) => {

            if (err) {
                toast.error("☣ Error Occured");
                this.setState({ disabled: false })
                return false;
            }
            this.setState({ endTime: Date.now() }, () => {
                const url = data.Location;
                const { name, startTime, endTime, size } = this.state;
                const fileObj = { name, startTime, endTime, size, url };
                toast.success("🚀 Uploaded successfully")
                axios.post(endPoint, fileObj)
                    .then(response => {
                        this.fileInput.current.value = "";
                        this.setState({ name: '', status: '', progress: 0, endTime: '', startTime: '', disabled: false })
                    });
                return true;
            })


        });
    }
    handleChange = (event) => {
        if (!event.target.files)
            return;
        let file = this.fileInput.current.files[0];
        this.setState({ name: file.name });
    }
    handleClick = (event) => {
        event.preventDefault();
        if (!this.fileInput.current.files[0])
            return;
        let file = this.fileInput.current.files[0];
        let folderName = "uploads/";
        let uniqueFileName = uuidv4();
        let fileUpload = {
            id: "",
            name: file.name,
            nameUpload: uniqueFileName,
            size: file.size,
            type: "",
            timeReference: Date.now(),
            progressStatus: 0,
            displayName: file.name,
            status: 'Uploading..',
        }
        this.setState({ name: file.name, startTime: fileUpload.timeReference, size: fileUpload.size, disabled: true })
        this.uploadfile(uniqueFileName, file, folderName)
            .on('httpUploadProgress', (progress) => {
                let progressPercentage = Math.round(progress.loaded / progress.total * 100);
                this.setState({ progress: progressPercentage, status: `${progress.loaded} Bytes/${progress.total} Bytes` }, () => {
                    if (progressPercentage < 100) {
                        fileUpload.progressStatus = progressPercentage;

                    } else if (progressPercentage === 100) {
                        fileUpload.progressStatus = progressPercentage;
                        fileUpload.status = "Uploaded";
                    }
                });

            })

    };
    render() {
        const { progress, status, name, disabled } = this.state;
        return (
            <div className="flex justify-center align-center h-full w-full bg-teal-lighter">
                <div className="w-full bg-white rounded h-auto shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <h1 className="block w-full text-center font-bold text-lg text-grey-darkest mb-6">
                        AWS S3 Upload
                    </h1>
                    <form className="mb-4 md:flex md:flex-wrap md:justify-between"
                        onSubmit={this.handleClick}>
                        <div className="flex flex-col mb-4 md:w-full">
                            <label className="w-64 flex flex-col self-center items-center px-4 py-6 bg-white text-blue
                             rounded-lg shadow-lg border border-blue cursor-pointer hover:bg-blue  truncate">
                                <svg className="w-8 h-8" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span
                                    className="mt-2 text-base leading-normal">
                                    Select a file</span>
                                <input
                                    type='file'
                                    className={`hidden ${disabled ? "cursor-not-allowed" : ""}`}
                                    ref={this.fileInput}
                                    onChange={this.handleChange}
                                    disabled={disabled}
                                />
                                <p>{name}</p>
                            </label>
                        </div>
                        <button className={`block bg-gray-700 hover:bg-teal-dark text-white text-lg mx-auto px-4 py-1 rounded ${disabled ? "cursor-not-allowed" : ""}`} type="submit" disabled={disabled}>
                            Upload
                        </button>
                    </form>
                    <div>
                        <div className="my-bar"
                            style={{ width: `${progress}%` }}></div>
                        <p>{status}</p>
                    </div>
                </div>
                <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick

                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </div >

        )
    }
}

export default Upload;