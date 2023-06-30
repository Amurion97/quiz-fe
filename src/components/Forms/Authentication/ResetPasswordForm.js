import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

import { Collapse, IconButton, InputAdornment, Stack } from "@mui/material";
import { Alert, LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-mui";

import { customAPIv1 } from "../../../features/customAPI";
import CloseIcon from "@mui/icons-material/Close";

export default function ResetPasswordForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const otp = urlParams.get("otp");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [countdown, setCountdown] = useState(2);
    const [statusCode, setStatusCode] = useState(0);
    useEffect(() => {
        customAPIv1()
            .post("users/otp-check", {
                email: email,
                OTP: otp,
            })
            .then((data) => {
                console.log("data cua useEffect", data);
            })
            .catch(e=>{
                console.log("error", e);
                navigate('/404');
            });
    }, []);
    useEffect(() => {
        if (openSuccess && countdown > 0) {
            // Giảm thời gian đếm ngược sau mỗi giây khi open là true và countdown > 0
            const timer = setInterval(() => {
                console.log("countdown", countdown);
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            // Xóa timer khi countdown đạt giá trị 0
            return () => {
                clearInterval(timer);
            };
        } else if (openSuccess && countdown === 0) {
            localStorage.clear();
            navigate("/login");
        }
    }, [openSuccess, countdown]);

    const SchemaError = Yup.object().shape({
        newPassword: Yup.string()
            .min(6, "Quá ngắn!")
            .max(8, "Quá dài")
            .required("Vui lòng nhập mật khẩu"),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
            .required("Vui lòng xác nhận mật khẩu"),
    });
    return (
        <>
            <Formik
                initialValues={{
                    email: email,
                    OTP: otp,
                    newPassword: "",
                    confirmNewPassword: "",
                }}
                validationSchema={SchemaError}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("trying to submit:", values);
                    customAPIv1()
                        .post("users/reset-password", values)
                        .then((data) => {
                            
                            console.log("axios data:", data);
                            setOpenSuccess(true);
                            setSubmitting(false);
                        })
                        .catch((e) => {
                            setSubmitting(false);
                            console.log("axios error:", e);
                            setOpen(true);
                            if (e.message.includes("404")) {
                                setStatusCode(404);
                            } else if (e.message.includes("500")) {
                                setStatusCode(500);
                            }
                        });
                }}>
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <Stack spacing={3} mb={3}>
                            <Collapse in={open}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    variant="filled"
                                    severity="error">
                                    {statusCode === 404
                                        ? " Sai mật khẩu, hãy nhập lại"
                                        : "unknown password"}
                                </Alert>
                            </Collapse>
                            <Collapse in={openSuccess}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpenSuccess(false);
                                            }}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    variant="filled"
                                    severity="success">
                                    Tạo mật khẩu mới thành công.
                                    Quay lại trang login trong {countdown} giây...
                                </Alert>
                            </Collapse>

                            <Field
                                component={TextField}
                                type={showPassword ? "text" : "password"}
                                label="Mật khẩu mới"
                                name="newPassword"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end">
                                                {showPassword ? (
                                                    <VisibilityIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityOffIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Field
                                component={TextField}
                                type={showPassword ? "text" : "password"}
                                label="Nhập lại mật khẩu"
                                name="confirmNewPassword"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end">
                                                {showPassword ? (
                                                    <VisibilityIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityOffIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}>
                                <span>
                                    {isSubmitting ? "Registering…" : "Tạo xong"}
                                </span>
                            </LoadingButton>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
}
