import './App.css';
import PropTypes from 'prop-types';
import ListOfMovies from './components/ListOfMovies'
function App() {
  return (
    <div className="App">

          <ListOfMovies />

    </div>
  );
}
App.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func
};
export default App;
