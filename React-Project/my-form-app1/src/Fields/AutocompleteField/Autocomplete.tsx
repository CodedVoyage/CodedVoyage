import React from "react";
import { useFormikContext } from "formik";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

interface Option {
    label: string;
    value: string;
}

interface CustomAutocompleteProps {
    name: string;
    options: Option[];
    label: string;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({ name, options, label }) => {
    const {setFieldValue} = useFormikContext();
        
    return (
        <Autocomplete
            options={options}
            onChange={(value) => {
                setFieldValue(name, value);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                />
            )}
        />
    );
};

export default CustomAutocomplete;
