import {Link, Container, Typography, Grid, MenuItem, Tooltip} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
// MUI----------------------------------------------------------------


import {Helmet} from "react-helmet-async";
// React---------------------------------------------------------------- 

import Logo from "../../components/logo";
// Logo-------------------------------------------------------------------


import RegisterForm from "../../components/Forms/Authentication/RegisterForm";
import ForgotPasswordForm from "../../components/Forms/Authentication/ResetRequestForm";
// Componnet-------------------------------------------------------------------
import {StyledContent, StyledRoot, StyledSection} from "./LoginPage";
import {useLocation} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import {Alert} from "@mui/lab";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RegisterPage() {

    const location = useLocation()
    console.log("location in register:", location);
    const {state} = location;
    let code = state && state['code'] ? state['code'] : undefined;
    const defaultTeacherAccount = {
        email: 'teacher-quiz@outlook.com.vn',
        password: '123456'
    };
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Helmet>
                <title>Register | Quiz</title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: "fixed",
                        top: {xs: 16, sm: 24, md: 40},
                        left: {xs: 16, sm: 24, md: 40},
                    }}
                />

                <StyledSection>
                    <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
                        Chào mừng bạn đến trang đăng ký tài khoản 😍
                    </Typography>
                    <img src="/assets/illustrations/All the data-rafiki.png" alt="login"/>
                </StyledSection>

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Đăng ký tài khoản Quiz
                        </Typography>

                        <Typography variant="body2">
                            Bạn đã có sẵn một tài khoản? {''}
                            <Link href="/login">Hãy đăng nhập nào...</Link>
                        </Typography>

                        <Alert severity="info" sx={{mb: 1}}>
                            Tài khoản đăng kí mới sẽ có vai trò là học sinh. Nếu bạn muốn trải nghiệm tính năng của giáo
                            viên, bạn có thể đăng nhập bằng tài khoản sau:
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                sx={{
                                    p: 0,
                                }}
                            >
                                <ExpandMoreIcon/>
                            </ExpandMore>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                Email: {defaultTeacherAccount.email}
                                <br/>
                                Password: {defaultTeacherAccount.password}
                            </Collapse>
                        </Alert>


                        <RegisterForm code={code}/>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
