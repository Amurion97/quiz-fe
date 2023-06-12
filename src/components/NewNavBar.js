import {IconButton, Link} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Avatar} from "./Forms/NewNavbarComponent/Avatar";
import CustomizedMenus from "./Forms/NewNavbarComponent/Option";
import {styled} from "@mui/material/styles";
import Search from "./Forms/NewNavbarComponent/Search";

const StyledLink = styled(Link)(({theme}) => ({
    textDecoration: "none", color: theme.palette.text.primary, "&:hover": {
        textDecoration: "underline",
    },
}));

export function NewNavbar() {
    return (<>
        <Grid container>
            <Grid container spacing={1}>
                <Grid container item xs={11}>
                    <Grid item xs={5}>
                        <Grid container>
                            <Grid item xs={2}>
                                <IconButton>
                                    <Avatar></Avatar>
                                </IconButton>
                            </Grid>
                            <Grid item xs={10}>
                                <IconButton>
                                    <Search/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <StyledLink href="/">Trang chủ</StyledLink>
                    </Grid>
                    <Grid item xs={2}>
                        <StyledLink href="/">Hoạt động</StyledLink>
                    </Grid>

                    <Grid item xs={2}>
                        <StyledLink href="/">Các lớp học</StyledLink>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    <Grid>
                        <IconButton>
                            <CustomizedMenus/>
                        </IconButton>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    </>);
}