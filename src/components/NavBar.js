import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
// redux
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../features/user/userSlice";
// @mui
import {styled, useTheme} from '@mui/material/styles';
import {
    Avatar, Button, Dialog, Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper, Typography, useMediaQuery, Container
} from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
//MUI icon
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import QuizIcon from '@mui/icons-material/Quiz';
// components
import Logo from "./logo";
import ChangePasswordForm from "./Forms/ChangePasswordForm";


// sections
const StyledRoot = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.background.default,
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    borderRight: "2px dotted lightgrey",
    borderRadius: 0,
}));

const UserInfoBox = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.secondary.light,
    textAlign: 'center',
    color: theme.palette.text.primary,
    padding: "1% 0",
    // height: "70%",
    // minHeight: '40px',
    height: '100%',
    margin: '0 20px'
}));
const StyledListItemButton = styled(ListItemButton)(({theme}) => ({
    borderRadius: "10px",
    '&.active': {
        color: 'text.primary',
        bgcolor: 'action.selected',
        fontWeight: 'fontWeightBold',
    },

}));
// ----------------------------------------------------------------------

export default function NavBar({openNav, mobileOpen}) {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(selectUser);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))
    // console.log("user:", user)
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
            <StyledRoot className="navbar-wrapper">
                <div className="navbar-item1">
                    {/*<Logo*/}
                    {/*    sx={{*/}
                    {/*        position: 'fixed',*/}
                    {/*        top: {xs: 16, sm: 24, md: 40},*/}
                    {/*        left: {xs: 16, sm: 24, md: 40},*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>

                <div className="navbar-item2">
                    <UserInfoBox sx={{
                        width: theme => openNav === false && isSmUp ? `calc(${theme.spacing(6.8)})` : 'initial',
                        py: '1%',
                        mx: theme => openNav === false && isSmUp ? 0.5 : 1,
                        px: theme => openNav === false && isSmUp ? 0.5 : 1,
                    }}>
                        <Grid container spacing={0} justifyContent="center" direction="row"
                              alignItems="center"
                              style={{
                                  height: "100%"
                              }}>
                            <Grid item xs={openNav === false && isSmUp ? 12 : 3}
                                  sx={{
                                      position: 'relative',
                                  }}
                            >

                                <Avatar src='/assets/images/avatars/avatar_default.jpg'
                                        alt="photoURL"
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)'
                                        }}/>


                            </Grid>
                            <Grid item xs={7}
                                  sx={openNav === false && isSmUp ? {
                                      display: 'none'
                                  } : {}
                                  }>
                                <Typography
                                    sx={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {user.info.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}
                                  sx={openNav === false && isSmUp ? {
                                      display: 'none'
                                  } : {}
                                  }>
                                <IconButton size="large" color="inherit" onClick={handleClick}>
                                    <MoreVertIcon fontSize="small"/>
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        handleClickOpenDialog()
                                    }}>Đổi mật khẩu</MenuItem>
                                    {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                                    <MenuItem onClick={() => {
                                        handleClickOpenConfirm()
                                    }}>Đăng xuất</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </UserInfoBox>

                </div>

                <div className="navbar-item3">
                    <Box sx={{width: '100%', maxWidth: 360}}>
                        <List component="nav" aria-label="main mailbox folders">


                            {(user.info.role <= 2) && (
                                <>
                                    <Divider/>
                                    <StyledListItemButton
                                        selected={selectedIndex === 1}
                                        onClick={(event) => {
                                            handleListItemClick(event, 1)
                                            navigate("/dashboard/tag")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <LocalOfferIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chủ đề của câu hỏi"
                                                      style={{color: theme.palette.text.primary}}/>
                                    </StyledListItemButton>

                                    <StyledListItemButton
                                        selected={selectedIndex === 2}
                                        onClick={(event) => {
                                            handleListItemClick(event, 2)
                                            navigate("/dashboard/createQuestion")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <AddCircleIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Tạo câu hỏi mới"
                                                      style={{color: theme.palette.text.primary}}/>
                                    </StyledListItemButton>

                                    <StyledListItemButton
                                        selected={selectedIndex === 3}
                                        onClick={(event) => {
                                            handleListItemClick(event, 3)
                                            navigate("/dashboard/questions")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <QuestionMarkIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Danh sách câu hỏi"
                                                      style={{color: theme.palette.text.primary}}/>
                                    </StyledListItemButton>

                                    <StyledListItemButton
                                        selected={selectedIndex === 4}
                                        onClick={(event) => {
                                            handleListItemClick(event, 4)
                                            navigate("/dashboard/testCreate")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <PostAddTwoToneIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Tạo bài thi"
                                                      style={{color: theme.palette.text.primary}}/>
                                    </StyledListItemButton>

                                    <StyledListItemButton
                                        selected={selectedIndex === 5}
                                        onClick={(event) => {
                                            handleListItemClick(event, 5)
                                            navigate("/dashboard/tests")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <QuizIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Danh sách bài thi"
                                                      style={{color: theme.palette.text.primary}}/>
                                    </StyledListItemButton>
                                </>)}

                            {(user.info.role === 1) && (
                                <>
                                    <Divider/>
                                    <StyledListItemButton
                                        selected={selectedIndex === 0}
                                        onClick={(event) => {
                                            handleListItemClick(event, 0)
                                            navigate("/dashboard/users")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <SupervisedUserCircleIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Users" style={{color: theme.palette.text.primary}}/>
                                    </StyledListItemButton>

                                </>)}
                        </List>
                    </Box>
                </div>

            </StyledRoot>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
                <DialogTitle>Đổi mật khẩu</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Mật khẩu dài tối đa 8 kí tự,
                        Mật khẩu mới phải khác mật khẩu cũ
                    </DialogContentText>
                    <ChangePasswordForm>
                    </ChangePasswordForm>

                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc muốn đăng xuất?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Hủy</Button>
                    <Button
                        onClick={() => {
                            dispatch(logout())
                            setTimeout(() => {
                                navigate("/login")
                            }, 200)


                        }}
                        autoFocus variant="contained" color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
