import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, OutlinedInput } from '@mui/material';
import { useFormikContext } from 'formik';

interface SelectProps {
    name: string;
    label: string;
    options: { label: string; value: string }[];
}

const CustomSelect: React.FC<SelectProps> = ({ name, label, options }) => {
    const { getFieldProps, touched, errors, setFieldValue } = useFormikContext<any>();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFieldValue(name, event.target.value);
    };

    return (
        <FormControl fullWidth error={Boolean(touched[name] && errors[name])} variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <MuiSelect
                id={name}
                {...getFieldProps(name)}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                defaultValue=""
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
            {touched[name] && errors[name] && (
                <FormHelperText>{errors[name]}</FormHelperText>
            )}
        </FormControl>
    );
};

export default CustomSelect;
