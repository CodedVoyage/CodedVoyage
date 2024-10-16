
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { SUBMIT_FORM, submitForm, submitFormSuccess, submitFormFailure } from './actions';

type SubmitFormAction = ReturnType<typeof submitForm>;


function* submitFormSaga(action: SubmitFormAction): Generator<unknown, void, Response> {
    console.log('submitFormSaga triggered with action:', action); 

    try {
        const response: Response = yield call(fetch, 'https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        });

        console.log('Response from fetch:', response); 

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const responseData = yield call([response, 'json']);
        console.log('Response data:', responseData); 

        yield put(submitFormSuccess(responseData));
        alert('Form submitted successfully!');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error in submitFormSaga:', error.message); 
            yield put(submitFormFailure(error.message));
            alert(`Error submitting form: ${error.message}`);
        } else {
            console.error('Unexpected error:', error); 
            yield put(submitFormFailure('An unexpected error occurred.'));
            alert(`Error submitting form: An unexpected error occurred.`);
        }
    }
}

export function* watchSubmitForm() {
    yield takeLatest(SUBMIT_FORM, submitFormSaga);
}

export default function* rootSaga() {
    yield all([watchSubmitForm()]);
}
