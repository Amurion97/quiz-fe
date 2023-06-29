//React
import { useState } from "react";

//Component
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//uuid
import { v4 } from "uuid";

//Mui-icon
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//Mui
import {
    Box,
    Button, Typography
} from "@mui/material";
import {useTheme} from '@mui/material/styles';

//Component
import { storage } from "../pages/Teacher/firebase";

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
            </Box>
        </>
    );
}
