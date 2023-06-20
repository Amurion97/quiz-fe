import {useState} from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,

} from "firebase/storage";

import {v4} from "uuid";
import {storage} from "../pages/Teacher/firebase";
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';

export default function UploadImg({setFieldValue}) {
    const [imageUrls, setImageUrls] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file !== null) {
            const imageRef = ref(storage, `images/${file.name + v4()}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                    setFieldValue('image', imageUrls);
                });
            });
        }

    }


    return (
        <>
            {imageUrls.length > 0 && (
                <img src={imageUrls[imageUrls.length - 1]} alt="Avatar"/>
            )}
            {/*<input*/}
            {/*    type="file"*/}
            {/*    onChange={handleFileChange}*/}
            {/*/>*/}
            <div>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <div className="flex-container">
                        <CloudUploadTwoToneIcon className="icon"/>
                        <span className="text">Custom Upload</span>
                    </div>
                </label>
                <input id="file-upload" type="file" onChange={handleFileChange}/>
            </div>
            <style>
                {`
        input[type="file"] {
          display: none;
        }
        .custom-file-upload {
          border: 1px solid #ccc;
          display: inline-block;
          padding: 6px 12px;
          cursor: pointer;
        }
        .flex-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
      `}
            </style>
        </>
    );
}
