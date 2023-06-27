import TableCell from "@mui/material/TableCell";

import {
    Button,
    Grid,
    IconButton,
    MenuItem,
    Popover,
    Stack,
    Typography,
    Collapse,
    Paper,
} from "@mui/material";
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
import {Alert} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DraftsIcon from "@mui/icons-material/Drafts";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CreateAnOnlContest from "../../../components/Forms/CreateAnOnlContest";
import Menu from '@mui/material/Menu';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
    const [tests, setTests] = useState([])
    const findTestByID = (id) => {
        customAPIv1().get(`/tests/brief/${id}`)
            .then(res => {
                    setTests(res.data.data)
                }
            )
    }


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
                console.log("tests:", res.data);
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
    const [openOnline, setOpenOnline] = useState(false);
    const handleClickOpenOnline = () => {
        setOpenOnline(true);
    };
    const handleCloseOnline = () => {
        setOpenOnline(false);
    };
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


    const [anchorEl, setAnchorEl] = React.useState(null);
    const openSort = Boolean(anchorEl);
    const handleClickSort = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Helmet>
                <title> Test Management | Quiz </title>
            </Helmet>

            <Grid container spacing={0}>
                <Grid
                    item
                    xs={2}
                    sx={{
                        mt: 10,
                        pl: 3,
                    }}
                >
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={3}
                    >
                        <Typography variant="h4" gutterBottom>
                            Test Management
                        </Typography>


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
                                My collections
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    startIcon={<CreateNewFolderIcon/>}
                                >
                                    Create New Collection
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>

                </Grid>

                <Grid
                    item
                    xs={10}
                    sx={{
                        // display: "flex",
                        // flexDirection: "column",
                        // justifyContent: "center",
                        // alignItems: "center",
                        mt: 10,
                        px: 3,
                    }}
                >
                    <Stack>
                        <Stack direction={'row'}>
                            <Button
                                id="demo-positioned-button"
                                aria-controls={openSort ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openSort ? 'true' : undefined}
                                onClick={handleClickSort}
                            >
                                Sắp xếp theo:
                            </Button>
                            <IconButton onClick={handleClickSort}>
                                {openSort ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            </IconButton>
                        </Stack>


                        {testList.map((row, index) => {
                            const {id, name, image, difficulty, tags} = row;
                            return (
                                <Paper key={id} sx={{mb: 2}}>
                                    <Grid container spacing={1}
                                          sx={{
                                              width: '100%'
                                          }}>

                                        <Grid item xs={2} sx={{

                                            p: 1,
                                        }}>
                                            <img src={image}
                                                 style={{
                                                     width: 200,
                                                     height: 200,
                                                     objectFit: 'cover',
                                                     padding: '10px',
                                                 }
                                                 }/>
                                        </Grid>

                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <Stack direction={'column'} spacing={1}>

                                                <Typography variant="h5" sx={{pt: 3}}>
                                                    Tên bài thi: {name}
                                                </Typography>

                                                <Typography variant="body">
                                                    {row.details.length} câu hỏi
                                                </Typography>

                                                <Typography>
                                                    Thẻ:
                                                    {' '}
                                                    {tags.map(
                                                        (item, index) => (index < tags.length - 1) ? item.name + ", " : item.name
                                                    )}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        // display: "flex",
                                                        // alignItems: "center",
                                                        // pl: 4,
                                                        pb: 1,
                                                    }}
                                                >
                                                    Độ khó: {difficulty.name}
                                                </Typography>

                                            </Stack>
                                        </Grid>

                                        <Grid item xs={3}
                                              sx={{
                                                  pt: 15,
                                                  textAlign: 'right',
                                                  display: 'grid',
                                              }}>

                                            <Button
                                                sx={{
                                                    alignSelf: 'center'
                                                }
                                                }
                                                variant="contained"
                                                onClick={() => {
                                                    navigate(`/dashboard/sum-statistic`, {
                                                        state: {
                                                            id: id,
                                                        },
                                                    });
                                                }}
                                            >
                                                Thống kê làm bài
                                            </Button>
                                        </Grid>

                                        <Grid item xs={1}
                                              sx={{
                                                  pt: 1, pr: 1,
                                                  textAlign: 'right',
                                              }}>
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
                                        </Grid>

                                    </Grid>
                                </Paper>
                            );
                        })}

                    </Stack>
                </Grid>
            </Grid>


            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={openSort}
                onClose={handleCloseSort}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleCloseSort}>Profile</MenuItem>
                <MenuItem onClick={handleCloseSort}>My account</MenuItem>
                <MenuItem onClick={handleCloseSort}>Logout</MenuItem>
            </Menu>

            <Popover
                open={Boolean(openMenu)}
                anchorEl={openMenu}
                onClick={() => findTestByID(currentTestId)}
                onClose={handleCloseMenu}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 200,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={(e) => {
                    handleCloseMenu()
                    handleClickOpenOnline()
                }}>
                    <Diversity3Icon fontSize="small" sx={{color: theme.palette.grey["500"]}}/>
                    Tạo phòng thi
                </MenuItem>

                <MenuItem sx={{color: 'error.main'}} onClick={(e) => {
                    handleCloseMenu()
                    handleClickOpenConfirm()
                }}>
                    <DeleteOutlineIcon fontSize="small"/>
                    Xóa bài thi
                </MenuItem>

            </Popover>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
            >
                <DialogTitle>Xóa đề thi</DialogTitle>
                <DialogContent>
                    <Alert severity="success">
                        Xóa bài thi thành công
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>OK</Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc muốn xóa bài thi?"}
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
                                    "Bài thi đang được dùng, không thể xóa!!"
                                    :
                                    "Server lỗi trong quá trình xóa bài thi, thử lại!"
                                }
                            </Alert>
                        </Collapse>
                        Hành động này không thể hoàn tác
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
                        Xóa bài thi
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openOnline} onClose={handleCloseOnline} maxWidth="md">
                <DialogTitle>Tạo cuộc thi online
                    <Typography component="div" variant="h6">
                        Bài thi: <strong>{tests.name}</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent>

                    <CreateAnOnlContest
                        test={tests}
                    />

                </DialogContent>
            </Dialog>
        </>

    )
}
