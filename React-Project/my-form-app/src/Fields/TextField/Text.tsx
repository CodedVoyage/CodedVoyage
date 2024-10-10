import React from "react";
import { useFormikContext } from "formik";
import TextField from "@mui/material/TextField";

interface TextFieldProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}

const Text: React.FC<TextFieldProps> = ({ name, label, type = "text", placeholder }) => {
    const { getFieldProps, errors, touched } = useFormikContext();

    return (
        <TextField
            {...getFieldProps(name)}
            label={label}
            type={type}
            placeholder={placeholder}
            error={Boolean(errors[name] && touched[name])}
            helperText={touched[name] && errors[name]}
            fullWidth
        />
    );
};

export default Text;
