import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    Button,
    Grid,
    IconButton,
    MenuItem,
    Popover,
    Stack,
    Typography,
    Collapse,
    Avatar,
    Drawer,
    Divider,
    Card,
    Box,
    CardContent,
    CardMedia,
    Chip,
    CardActions,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {useTheme} from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {customAPIv1} from "../../../features/customAPI";
import AddTagForm from "../../../components/Forms/AddTagForm";
import {Alert} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {GroupFilter} from "../../../components/Question/GroupFilter";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {useLocation, useNavigate} from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DraftsIcon from "@mui/icons-material/Drafts";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const columns = [
    {id: "id", label: "ID", minWidth: 50, align: "center"},
    {id: "image", label: "Image", minWidth: 100, align: "left"},
    {id: "name", label: "Name", minWidth: 150, align: "center"},
    {id: "", label: "Action", minWidth: 100},
];

export default function TestPage() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [selectedTagIDs, setSelectedTagIDs] = useState([]);
    const [selectedTypesIDs, setSelectedTypesIDs] = useState([]);
    const [difficultiesIDs, setDifficulties] = useState([]);

    const [currentTestId, setCurrentTestId] = useState(null);

    const [testList, setTestList] = useState([]);

    const [contentQuery, setContentQuery] = useState("");
    const [page, setPage] = useState(1);
    const [resultNumber, setResultNumber] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        setPage(1);
    }, [selectedTagIDs, selectedTypesIDs, difficultiesIDs, contentQuery]);
    const rowsPerPage = 4;

    const handleCheckTags = (event) => {
        const {name} = event.target;
        let index = selectedTagIDs.findIndex((id) => id === parseInt(name));
        if (index < 0) {
            setSelectedTagIDs([...selectedTagIDs, parseInt(name)]);
        } else {
            selectedTagIDs.splice(index, 1);
            setSelectedTagIDs([...selectedTagIDs]);
        }
    };
    const handleCheckTypes = (event) => {
        const {name} = event.target;
        let index = selectedTypesIDs.findIndex((id) => id === parseInt(name));
        if (index < 0) {
            setSelectedTypesIDs([...selectedTypesIDs, parseInt(name)]);
        } else {
            selectedTypesIDs.splice(index, 1);
            setSelectedTypesIDs([...selectedTypesIDs]);
        }
    };
    const handleCheckDifficulties = (event) => {
        const {name} = event.target;
        let index = difficultiesIDs.findIndex((id) => id === parseInt(name));
        if (index < 0) {
            setDifficulties([...difficultiesIDs, parseInt(name)]);
        } else {
            difficultiesIDs.splice(index, 1);
            setDifficulties([...difficultiesIDs]);
        }
    };
    console.log(testList);
    const updateTests = () => {
        customAPIv1()
            .get(`/tests`, {
                params: {
                    // content: contentQuery,
                    // selectedTagIDs: selectedTagIDs,
                    // selectedTypesIDs: selectedTypesIDs,
                    // difficultiesIDs: difficultiesIDs,
                    // page: page,
                    // rows: rowsPerPage,
                },
            })
            .then((res) => {
                console.log("questions:", res.data);
                setTestList(res.data.data["tests"]);
                setResultNumber(res.data.data["testCount"]);
            })
            .catch((e) => console.log("error in get questions:", e));
    };
    useEffect(() => {
        console.log("test page did mount");
        updateTests();
    }, [selectedTagIDs, selectedTypesIDs, difficultiesIDs, contentQuery, page]);

    const handleInputChange = (event) => {
        setContentQuery(event.target.value);
    };

    const [tag, setTag] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [currentTag, setCurrentTag] = useState(0);
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);
    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenu(null);
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setOpen(false);
    };
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    return (
        <>
            <Helmet>
                <title> Test Management | Quiz </title>
            </Helmet>
            {/* <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          padding: "5% 5%",
          overFlow: "scroll",
        }}
      > */}
            <Grid item xs={12}>
                <Grid container spacing={0}>
                    <Grid
                        item
                        xs={2}
                        sx={{
                            mt: 15,
                            pl: 3,
                        }}
                    >
                        <Grid item={3}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                mb={3}
                            >
                                <Typography variant="h4" gutterBottom>
                                    Test Management
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={9}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Button startIcon={<HistoryIcon/>}>
                                        <Typography>previousky used</Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button startIcon={<FavoriteIcon/>}>
                                        <Typography>Like by me</Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button startIcon={<ShareIcon/>}>Share by me</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button startIcon={<DraftsIcon/>}>Drafts</Button>
                                </Grid>

                                <Grid item xs={12}>
                                    My colllections
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        onClick={()=>navigate('/dashboard/testCreate')}
                                        startIcon={<CreateNewFolderIcon/>}
                                    >
                                        Create New Test
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={10}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 15,
                            pl: 3,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={8} spacing={0}>
                                {testList.map((row, index) => {
                                    const {id, name, image, difficulty, tags} = row;
                                    return (
                                        <Card key={id} sx={{display: "flex", mb: "15px"}}>
                                            <CardMedia
                                                component="img"
                                                sx={{width: 200}}
                                                image={image}
                                            />
                                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                                <CardContent sx={{flex: "1 0 auto"}}>
                                                    <Typography component="div" variant="h5">
                                                        Name: {name}
                                                    </Typography>
                                                </CardContent>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        pl: 1,
                                                        pb: 1,
                                                    }}
                                                >
                                                    <CardContent>
                                                        <Typography>
                                                            Tags: {tags.map((item, ind) => item.name + " , ")}
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                                <Typography
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        pl: 4,
                                                        pb: 1,
                                                    }}
                                                >
                                                    Difficulty: {difficulty.name}
                                                </Typography>
                                            </Box>
                                            <CardActions
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",

                                                    "& > *": {
                                                        ml: 1,
                                                    },
                                                    pl: "30%",
                                                    pb: 1,
                                                }}
                                            >
                                                <Button
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        pl: 1,
                                                        pb: 1,
                                                    }}
                                                    variant="outlined"
                                                    onClick={() => {
                                                        navigate(`/dashboard/test-statistic`, {
                                                            state: {
                                                                id: id,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    Xem thống kê làm bài
                                                </Button>
                                                <TableCell align="left">
                                                    <IconButton
                                                        size="large"
                                                        color="inherit"
                                                        onClick={(e) => {
                                                            setCurrentTestId(id);
                                                            handleOpenMenu(e);
                                                        }}
                                                    >
                                                        <MoreVertIcon fontSize="small"/>
                                                    </IconButton>
                                                </TableCell>
                                            </CardActions>
                                            <Popover
                                                open={Boolean(openMenu)}
                                                anchorEl={openMenu}
                                                onClose={handleCloseMenu}
                                                anchorOrigin={{vertical: "top", horizontal: "left"}}
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "right",
                                                }}
                                                PaperProps={{
                                                    sx: {
                                                        p: 1,
                                                        width: 140,
                                                        "& .MuiMenuItem-root": {
                                                            px: 1,
                                                            typography: "body2",
                                                            borderRadius: 0.75,
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem
                                                    sx={{color: "error.main"}}
                                                    onClick={(e) => {
                                                        handleCloseMenu();
                                                        handleClickOpenConfirm();
                                                    }}
                                                >
                                                    <DeleteOutlineIcon fontSize="small"/>
                                                    Delete
                                                </MenuItem>
                                            </Popover>

                                            <Dialog
                                                open={openDialog}
                                                onClose={handleCloseDialog}
                                                fullWidth="md"
                                            >
                                                <DialogTitle>Delete Tag</DialogTitle>
                                                <DialogContent>
                                                    <Alert severity="success">
                                                        Test deleted successfully!
                                                    </Alert>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseDialog}>OK</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Card>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this test?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Collapse in={open}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit"/>
                                    </IconButton>
                                }
                                sx={{mb: 2}}
                                variant="filled"
                                severity="error"
                            >
                                {statusCode === 500
                                    ? "Test is in use, cannot be deleted!!"
                                    : "Server error during delete, please try again"}
                            </Alert>
                        </Collapse>
                        This action can not be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button
                        onClick={() => {
                            customAPIv1()
                                .delete(`/tests/${currentTestId}`)
                                .then((res) => {
                                    updateTests();
                                    handleCloseConfirm();
                                    handleClickOpenDialog();
                                })
                                .catch((e) => {
                                    setOpen(true);
                                    if (e.message.includes("500")) {
                                        setStatusCode(500);
                                    } else {
                                        console.log("Error:", e);
                                    }
                                });
                        }}
                        autoFocus
                        variant="contained"
                        color="error"
                    >
                        Remove Test
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
