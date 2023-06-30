import {Avatar, Box, Card, Grid} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

export default function StudentsLounge({peopleList, kickStudent}) {
    return (
        <>
            <Grid container spacing={3} sx={{pt: 5, px: 2}}
            justifyContent='center'>
                {peopleList.map((person) => (
                    <Grid key={person.id} item xs={12} sm={8} md={6} lg={4} xl={4}>
                        <Card sx={{pb: "24px", height: "100%"}}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        src="/assets/images/avatars/avatar_default.jpg"
                                        alt="photoURL"
                                    />
                                }
                                title={person.email}
                                titleTypographyProps={{
                                    noWrap: true,
                                    maxWidth: {
                                        xs: '200px',
                                        sm: '280px',
                                        md: '300px',
                                        lg: '300px'
                                    },
                                    // color: 'red',
                                    fontWeight: 'bold'
                                }}
                                disableTypography={false}

                                subheader="Student"

                                action={
                                    kickStudent &&
                                    <IconButton aria-label="settings"
                                                onClick={() => {
                                                    kickStudent(person.email)
                                                }}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                }
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
