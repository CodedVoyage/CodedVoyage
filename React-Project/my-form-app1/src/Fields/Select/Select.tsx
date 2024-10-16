import React from 'react';
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
    FormHelperText,
    OutlinedInput,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { SelectChangeEvent } from '@mui/material/Select';

interface SelectProps {
    name: string;
    label: string;
    options: { label: string; value: string }[];
}

const CustomSelect: React.FC<SelectProps> = ({ name, label, options }) => {
    const { getFieldProps, touched, errors, setFieldValue } = useFormikContext<any>();

    const handleChange = (event: SelectChangeEvent<string>) => {
        setFieldValue(name, event.target.value);
    };

    
    const error = errors[name] as string | string[] | undefined;

    return (
        <FormControl fullWidth error={Boolean(touched[name] && error)} variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <MuiSelect
                id={name}
                {...getFieldProps(name)}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                value={getFieldProps(name).value || ''}
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
            {touched[name] && error && (
                <FormHelperText>
                    {Array.isArray(error) ? error.join(', ') : error}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default CustomSelect;
