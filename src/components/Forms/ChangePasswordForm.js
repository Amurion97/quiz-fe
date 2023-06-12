import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// @mui
import {
    IconButton,
    InputAdornment,
    TextField as TextFieldMUI,

} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";

import {changePassword, login} from "../../features/user/userSlice";
// components

// ----------------------------------------------------------------------

export default function ChangePasswordForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()


    const [password, setPassword] = useState()

    return (
        <>
            <Formik
                initialValues={{
                    password: "",
                    newPassword: ""
                }}
                validate={values => {
                    const errors = {};
                    if (values.newPassword !== values.confirmNewPassword) {
                        errors.confirmNewPassword = "Passwords do not match";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(changePassword({ password, newPassword: values.newPassword }));
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, touched, errors }) => (
                    <form onSubmit={handleSubmit}>
                        <TextFieldMUI
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleChange(e);
                            }}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextFieldMUI
                            fullWidth
                            label="New Password"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.newPassword && Boolean(errors.newPassword)}
                            helperText={touched.newPassword && errors.newPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextFieldMUI
                            fullWidth
                            label="Confirm New Password"
                            name="confirmNewPassword"
                            type={showPassword ? "text" : "password"}
                            value={values.confirmNewPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
                            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                        >
                            Save
                        </LoadingButton>
                    </form>
                )}
            </Formik>
        </>
    )
}
