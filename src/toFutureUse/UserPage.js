import {Helmet} from 'react-helmet-async';
import {filter, sample} from 'lodash';
import {useState} from 'react';
import {faker} from '@faker-js/faker';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
// components

// sections
import {UserListHead, UserListToolbar} from '../sections/@dashboard/user';
// mock
const users = [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    name: faker.name.fullName(),
    company: faker.company.name(),
    isVerified: faker.datatype.boolean(),
    role: sample([
        'Leader',
        'Hr Manager',
        'UI Designer',
        'UX Designer',
        'UI/UX Designer',
        'Project Manager',
        'Backend Developer',
        'Full Stack Designer',
        'Front End Developer',
        'Full Stack Developer',
    ]),
}));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'company', label: 'Company', alignRight: false},
    {id: 'role', label: 'Role', alignRight: false},
    {id: 'isVerified', label: 'Verified', alignRight: false},
    {id: 'status', label: 'Status', alignRight: false},
    {id: ''},
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


export default function UserPage() {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    return (
        <>
            <Helmet>
                <title> User | Flight </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon fontSize="small"/>}>
                        New User
                    </Button>
                </Stack>
                <Card>
                    <TableContainer sx={{minWidth: 800}}>
                        <Table>
                            <UserListHead
                                headLabel={TABLE_HEAD}
                                rowCount={users.length}
                            />
                            <TableBody>
                                {users.map((row) => {
                                    const {id, name, role, company, avatarUrl, isVerified} = row;

                                    return (
                                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                            <TableCell padding="checkbox">

                                            </TableCell>

                                            <TableCell component="th" scope="row" padding="none">
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar alt={name} src={avatarUrl}/>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {name}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>

                                            <TableCell align="left">{company}</TableCell>

                                            <TableCell align="left">{role}</TableCell>

                                            <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                                            <TableCell align="left">

                                            </TableCell>

                                            <TableCell align="right">
                                                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                                    <MoreVertIcon fontSize="small"/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
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
                <MenuItem>
                    <EditIcon fontSize="small"/>
                    Edit
                </MenuItem>

                <MenuItem sx={{color: 'error.main'}}>
                    <DeleteOutlineIcon fontSize="small"/>
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
