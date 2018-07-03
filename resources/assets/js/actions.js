import axios from 'axios';

export function beginSubmit() {
    return {
        type: 'BEGIN_SUBMIT',
        isFetching: true,
    };
}

export function submitSuccess(data) {
    return {
        type: 'SUBMIT_SUCCESS',
        data,
        isFetching: false,
    };
}

export function submitForm(searchString) {
    return function thunk(dispatch) {
        dispatch(beginSubmit);
        axios.post('/searchForCountry', searchString)
            .then((response) => {
                dispatch(submitSuccess(response.data));
            }).catch((error) => {
                console.log(error);
            });
    };
}

export function changeSearchString(searchString) {
    return {
        type: 'CHANGE_SEARCH_STRING',
        searchString,
    };
}

export function startTyping() {
    return {
        type: 'START_TYPING',
        isTyping: true,
    };
}

export function stopTyping() {
    return {
        type: 'STOP_TYPING',
        isTyping: false,
    };
}
