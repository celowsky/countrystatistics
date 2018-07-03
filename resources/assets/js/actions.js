export function beginSubmit(searchString) {
    return {
        type: 'BEGIN_SUBMIT',
        searchString,
        isFetching: true,
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
