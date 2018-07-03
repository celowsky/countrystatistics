export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_SEARCH_STRING':
            console.log(action.searchString);
            return { ...state, searchString: action.searchString };
        default:
            return state;
    }
}
