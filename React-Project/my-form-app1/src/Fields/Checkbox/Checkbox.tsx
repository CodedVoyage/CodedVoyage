import React from 'react';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox, FormLabel, Box } from '@mui/material';
import { useFormikContext } from 'formik';

interface CheckboxProps {
    name: string;
    label: string;
    options: { label: string; value: string }[];
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ name, label, options }) => {
    const { getFieldProps, values } = useFormikContext<any>();

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Column on mobile, row on larger screens
                    gap: 2,
                }}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        control={
                            <MuiCheckbox
                                checked={values[name]?.includes(option.value)}
                                {...getFieldProps(name)}
                                value={option.value}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </Box>
        </FormControl>
    );
};

export default CustomCheckbox;
