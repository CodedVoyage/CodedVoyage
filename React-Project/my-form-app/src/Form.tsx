import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Box } from "@mui/material";

import fieldsData from "../src/Data/formFields.json";
import Text from "../src/Fields/TextField/Text";
import Radio from "../src/Fields/Radio/Radio";
import Checkbox from "../src/Fields/Checkbox/Checkbox";
import Select from "../src/Fields/Select/Select";
import CustomAutocomplete from "../src/Fields/AutocompleteField/Autocomplete";

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    validation?: any;
    options?: { label: string; value: string }[];
}

const Form: React.FC = () => {
    const [fields, setFields] = useState<FormField[]>([]);

    useEffect(() => {
        setFields(fieldsData);
    }, []);

    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = field.type === "checkbox" ? false : ""; // Initialize checkboxes as false
        return acc;
    }, {} as Record<string, any>);

    const validationSchema = Yup.object().shape(
        fields.reduce((acc, field) => {
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

                // Add validations
                if (rules.required) {
                    fieldValidation = fieldValidation.required(rules.required);
                }
                if (field.validation.minLength) {
                    fieldValidation = fieldValidation.min(field.validation.minLength, `${field.label} must be at least ${field.validation.minLength} characters`);
                }
                if (field.validation.maxLength) {
                    fieldValidation = fieldValidation.max(field.validation.maxLength, `${field.label} must be at most ${field.validation.maxLength} characters`);
                }
                if (field.validation.min) {
                    fieldValidation = fieldValidation.min(field.validation.min, `${field.label} must be at least ${field.validation.min}`);
                }
                if (field.validation.max) {
                    fieldValidation = fieldValidation.max(field.validation.max, `${field.label} must be at most ${field.validation.max}`);
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
        try {
            const jsonData = JSON.stringify(values);
            console.log("JSON Data Submitted:", jsonData);

            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log("Response from API:", responseData);
            alert("Form submitted successfully!");

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form!");
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {fields.map((field) => {
                            switch (field.type) {
                                case "text":
                                case "email":
                                case "password":
                                case "tel":
                                case "number":
                                    return (
                                        <Text
                                            key={field.name}
                                            name={field.name}
                                            label={field.label}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                        />
                                    );
                                case "radio":
                                    return (
                                        <Radio
                                            key={field.name}
                                            name={field.name}
                                            label={field.label}
                                            options={field.options || []}
                                        />
                                    );
                                case "checkbox":
                                    return (
                                        <Checkbox
                                            key={field.name}
                                            name={field.name}
                                            label={field.label}
                                            options={field.options || []}
                                        />
                                    );
                                case "select":
                                    return (
                                        <Select
                                            key={field.name}
                                            name={field.name}
                                            label={field.label}
                                            options={field.options || []}
                                        />
                                    );
                                case "autocomplete":
                                    return (
                                        <CustomAutocomplete
                                            key={field.name}
                                            name={field.name}
                                            label={field.label}
                                            options={field.options || []}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })}
                        <Button type="submit" variant="contained">Submit</Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
