import React from 'react';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox, FormLabel } from '@mui/material';
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
        </FormControl>
    );
};

export default CustomCheckbox;
