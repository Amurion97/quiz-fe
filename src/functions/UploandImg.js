import {useState} from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,

} from "firebase/storage";

import {v4} from "uuid";
import {storage} from "../pages/Teacher/firebase";

export default function UploadImg() {
    const [imageUrls, setImageUrls] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file !== null) {
            const imageRef = ref(storage, `images/${file.name + v4()}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        }

    }


    return (
        <>
            {imageUrls.length > 0 && (
                <img src={imageUrls[imageUrls.length - 1]} alt="Avatar"/>
            )}
            <input
                type="file"
                onChange={handleFileChange}
            />
        </>
    );
}
