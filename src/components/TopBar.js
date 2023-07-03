import {useNavigate} from "react-router-dom";
import {useState} from "react";
// redux
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../features/user/userSlice";
// @mui
import {alpha, styled, useTheme} from "@mui/material/styles";
import {
    Avatar,
    Button,
    Dialog,
    Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PostAddTwoToneIcon from "@mui/icons-material/PostAddTwoTone";
// components
import Logo from "./logo";
import ChangePasswordForm from "./Forms/ChangePasswordForm";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import * as React from "react";
import InputBase from "@mui/material/InputBase";

// sections
const Search = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        // marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));
// ----------------------------------------------------------------------

export default function TopBar(props) {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    console.log("user:", user);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
            <Box sx={{flexGrow: 1, mb: 2}}>
                <AppBar
                    position="fixed"
                    sx={{
                        zIndex: 999,
                        backgroundColor: theme.palette.background.default,
                    }}>
                    <Toolbar>
                        <Logo
                            sx={{
                                mr: 3,
                            }}
                        />
                        <Paper
                            sx={{
                                pl: 0,
                            }}
                            elevation={1}>
                            <Stack direction={"row"}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon/>
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Nhập để tìm kiếm..."
                                        inputProps={{"aria-label": "search"}}
                                        value={props.contentQuery}
                                        onChange={(e) => {
                                            props.setContentQuery(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </Search>
                                <Button
                                    variant="contained"
                                    onClick={props.handleInputChange}>
                                    Tìm kiếm
                                </Button>
                            </Stack>
                        </Paper>

                        <Box sx={{flexGrow: 1}}/>
                        <Box sx={{
                            // display: {
                            //     // xs: "none",
                            //     xs: "flex"
                            // }
                        }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleClick}>
                                <AccountCircle color={"primary"}/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}>
                <MenuItem
                    onClick={() => {
                        handleClickOpenDialog();
                    }}>
                    Đổi mật khẩu
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem
                    onClick={() => {
                        handleClickOpenConfirm();
                    }}>
                    Đăng xuất
                </MenuItem>
            </Menu>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
                <DialogTitle>Đổi mật khẩu</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Mật khẩu dài tối đa 8 kí tự, mật khẩu mới phải khác mật
                        khẩu cũ
                    </DialogContentText>
                    <ChangePasswordForm/>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Bạn muốn đăng xuất?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Hủy</Button>
                    <Button
                        onClick={() => {
                            dispatch(logout());
                            navigate("/login");
                        }}
                        autoFocus
                        variant="contained"
                        color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
