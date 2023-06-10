import {
    Button, Card, CardActions, CardContent,
    Grid, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";


export default function Detail() {
    const [phoneInfo, setPhoneInfo] = useState({})
    const [loading, setLoading] = useState(true);
    const {state} = useLocation();
    console.log(state)
    console.log("phoneInfo:", phoneInfo)
    const {productID} = state;
    useEffect(() => {
        console.log("edit form did mount");
        axios.get(`http://127.0.0.1:3001/products/${productID}`)
            .then(res => {
                console.log("phone info:", res.data);
                setPhoneInfo(res.data);
                setLoading(false)
            })
            .catch(e => console.log("error in get phone:", e))
    }, [productID])
    return (
        <>
            {
                (!loading) &&

                            <Grid container spacing={3}>
                                <Grid item xs={3} sm={3} md={3}>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Product Details
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {phoneInfo.title}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {phoneInfo.price}
                                            </Typography>
                                            <Typography variant="body2">
                                                {phoneInfo.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button href="/test">Back to home</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
            }
        </>
    )

}