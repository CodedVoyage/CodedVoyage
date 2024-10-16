import { SUBMIT_FORM, SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAILURE } from './actions';

interface FormState {
    formData: Record<string, any>;
    loading: boolean;
    error: string | null;
}

const initialState: FormState = {
    formData: {},
    loading: false,
    error: null,
};

interface SubmitFormAction {
    type: typeof SUBMIT_FORM;
    payload: Record<string, any>;
}

interface SubmitFormSuccessAction {
    type: typeof SUBMIT_FORM_SUCCESS;
}

interface SubmitFormFailureAction {
    type: typeof SUBMIT_FORM_FAILURE;
    payload: string;
}

type FormActionTypes = SubmitFormAction | SubmitFormSuccessAction | SubmitFormFailureAction;

const formReducer = (state: FormState = initialState, action: FormActionTypes): FormState => {
    console.log('Reducer received action:', action);

    switch (action.type) {
        case SUBMIT_FORM:
            return {
                ...state,
                loading: true,
                formData: action.payload,
                error: null,
            };
        case SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case SUBMIT_FORM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default formReducer;
