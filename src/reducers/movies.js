import { GET_MOVIES, CHANGED_MOVIES_PER_PAGE, MULTI_SELECT, CHANGED_MOVIES_CURRENTPAGE, DELETE_MOVIES} from "../constants/movies";
const initialState = {
    movies: null,
    totalPages: 0,
    currentPage: 1,
    moviesPerPage: 4,
    newMovies: [],
    filtreByCategory: [],
    valueMultiselect: [],
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MOVIES:
            return {
                movies: action.movies,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                moviesPerPage: action.moviesPerPage,
                newMovies: action.newMovies,
                filtreByCategory: action.filtreByCategory,
                valueMultiselect: action.valueMultiselect,
            };
        case CHANGED_MOVIES_PER_PAGE:
            return { ...state, moviesPerPage: action.moviesPerPage};
        case CHANGED_MOVIES_CURRENTPAGE:
            return { ...state, currentPage: action.currentPage};
        case DELETE_MOVIES:
            return {
                movies: action.movies,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                moviesPerPage: action.moviesPerPage,
                newMovies: action.newMovies,
                filtreByCategory: action.filtreByCategory,
                valueMultiselect: action.valueMultiselect,
            };
        case MULTI_SELECT:
            return { ...state, valueMultiselect: action.valueMultiselect};
        default:
            return state;
    }
}