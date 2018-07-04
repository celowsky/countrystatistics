export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_SEARCH_STRING':
            return { ...state, searchString: action.searchString };
        case 'BEGIN_SUBMIT':
            return { ...state, isFetching: action.isFetching };
        case 'SUBMIT_SUCCESS':
            return { ...state, countries: action.data.countries, statistics: action.data.statistics, isFetching: false };
        default:
            return state;
    }
}
