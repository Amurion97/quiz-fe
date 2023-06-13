import {Outlet} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import {Grid} from "@mui/material";
import NavBar from "../components/NavBar";
import TopNavbar from "../components/TopNavbar";
import DemoListData from "../components/Forms/NewNavbarComponent/DemoListData";


const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    maxHeight: '100vh',
    overflow: 'scroll',
});


export default function StudentLayout() {

    return (
        <>
            <StyledRoot>
                  <Grid container>
                      <Grid xs={12} >
                          {/*<TopNavbar>*/}
                          {/*</TopNavbar>*/}
                          <DemoListData>
                          </DemoListData>


                      </Grid>

                  </Grid>

            </StyledRoot>
        </>
    );
}
