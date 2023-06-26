import {useState} from "react";
import TextField from "@mui/material/TextField";
import {Button, Paper, Stack} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";


export function CodeEnterBox() {
    const [code, setCode] = useState('');
    const theme = useTheme()
    return (<>
        <Paper elevation={4}
               sx={{
                   display: 'grid',
                   my: 10,
                   mx: 30,
                   py: 10,
               }}>
            <Paper variant="outlined"
                   sx={{
                       // width: 'fit-content',
                       placeSelf: 'center',
                       height: 'fit-content',
                       p: 1,
                       bgcolor: (theme) => theme.palette.background.default,
                       width: 'min(100%, 600px)'
                   }}>
                <Stack direction={'row'} spacing={1}>
                    <OutlinedInput placeholder='Enter a join code'
                                   value={code}
                                   onChange={(e) => {
                                       setCode(e.target.value)
                                   }}
                                   color={'secondary'}
                                   style={{
                                       // borderRadius: theme.shape.borderRadius,
                                   }}

                                   sx={{
                                       bgcolor: (theme) => theme.palette.background.paper,
                                       width: '100%',
                                   }}
                                   autoFocus={true}

                    />
                    <Button variant='contained' color='secondary' size='large'
                            sx={{
                                height: '60px',
                                boxShadow: `0px 5px ${alpha(theme.palette.secondary.main, 0.4)}`,
                            }}
                    >JOIN</Button>
                </Stack>

            </Paper>
        </Paper>
    </>)
}