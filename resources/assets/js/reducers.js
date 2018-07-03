export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_SEARCH_STRING':
            console.log(action.searchString);
            return { ...state, searchString: action.searchString };
        case 'BEGIN_SUBMIT':
            return { ...state, isFetching: action.isFetching }
        default:
            return state;
    }
}
