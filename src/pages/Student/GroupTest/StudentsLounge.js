import {Avatar, Box, Card, Grid} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";

export default function StudentsLounge() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12 / 5}>
                    <Box>
                        <Card sx={{pb: "24px", height: "100%"}}>
                            <CardHeader
                                avatar={<Avatar src="/assets/images/avatars/avatar_default.jpg"
                                                alt="photoURL"/>}
                                title="User"
                                subheader="Friend"
                            />
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}