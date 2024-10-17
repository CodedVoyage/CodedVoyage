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
    const { values, setFieldValue } = useFormikContext<any>();

    
    const selectedOption = options.find(option => option.value === values[name]);

    return (
        <Autocomplete
            options={options}
            value={selectedOption || null}
            onChange={(_, newValue) => {
                setFieldValue(name, newValue ? newValue.value : "");
            }}
            getOptionLabel={(option) => option.label}
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
