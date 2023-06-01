import {fieldToTextField} from 'formik-mui';

import MuiTextField from '@mui/material/TextField';
import {useCallback} from "react";

export default function UpperCasingTextField(props) {
    const {
        form: {setFieldValue},
        field: {name},
    } = props;
    const onChange = useCallback(
        (event) => {
            const {value} = event.target;
            setFieldValue(name, value ? value.toUpperCase() : '');
        },
        [setFieldValue, name]
    );
    return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}
