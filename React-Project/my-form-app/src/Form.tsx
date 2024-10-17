import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Typography, Grid, Box } from "@mui/material";
import { useDispatch } from 'react-redux';
import { submitForm } from "../src/redux/actions.js";
import formData from "../src/Data/formFields.json";
import styles from "../src/Data/styles.json";
import Text from "../src/Fields/TextField/Text";
import Radio from "../src/Fields/Radio/Radio";
import Checkbox from "../src/Fields/Checkbox/Checkbox";
import Select from "../src/Fields/Select/Select";
import CustomAutocomplete from "../src/Fields/AutocompleteField/Autocomplete";
import { useNavigate } from 'react-router-dom';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    validation?: any;
    options?: { label: string; value: string }[];
    gridProps?: any;
}

interface FormSchema {
    header: string;
    fields: FormField[];
}

const Form: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formSchema, setFormSchema] = useState<FormSchema>({ header: "", fields: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormSchema(formData);
    }, []);

    const initialValues = formSchema.fields.reduce((acc, field) => {
        acc[field.name] = field.type === "checkbox" ? [] : "";
        return acc;
    }, {} as Record<string, any>);

    const validationSchema = Yup.object().shape(
        formSchema.fields.reduce((acc, field) => {
            if (field.validation) {
                const rules: any = {};
                if (field.validation.required) {
                    rules.required = `${field.label} is required`;
                }
                if (field.validation.minLength) {
                    rules.minLength = field.validation.minLength;
                }
                if (field.validation.maxLength) {
                    rules.maxLength = field.validation.maxLength;
                }
                if (field.validation.min) {
                    rules.min = field.validation.min;
                }
                if (field.validation.max) {
                    rules.max = field.validation.max;
                }
                if (field.validation.customValidation) {
                    rules.matches = {
                        value: new RegExp(field.validation.customValidation.regex),
                        message: field.validation.customValidation.message,
                    };
                }

                let fieldValidation = Yup.string();

                if (field.type === "number") {
                    fieldValidation = Yup.number();
                }

                if (rules.required) {
                    fieldValidation = fieldValidation.required(rules.required);
                }
                if (field.validation.minLength) {
                    fieldValidation = fieldValidation.min(
                        field.validation.minLength,
                        `${field.label} must be at least ${field.validation.minLength} characters`
                    );
                }
                if (field.validation.maxLength) {
                    fieldValidation = fieldValidation.max(
                        field.validation.maxLength,
                        `${field.label} must be at most ${field.validation.maxLength} characters`
                    );
                }
                if (field.validation.min) {
                    fieldValidation = fieldValidation.min(
                        field.validation.min,
                        `${field.label} must be at least ${field.validation.min}`
                    );
                }
                if (field.validation.max) {
                    fieldValidation = fieldValidation.max(
                        field.validation.max,
                        `${field.label} must be at most ${field.validation.max}`
                    );
                }
                if (field.validation.customValidation) {
                    fieldValidation = fieldValidation.matches(rules.matches.value, rules.matches.message);
                }

                acc[field.name] = fieldValidation;
            }
            return acc;
        }, {} as Record<string, any>)
    );

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            console.log("Form values submitted:", values); // Log all form values here

            const cleanValues = Object.keys(values).reduce((acc, key) => {
                if (typeof values[key] === "string" || typeof values[key] === "number" || Array.isArray(values[key])) {
                    acc[key] = values[key];
                }
                return acc;
            }, {} as Record<string, any>);

            // Store the username correctly
            const username = cleanValues.username || "default_username"; // Set default if username is empty

            // Log cleanValues to ensure the username is set correctly
            console.log("Clean values before storing:", cleanValues);

            // Retrieve existing registrations from local storage
            const existingRegistrations = JSON.parse(localStorage.getItem("registrations") || "[]");

            // Create a unique user ID
            const userId = new Date().getTime().toString();
            const newRegistration = { ...cleanValues, id: userId };

            // Add the new registration to the existing ones
            existingRegistrations.push(newRegistration);

            // Store the updated registrations back to local storage
            localStorage.setItem("registrations", JSON.stringify(existingRegistrations));

            dispatch(submitForm(cleanValues));

            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cleanValues),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log("Response from API:", responseData);
            alert("Registration successful! You can now log in.");
            navigate('/login');

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box sx={styles.box}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleSubmit, isValid, dirty }) => (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" gutterBottom sx={styles.typography}>
                            {formSchema.header}
                        </Typography>

                        <Grid container spacing={2}>
                            {formSchema.fields.map((field, index) => {
                                const isCheckbox = field.type === "checkbox";
                                const isRadio = field.type === "radio";
                                const gridProps = field.gridProps || {};

                                if (isCheckbox || isRadio) {
                                    return (
                                        <Grid item xs={12} {...gridProps} key={field.name}>
                                            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                                {isRadio && (
                                                    <Radio
                                                        name={field.name}
                                                        label={field.label}
                                                        options={field.options || []}
                                                    />
                                                )}
                                                {isCheckbox && (
                                                    <Checkbox
                                                        name={field.name}
                                                        label={field.label}
                                                        options={field.options || []}
                                                    />
                                                )}
                                            </Box>
                                        </Grid>
                                    );
                                }

                                return (
                                    <Grid item xs={12} {...gridProps} key={field.name}>
                                        {field.type === "text" || field.type === "email" || field.type === "password" || field.type === "tel" || field.type === "number" ? (
                                            <Text
                                                name={field.name}
                                                label={field.label}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                sx={styles.textField}
                                            />
                                        ) : field.type === "select" ? (
                                            <Select
                                                name={field.name}
                                                label={field.label}
                                                options={field.options || []}
                                                sx={styles.select}
                                            />
                                        ) : field.type === "autocomplete" ? (
                                            <CustomAutocomplete
                                                name={field.name}
                                                label={field.label}
                                                options={field.options || []}
                                                sx={styles.autocomplete}
                                            />
                                        ) : null}
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'left', mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ ...styles.button, marginRight: 2 }}
                                disabled={!(isValid && dirty) || loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Form;
