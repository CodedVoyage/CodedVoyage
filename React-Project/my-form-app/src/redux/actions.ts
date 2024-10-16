export const SUBMIT_FORM = 'SUBMIT_FORM';
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
export const SUBMIT_FORM_FAILURE = 'SUBMIT_FORM_FAILURE';

interface SubmitFormAction {
    type: typeof SUBMIT_FORM;
    payload: Record<string, any>;
}

interface SubmitFormSuccessAction {
    type: typeof SUBMIT_FORM_SUCCESS;
    payload: any;
}

interface SubmitFormFailureAction {
    type: typeof SUBMIT_FORM_FAILURE;
    payload: string;
}

export type FormActions =
    | SubmitFormAction
    | SubmitFormSuccessAction
    | SubmitFormFailureAction;

export const submitForm = (formData: Record<string, any>): FormActions => ({
    type: SUBMIT_FORM,
    payload: formData,
});

export const submitFormSuccess = (responseData: any): FormActions => ({
    type: SUBMIT_FORM_SUCCESS,
    payload: responseData,
});

export const submitFormFailure = (error: string): FormActions => ({
    type: SUBMIT_FORM_FAILURE,
    payload: error,
});
