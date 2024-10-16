import React from 'react';
import { RadioGroup, FormControl, FormControlLabel, FormLabel, Radio as MuiRadio } from '@mui/material';
import { useFormikContext } from 'formik';

interface RadioProps {
    name: string;
    label: string;
    options: { label: string; value: string }[];
}

const CustomRadio: React.FC<RadioProps> = ({ name, label, options }) => {
    const { getFieldProps, touched, errors, values } = useFormikContext<any>(); // Access formik context

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                {...getFieldProps(name)} // Bind Formik's field props to the radio group
                value={values[name]} // Set the selected value based on Formik's current value for this field
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Column on mobile, row on larger screens
                    gap: 2,
                }}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        control={<MuiRadio />}
                        label={option.label}
                        value={option.value}
                    />
                ))}
            </RadioGroup>
            {touched[name] && errors[name] && <div style={{ color: 'red' }}>{errors[name]}</div>}
        </FormControl>
    );
};

export default CustomRadio;
