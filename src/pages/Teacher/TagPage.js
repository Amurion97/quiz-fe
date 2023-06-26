import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Grid, IconButton, MenuItem, Popover, Stack, Typography, Collapse} from "@mui/material";
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
import {customAPIv1} from "../../features/customAPI";
import AddTagForm from "../../components/Forms/AddTagForm";
import {Alert} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";


const columns = [
    {id: 'id', label: 'ID', minWidth: 50, align: "center"},
    {id: 'name', label: 'Tên chủ để', minWidth: 150},
    {id: '', label: 'Hành động', minWidth: 100},
];


export default function TagPage() {
    const theme = useTheme()
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
    const updateTag = () => {
        customAPIv1().get("/tags")
            .then(res => {
                console.log("tag:", res.data);
                setTag(res.data.data);
            })
            .catch(e => console.log("error in get tags:", e))
    }
    useEffect(() => {
        console.log("tag page did mount");
        updateTag();
    }, [])
    return (
        <>
            <Helmet>
                <title> Tag Management | Quiz </title>
            </Helmet>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: "100vh",
                    padding: "5% 10%",
                    overFlow: "scroll"
                }}
            >
                <Grid item xs={12}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h4" gutterBottom>
                            Chủ đề của câu hỏi
                        </Typography>
                    </Stack>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
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
                                        {tag.map((row, index) => {
                                            const {id, name} = row;

                                            return (
                                                <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                                    <TableCell align="center" component="th" scope="row">
                                                        {id}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Stack direction="row" alignItems="center" spacing={2} pl={2}>
                                                            <Typography variant="subtitle2" noWrap>
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        <IconButton size="large" color="inherit" onClick={(e) => {
                                                            setCurrentTag(id)
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
                                    Xóa
                                </MenuItem>
                            </Popover>
                        </Paper>
                    </Grid>

                    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth="md">
                        <DialogTitle>Xóa chủ để</DialogTitle>
                        <DialogContent>
                            <Alert severity="success" >
                               Xóa chủ đề thành công!
                            </Alert>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>OK</Button>
                        </DialogActions>
                    </Dialog>

                    <Grid item xs={5}>
                        <Paper>
                            <DialogTitle sx={{
                                // bgcolor: 'primary.dark'
                            }}>Thêm chủ đề mới</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Nhập vào ô chủ đề bạn muốn thêm
                                </DialogContentText>
                                <AddTagForm updateTag={updateTag}></AddTagForm>
                            </DialogContent>
                            <DialogActions>
                            </DialogActions>
                        </Paper>

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
                    {"Bạn chắc chắn muốn xóa chủ đề??"}
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
                                    "Chủ đề này đang được dùng, không thể xóa!!"
                                    :
                                    "Server đang lỗi, hãy thử lại sau"
                                }
                            </Alert>
                        </Collapse>
                        Hành động này không thể hoàn tác
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button onClick={() => {
                        customAPIv1().delete(`/tags/${currentTag}`)
                            .then(res => {
                                updateTag()
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
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}
