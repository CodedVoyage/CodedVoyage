import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Typography, Grid, Box } from "@mui/material";
import formData from "../Data/formFields.json";
import styles from "../Data/styles.json";
import Text from "../Fields/TextField/Text";
import Radio from "../Fields/Radio/Radio";
import Checkbox from "../Fields/Checkbox/Checkbox";
import Select from "../Fields/Select/Select";
import CustomAutocomplete from "../Fields/AutocompleteField/Autocomplete";
import { RootState } from "../redux/reducers/rootReducer";

const UserProfile: React.FC = () => {
    const [formSchema, setFormSchema] = useState(formData);
    const [initialValues, setInitialValues] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const { username } = useSelector((state: RootState) => state.user);
    console.log("Username from Redux store:", username);

    useEffect(() => {
        const storedFormData = localStorage.getItem("registrations");
        if (storedFormData) {
            const parsedData = JSON.parse(storedFormData);
            console.log("Stored user data:", parsedData);

            const user = parsedData.find((user: any) => user.username === username);
            if (user) {
                const populatedInitialValues = formSchema.fields.reduce((acc, field) => {
                    if (field.type === "checkbox") {
                        acc[field.name] = user[field.name] || [];
                    } else if (field.type === "radio") {
                        acc[field.name] = user[field.name] || "";
                    } else {
                        acc[field.name] = user[field.name] || "";
                    }
                    return acc;
                }, {});

                console.log("Populated initial values:", populatedInitialValues);
                setInitialValues(populatedInitialValues);
            } else {
                console.log("No user found for the given username.");
                setInitialValues(
                    formSchema.fields.reduce((acc, field) => {
                        acc[field.name] = field.type === "checkbox" ? [] : "";
                        return acc;
                    }, {})
                );
            }
        } else {
            console.log("No registrations found in local storage.");
            setInitialValues(
                formSchema.fields.reduce((acc, field) => {
                    acc[field.name] = field.type === "checkbox" ? [] : "";
                    return acc;
                }, {})
            );
        }
        setIsInitialized(true);
    }, [formSchema.fields, username]);

    const validationSchema = Yup.object().shape(
        formSchema.fields.reduce((acc, field) => {
            if (field.validation) {
                let fieldValidation = Yup.string();
                if (field.type === "number") {
                    fieldValidation = Yup.number();
                }
                if (field.validation.required) {
                    fieldValidation = fieldValidation.required(`${field.label} is required`);
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
                    fieldValidation = fieldValidation.matches(
                        new RegExp(field.validation.customValidation.regex),
                        field.validation.customValidation.message
                    );
                }
                acc[field.name] = fieldValidation;
            }
            return acc;
        }, {})
    );

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const cleanValues = Object.keys(values).reduce((acc, key) => {
                if (typeof values[key] === "string" || typeof values[key] === "number" || Array.isArray(values[key])) {
                    acc[key] = values[key];
                }
                return acc;
            }, {});
            const storedData = localStorage.getItem("registrations");
            if (storedData) {
                const users = JSON.parse(storedData);
                const updatedUsers = users.map(user =>
                    user.username === username ? { ...user, ...cleanValues } : user
                );
                localStorage.setItem("registrations", JSON.stringify(updatedUsers));
            }
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile!");
        } finally {
            setLoading(false);
        }
    };

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={styles.box}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ handleSubmit, isValid, dirty }) => (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" gutterBottom sx={styles.typography}>
                            Update Profile
                        </Typography>
                        <Grid container spacing={2}>
                            {formSchema.fields.map((field) => {
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
                                {loading ? 'Updating...' : 'Update Profile'}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default UserProfile;
