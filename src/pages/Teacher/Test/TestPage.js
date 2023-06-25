import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Grid, IconButton, MenuItem, Popover, Stack, Typography, Collapse, Avatar} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {useTheme} from '@mui/material/styles';
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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useLocation, useNavigate} from "react-router-dom";


const columns = [
    {id: 'id', label: 'ID', minWidth: 50, align: "center"},
    {id: 'image', label: 'Image', minWidth: 100, align: "left"},
    {id: 'name', label: 'Name', minWidth: 150, align: "center"},
    {id: '', label: 'Action', minWidth: 100},
];


export default function TestPage() {
    const theme = useTheme()
    const navigate = useNavigate()

    const [selectedTagIDs, setSelectedTagIDs] = useState([]);
    const [selectedTypesIDs, setSelectedTypesIDs] = useState([]);
    const [difficultiesIDs, setDifficulties] = useState([]);

    const [currentTestId, setCurrentTestId] = useState(null);

    const [testList, setTestList] = useState([]);

    const [contentQuery, setContentQuery] = useState('');
    const [page, setPage] = useState(1);
    const [resultNumber, setResultNumber] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        setPage(1)
    }, [selectedTagIDs, selectedTypesIDs, difficultiesIDs, contentQuery])
    const rowsPerPage = 4;

    const handleCheckTags = (event) => {
        const {name} = event.target;
        let index = selectedTagIDs.findIndex(id => id === parseInt(name));
        if (index < 0) {
            setSelectedTagIDs([...selectedTagIDs, parseInt(name)]);
        } else {
            selectedTagIDs.splice(index, 1);
            setSelectedTagIDs([...selectedTagIDs]);
        }
    };
    const handleCheckTypes = (event) => {
        const {name} = event.target;
        let index = selectedTypesIDs.findIndex(id => id === parseInt(name));
        if (index < 0) {
            setSelectedTypesIDs([...selectedTypesIDs, parseInt(name)]);
        } else {
            selectedTypesIDs.splice(index, 1);
            setSelectedTypesIDs([...selectedTypesIDs]);
        }
    };
    const handleCheckDifficulties = (event) => {
        const {name} = event.target;
        let index = difficultiesIDs.findIndex(id => id === parseInt(name));
        if (index < 0) {
            setDifficulties([...difficultiesIDs, parseInt(name)]);
        } else {
            difficultiesIDs.splice(index, 1);
            setDifficulties([...difficultiesIDs]);
        }

    };


    const updateTests = () => {
        customAPIv1().get(`/tests`, {
            params: {
                // content: contentQuery,
                // selectedTagIDs: selectedTagIDs,
                // selectedTypesIDs: selectedTypesIDs,
                // difficultiesIDs: difficultiesIDs,
                // page: page,
                // rows: rowsPerPage,
            }
        })
            .then(res => {
                console.log("questions:", res.data);
                setTestList(res.data.data['tests']);
                setResultNumber(res.data.data['testCount']);
            })
            .catch(e => console.log("error in get questions:", e))
    };
    useEffect(() => {
        console.log("test page did mount");
        updateTests();
    }, [selectedTagIDs, selectedTypesIDs, difficultiesIDs, contentQuery, page])

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
        setOpen(false)
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
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: "100vh",
                    padding: "5% 5%",
                    overFlow: "scroll"
                }}
            >
                <Grid item xs={12}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h4" gutterBottom>
                            Test Management
                        </Typography>
                    </Stack>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        {/*<GroupFilter*/}
                        {/*    handleCheckTags={handleCheckTags} selectedTagIDs={selectedTagIDs}*/}
                        {/*    handleCheckTypes={handleCheckTypes} selectedTypesIDs={selectedTypesIDs}*/}
                        {/*    handleCheckDifficulties={handleCheckDifficulties} difficultiesIDs={difficultiesIDs}*/}
                        {/*>*/}
                        {/*</GroupFilter>*/}
                    </Grid>
                    <Grid item xs={9}>
                        <Paper padding={2}>
                            <TableContainer
                                component={Paper}
                                sx={{maxHeight: "70vh"}}
                            >
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        minWidth: column.minWidth,
                                                        backgroundColor: theme.palette.primary.dark,
                                                        color: theme.palette.primary.contrastText
                                                    }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {testList.map((row, index) => {
                                            const {id, name, image} = row;

                                            return (
                                                <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                                    <TableCell align="center" component="th" scope="row">
                                                        {id}
                                                    </TableCell>
                                                    <TableCell align="center" component="th" scope="row">
                                                        <ImageList sx={{width: 164, height: 164}} cols={1}
                                                                   rowHeight={164}>
                                                            <ImageListItem key={id}>
                                                                <img
                                                                    src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                                                    srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                    // alt={item.title}
                                                                    loading="lazy"
                                                                />
                                                            </ImageListItem>
                                                        </ImageList>
                                                    </TableCell>
                                                    <TableCell align="left" component="th" scope="row" padding="none">
                                                        <Stack direction="column" alignItems="center" spacing={2}
                                                               pl={2}>

                                                            <Typography variant="subtitle2" noWrap>
                                                                {name}
                                                            </Typography>
                                                            <Button
                                                                variant="outlined"
                                                                onClick={() => {
                                                                    navigate(`/dashboard/sum-statistic`, {
                                                                        state: {
                                                                            id: id
                                                                        }
                                                                    })
                                                                }}
                                                            >Xem thống kê làm bài</Button>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        <IconButton size="large" color="inherit" onClick={(e) => {
                                                            setCurrentTestId(id)
                                                            handleOpenMenu(e)
                                                        }}>
                                                            <MoreVertIcon fontSize="small"/>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Popover
                                open={Boolean(openMenu)}
                                anchorEl={openMenu}
                                onClose={handleCloseMenu}
                                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                                PaperProps={{
                                    sx: {
                                        p: 1,
                                        width: 140,
                                        '& .MuiMenuItem-root': {
                                            px: 1,
                                            typography: 'body2',
                                            borderRadius: 0.75,
                                        },
                                    },
                                }}
                            >
                                <MenuItem sx={{color: 'error.main'}} onClick={(e) => {
                                    handleCloseMenu()
                                    handleClickOpenConfirm()
                                }}>
                                    <DeleteOutlineIcon fontSize="small"/>
                                    Delete
                                </MenuItem>
                            </Popover>
                        </Paper>
                    </Grid>

                    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth="md">
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
                                variant="filled" severity="error"
                            >
                                {statusCode === 500 ?
                                    "Test is in use, cannot be deleted!!"
                                    :
                                    "Server error during delete, please try again"
                                }
                            </Alert>
                        </Collapse>
                        This action can not be undone
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button onClick={() => {
                        customAPIv1().delete(`/tests/${currentTestId}`)
                            .then(res => {
                                updateTests()
                                handleCloseConfirm()
                                handleClickOpenDialog()
                            })
                            .catch(e => {
                                setOpen(true);
                                if (e.message.includes("500")) {
                                    setStatusCode(500);
                                } else {
                                    console.log("Error:", e);
                                }
                            })
                    }} autoFocus variant="contained" color="error">
                        Remove Test
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}
