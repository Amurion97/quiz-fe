import styled from "@emotion/styled";
import { Button, Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";

export function StartQuestions() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "inherit",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const ItemButton = styled(Paper)(({ theme }) => ({
        backgroundColor: "inherit",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));
    const BG_COLOR = ["#2BA687", "#1976D2", "#F0A001", "#F200BE", "#CD1E3F"];

    return (
        <>
            {/* <Box sx={{
                height: '100vh',
                width: '100vh',
            }}> */}
            
            <Grid
                container
                spacing={1}
                sx={{
                    p: 2,
                }}
            >
                <Grid item xs={10}>
                    <Paper
                        sx={{
                            backgroundColor: "#71BEF1",
                        }}
                    >
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                p: 3,
                                // height: "100vh",
                                // width: "100vh",
                            }}
                        >
                            <Grid item xs={12}>
                                {/* <Box
                                    sx={{
                                        maxWidth: "100%",
                                        height: 400,
                                        backgroundColor: "primary.dark",
                                        borderRadius: "10%",
                                    }}
                                ></Box> */}
                                <Paper
                                    sx={{
                                        height: 300,
                                        // width: "100%",
                                        borderRadius: "29px",
                                        backgroundColor: "#042164",
                                        color: "#fff",
                                    }}
                                >
                                    aa
                                </Paper>
                            </Grid>
                            {[...Array(5)].map((x, index) => (
                                <Grid item xs={12 / 5}>
                                    <Paper
                                        sx={{
                                            width: 200,
                                            height: 250,
                                            bgcolor: BG_COLOR[index],
                                        }}
                                        elevation={3}
                                    >
                                        abcd
                                    </Paper>
                                </Grid>
                            ))}

                            {/* <Grid>
                            <Box
                                sx={{
                                    display: "flex",
                                    // flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    "& > :not(style)": {
                                        m: 1,
                                        width: 200,
                                        height: 300,
                                    },
                                }}
                            >
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                            </Box>
                        </Grid> */}
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper
                        sx={{
                            backgroundColor: "#71BEF1",
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        <Grid
                            container
                            sx={{
                                // backgroundColor: "#71BEF1",
                                height: "100%",
                                width: "100%",
                            }}
                            spacing={0}
                            // direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid
                                xs={12}
                                sx={{
                                    height: "10%",
                                }}
                            >
                                <Paper>Time</Paper>
                            </Grid>
                            <Grid
                                sx={{
                                    height: "80%",
                                    width: "100%",
                                }}
                                xs={12}
                            >
                                <Paper
                                    sx={{
                                        backgroundColor: "#042164",
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >
                                    {/* <Stack direction="row" spacing={-1}> */}
                                       <Grid container item xs={12} spacing={1}>
                                       <ItemButton xs={3}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{width:50}}
                                               
                                            >
                                                <Avatar>1</Avatar>
                                            </Button>
                                        </ItemButton>

                                        <ItemButton>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{width:50}}
                                            >
                                                <Avatar>2</Avatar>
                                            </Button>
                                        </ItemButton>
                                        <ItemButton>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{width:50}}
                                            >
                                                <Avatar>3</Avatar>
                                            </Button>
                                        </ItemButton>
                                       </Grid>
                                       <Grid container item xs={12} spacing={1}>
                                       <ItemButton xs={3}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{width:50}}
                                            >
                                                <Avatar>1</Avatar>
                                            </Button>
                                        </ItemButton>

                                        <ItemButton>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{width:50}}
                                            >
                                                <Avatar>2</Avatar>
                                            </Button>
                                        </ItemButton>
                                        <ItemButton>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{width:50}}
                                            >
                                                <Avatar>3</Avatar>
                                            </Button>
                                        </ItemButton>
                                       </Grid>
                                       <Grid container item xs={12} spacing={1}>
                                       <ItemButton xs={3}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{width:50}}
                                            >
                                                <Avatar>1</Avatar>
                                            </Button>
                                        </ItemButton>

                                        <ItemButton>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{width:50}}
                                            >
                                                <Avatar>2</Avatar>
                                            </Button>
                                        </ItemButton>
                                        <ItemButton>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{width:50}}
                                            >
                                                <Avatar>3</Avatar>
                                            </Button>
                                        </ItemButton>
                                       </Grid>
                                    {/* </Stack> */}
                                </Paper>
                            </Grid>
                            <Grid
                                item
                                container
                                xs={12}
                                sx={{
                                    height: "10%",
                                }}
                            >
                                <Grid item xs={6}>
                                    <Item>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                        >
                                            CanCel
                                        </Button>
                                    </Item>
                                </Grid>
                            
                                <Grid item xs={6}>
                                    <Item>
                                        <Button
                                            variant="contained"
                                            color="success"
                                        >
                                            submit
                                        </Button>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {/* </Box> */}
        </>
    );
}
