import React from 'react';
import { RadioGroup, FormControl, FormControlLabel, FormLabel, Radio as MuiRadio } from '@mui/material'; // Rename Material-UI Radio to MuiRadio
import { useFormikContext } from 'formik';

interface RadioProps {
    name: string;
    label: string;
    options: { label: string; value: string }[];
}

const CustomRadio: React.FC<RadioProps> = ({ name, label, options }) => { // Rename your custom component to CustomRadio
    const { getFieldProps, touched, errors } = useFormikContext<any>();

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup {...getFieldProps(name)}>
                {options.map((option) => (
                    <FormControlLabel key={option.value} control={<MuiRadio />} label={option.label} value={option.value} /> // Use MuiRadio instead of Radio
                ))}
            </RadioGroup>
            {touched[name] && errors[name] && <div style={{ color: 'red' }}>{errors[name]}</div>}
        </FormControl>
    );
};

export default CustomRadio;
