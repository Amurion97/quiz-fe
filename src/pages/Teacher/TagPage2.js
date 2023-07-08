import React, {useEffect, useState} from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useTheme} from "@mui/material/styles";
import {Helmet} from "react-helmet-async";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {customAPIv1} from "../../features/customAPI";
import AddTagForm from "../../components/Forms/AddTagForm";
import {Alert} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';

const columns = [
    {id: "id", label: "ID", minWidth: 70, align: "center"},
    {id: "name", label: "Tên chủ để", minWidth: 150},
    {id: "", label: "Hành động", minWidth: 100},
];

export default function TagPage2() {
    const theme = useTheme();
    const [tag, setTag] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [currentTag, setCurrentTag] = useState(0);
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openTags, setOpenTags] = useState(false);
    const [openAddTags, setOpenAddTags] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const handleClickOpenAddTags = () => {
        setOpenAddTags(true);
    };

    const handleCloseAddTags = () => {
        setOpenAddTags(false);
    };

    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenu(null);
    };

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setOpen(false);
    };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const updateTag = () => {
        customAPIv1()
            .get("/tags")
            .then((res) => {
                console.log("tag:", res.data);
                setTag(res.data.data);
            })
            .catch((e) => console.log("error in get tags:", e));
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1200);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        console.log("tag page did mount");
        updateTag();
    }, []);

    return (
        <>
            <Helmet>
                <title>Tag Management | Quiz</title>
            </Helmet>

            {/* <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    height: "100vh",
                    padding: "5% 10%",
                }}
            > */}
            {/* <Grid item xs={12}> */}

            <Stack
                direction={"column"}
                sx={{
                    height: "100vh",
                    padding: {
                        xs: 2,
                        sm: 4,
                        md: 7,
                    },
                    mt: {xs: 7, sm: 5, md: 3}
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                >
                    <Typography variant="h4" gutterBottom>
                        Thẻ của câu hỏi
                    </Typography>
                    {isMobile && (
                        <Button
                            variant="contained"
                            onClick={handleClickOpenAddTags}
                            startIcon={<AddIcon/>}
                        >
                            Thêm thẻ mới
                        </Button>
                    )}
                </Stack>
                {/* </Grid> */}

                <Grid
                    container
                    spacing={2}
                    sx={{
                        pt: 4,
                    }}
                >
                    <Grid item xs={12} lg={6}>
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
                                                        minWidth:
                                                        column.minWidth,
                                                        backgroundColor:
                                                        theme.palette
                                                            .primary.dark,
                                                        color: theme.palette
                                                            .primary
                                                            .contrastText,
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
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                >
                                                    <TableCell
                                                        align="center"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {id}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={2}
                                                            pl={2}
                                                        >
                                                            <Typography
                                                                variant="subtitle2"
                                                                noWrap
                                                            >
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        <IconButton
                                                            size="large"
                                                            color="inherit"
                                                            onClick={(e) => {
                                                                setCurrentTag(
                                                                    id
                                                                );
                                                                handleOpenMenu(
                                                                    e
                                                                );
                                                            }}
                                                        >
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
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
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
                                    Xóa
                                </MenuItem>
                            </Popover>
                        </Paper>
                    </Grid>

                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        maxWidth="md"
                    >
                        <DialogTitle>Xóa thẻ</DialogTitle>
                        <DialogContent>
                            <Alert severity="success">
                                Xóa thẻ thành công!
                            </Alert>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>OK</Button>
                        </DialogActions>
                    </Dialog>

                    {!isMobile && (
                        <Grid item xs={12} lg={5}>
                            <Paper>
                                <DialogTitle>Thêm thẻ mới</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Nhập vào ô thẻ bạn muốn thêm
                                    </DialogContentText>
                                    <AddTagForm
                                        updateTag={updateTag}
                                    ></AddTagForm>
                                </DialogContent>
                                <DialogActions></DialogActions>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Stack>
            {/* </Grid> */}

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn chắc chắn muốn xóa thẻ này?"}
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
                                {/*{statusCode === 500*/}
                                {/*    ? "Thẻ này đang được dùng, không thể xóa!!"*/}
                                {/*    : "Server đang lỗi, hãy thử lại sau"}*/}
                                {errorMessage}
                            </Alert>
                        </Collapse>
                        Hành động này không thể hoàn tác
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button
                        onClick={() => {
                            customAPIv1()
                                .delete(`/tags/${currentTag}`)
                                .then((res) => {
                                    updateTag();
                                    handleCloseConfirm();
                                    handleClickOpenDialog();
                                })
                                .catch((e) => {
                                    console.log("error while deleting tag:", e)
                                    setStatusCode(e.response?.status || 500);
                                    setErrorMessage(e.response?.data.message)
                                    setOpen(true);
                                });
                        }}
                        autoFocus
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openAddTags}
                onClose={handleCloseAddTags}
                fullWidth="md"
            >
                <DialogTitle>Thêm thẻ mới</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nhập vào ô thẻ bạn muốn thêm
                    </DialogContentText>
                    <AddTagForm updateTag={updateTag}></AddTagForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddTags}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}