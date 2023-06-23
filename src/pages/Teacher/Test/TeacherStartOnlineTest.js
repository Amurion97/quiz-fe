// import { FormControl } from "@mui/base";
import {
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Paper,
    Typography,
    FormControl,
    Box,
} from "@mui/material";
// import { Box, Stack } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StudentsLounge from "../../Student/GroupTest/StudentsLounge";


export function TeacherStartOnlineTest() {
    return (
        <>
            <Grid container style={{backgroundImage:"https://i.imgur.com/6HnZGvI.png"}} >
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            pt: 8,
                            "& > :not(style)": {
                                width: 450,
                                height: 425,
                            },
                        }}
                    >
                        {/* <Paper sx={{p: 10, background: 'linear-gradient(#000000, #33333366)'}}  elevation={6}> */}
                        <Paper sx={{p: 10}}  elevation={6}>
                            <Grid container spacing={1}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mt: -5,
                                        // color: "white",
                                    }}
                                >
                                    <Typography fontSize={20}>Online Test</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{textAlign: "center"}}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                        }}
                                        variant="outlined"
                                    >
                                        <OutlinedInput
                                            sx={{mx: 1}}
                                            endAdornment={
                                                <InputAdornment>
                                                    <IconButton
                                                        aria-label="copy join code"
                                                        edge="end"
                                                        sx={{bgcolor: "#EDEDF6"}}
                                                    >
                                                        <ContentCopyIcon sx={{maxHeight: "100%"}}/>
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // color: "white",
                                    }}
                                >
                                    <Typography>2: Enter join code</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{textAlign: "center"}}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                        }}
                                        variant="outlined"
                                    >
                                        <OutlinedInput
                                            sx={{mx: 1}}
                                            endAdornment={
                                                <InputAdornment>
                                                    <IconButton
                                                        aria-label="copy join code"
                                                        edge="end"
                                                        sx={{bgcolor: "#EDEDF6"}}
                                                    >
                                                        <ContentCopyIcon sx={{maxHeight: "100%"}}/>
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mt: 1,
                                        // color: "white",
                                    }}
                                >
                                    <Typography>3 : Or</Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        sx={{
                                            width: "70%",
                                            height: 50,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            mt: 2,
                                            // color: "white",
                                        }}
                                        variant="outlined"
                                        startIcon={<QrCodeIcon/>}
                                    >
                                        QrCode
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        pt: 4,


                    }}
                >
                    <Button
                        sx={{
                            width: "230px",
                            height: 60,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor:'#7CFC00'
                            



                        }}
                        elevation={6}
                        variant="outlined"
                        startIcon={<PlayArrowIcon/>}
                        
                    >
                        START
                    </Button>
                </Grid>
                <StudentsLounge/>
            </Grid>
        </>
    );
}
