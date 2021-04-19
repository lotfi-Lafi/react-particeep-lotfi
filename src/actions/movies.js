import { GET_MOVIES, CHANGED_MOVIES_PER_PAGE, MULTI_SELECT, CHANGED_MOVIES_CURRENTPAGE, DELETE_MOVIES} from "../constants/movies";
import { listOfMovies$ } from '../constants/listOfMovies';

export function getMovies(currentPage, moviesPerPage) {
    return (dispatch) => {
        listOfMovies$.then((res) => {

            let newMoviesT = [];
            let filtreByCategoryT = [];
            let valueMultiselectT = [];
            let totalPagesT = 0;
            if (res){
                const indexOfFirstMovie = (currentPage - 1) * moviesPerPage;

                for(let i = 0; i <  res.length; i++){
                    if (filtreByCategoryT.indexOf(res[i].category) < 0){
                        filtreByCategoryT.push(res[i].category);
                    }
                    if ((i>= indexOfFirstMovie) && (i < (indexOfFirstMovie + moviesPerPage))){
                        newMoviesT.push(res[i]);
                    }
                }
                totalPagesT = Math.ceil(res.length / moviesPerPage);
            }
            dispatch({
                type: GET_MOVIES,
                movies: res,
                currentPage: currentPage,
                moviesPerPage: moviesPerPage,
                totalPages: totalPagesT,
                newMovies: newMoviesT,
                filtreByCategory: filtreByCategoryT,
                valueMultiselect: valueMultiselectT,
            });
        });
    }
}

export function deleteMovie(id, movies) {
    return (dispatch) => {
        let res = movies.movies;
        console.log('delete Movie = ', movies);
        let removeIndex = res.map(function(item) { return item.id; }).indexOf(id);

        res.splice(removeIndex, 1);
        console.log('moviesAfterDelete res = ', res);

        let newMoviesT = [];
        let filtreByCategoryT = [];
        let valueMultiselectT = [];
        let totalPagesT = 0;
        if (res){
            const indexOfFirstMovie = (movies.currentPage - 1) * movies.moviesPerPage;

            for(let i = 0; i <  res.length; i++){
                if (filtreByCategoryT.indexOf(res[i].category) < 0){
                    filtreByCategoryT.push(res[i].category);
                }
                if ((i>= indexOfFirstMovie) && (i < (indexOfFirstMovie + movies.moviesPerPage))){
                    newMoviesT.push(res[i]);
                }
            }
            totalPagesT = Math.ceil(res.length / movies.moviesPerPage);
        }
         dispatch({
             type: DELETE_MOVIES,
             movies: res,
             currentPage: movies.currentPage,
             moviesPerPage: movies.moviesPerPage,
             totalPages: totalPagesT,
             newMovies: newMoviesT,
             filtreByCategory: filtreByCategoryT,
             valueMultiselect: valueMultiselectT,
         });
    }
}
export function changedPerPage(val) {
    return (dispatch) => {

            dispatch({
                type: CHANGED_MOVIES_PER_PAGE,
                moviesPerPage: parseInt(val),
            });
    }
}

export function changedCurrentPage(val) {
    return (dispatch) => {
        dispatch({
            type: CHANGED_MOVIES_CURRENTPAGE,
            currentPage: parseInt(val),
        });
    }
}

export function handleMultiSelect(val) {
    return (dispatch) => {
        let valueMultiselectT = [].slice.call(val).map(item => item.value);

        dispatch({
            type: MULTI_SELECT,
            valueMultiselect: valueMultiselectT,

        });
    }
}