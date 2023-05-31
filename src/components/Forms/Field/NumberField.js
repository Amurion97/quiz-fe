import {fieldToTextField} from 'formik-mui';

import MuiTextField from '@mui/material/TextField';
import {useCallback} from "react";
import VNNumParser from "../../../functions/NumberParser";

export default function NumberField(props) {
    const {
        form: {setFieldValue},
        field: {name},
    } = props;
    const onChange = useCallback(
        (event) => {
            const {value} = event.target;
            setFieldValue(name, value ? VNNumParser.parse(value).toLocaleString("de-DE") : '');
        },
        [setFieldValue, name]
    );
    return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}
