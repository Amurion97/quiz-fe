import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";
import { storage } from "../pages/Teacher/firebase";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useTheme} from '@mui/material/styles';

import {
    Box,
    Button, Typography
} from "@mui/material";


export default function UploadImg({ setFieldValue }) {
    const theme = useTheme()

    const [imageUrls, setImageUrls] = useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file !== null) {
            const imageRef = ref(storage, `images/${file.name + v4()}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrls(url);
                    setFieldValue("image", url);
                });
            });
        }
    };



    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        // Handle file upload logic here
        // You can use the selectedFile state to access the uploaded file
        console.log(selectedFile);
    };

    return (
        <>
            {imageUrls && <img src={imageUrls} alt="Avatar" />}
            <Box>
                <input
                    accept="image/*"
                    id="image-upload"
                    multiple={false}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <label htmlFor="image-upload">
                    <Button 
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            '&:hover': {
                                bgcolor: theme.palette.info.darker,
                            },
                        }}
                    >
                        <Typography variant="button">Upload Image</Typography>
                    </Button>
                </label>
                {selectedFile && (
                    <Box mt={2}>
                        <strong>Selected File:</strong> {selectedFile.name}
                    </Box>
                )}
                {selectedFile && (
                    <Box mt={2}>
                        <Button variant="contained" onClick={handleUpload}>
                            Upload
                        </Button>
                    </Box>
                )}
            </Box>


        </>
    );
}
