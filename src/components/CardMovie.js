import React from 'react';
import '../style/CardMovie.css';
import {connect} from 'react-redux'
import {deleteMovie} from '../actions/movies';

class CardMovie extends React.Component{
    constructor(props) {
        super(props);
    }

    handelChangeSwitch = (id) =>{
    };
    handelRemove = (id) => {
        this.props.deleteMovie(id, this.props.movies);
    };

    render() {
        const {movie} = this.props || [];
        return (
            <div className="card">
                <h1>{movie.title}</h1>

                <div className="bio">
                    <p>Category:  {movie.category}</p>
                </div>
                <div className="stats">
                    <div className="col">
                        <p className="stat">{movie.likes}</p>
                        <p className="label">likes</p>
                    </div>
                    <div className="col">
                        <p className="stat">{movie.dislikes}</p>
                        <p className="label">dislikes</p>
                    </div>
                </div>

                <div className="buttons2">
                    <button onClick={e => this.handelRemove(movie.id)}>Remove</button>
                </div>
                <div className="buttons">
                    <span>dislike</span>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round">

                            </span>
                    </label>
                    <span>like</span>
                </div>
            </div>
        );
    }
}
const  mapStateToProps = (state) => ({
    movies: state.movies,
});

export default connect(mapStateToProps, {deleteMovie})(CardMovie);
