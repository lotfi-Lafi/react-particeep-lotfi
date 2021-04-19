import React from 'react';
import {connect} from 'react-redux'
import { getMovies, changedPerPage, handleMultiSelect, changedCurrentPage } from '../actions/movies';
import CardMovie from './CardMovie';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../style/listOfMovies.css';
import Pagination from './Pagination';

class ListOfMovies extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillUpdate(newState){
        console.log('componentWillUpdate this.props.movies - 2 = ', this.props.movies);
        console.log('componentWillUpdate newState.movies - 2 = ', newState.movies);
        /*if (this.props.movies && this.props.movies.movies && this.props.movies.movies.length !== newState.movies.movies.length){
            console.log('componentWillUpdate = ', this.props.movies.movies.length,newState.movies.movies.length);

        }*/
        if ( (this.props.movies.moviesPerPage !== newState.movies.moviesPerPage) || (this.props.movies.currentPage !== newState.movies.currentPage)){
            this.props.getMovies(newState.movies.currentPage, newState.movies.moviesPerPage);
        }
    }
    componentDidMount() {
        this.props.getMovies(this.props.movies.currentPage, this.props.movies.moviesPerPage);
    }
    handeChange = (e) => {
        this.props.changedPerPage(e.target.value);
    };
    handelSelect = (e) => {
        this.props.handleMultiSelect(e.target.selectedOptions);
    };
    handelClickPagination = (val) => {
        this.props.changedCurrentPage(val);
    };
    render(){
        const { movies } = this.props || [];
        return(
            <Container>
                <Row>
                        <Form.Group as={Col} controlId="exampleForm.SelectCustomSizeLg">
                                <Form.Label>Custom select Large</Form.Label>
                                <Form.Control as="select" size="lg"   onChange={(e) => this.handeChange(e)}>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="12">12</option>
                                </Form.Control>
                                <Form.Label>Filter multiselect</Form.Label>
                                <Form.Control as="select" multiple value={this.props.movies.valueMultiselect} onChange={e => this.handelSelect(e)}>
                                    {
                                        this.props.movies && this.props.movies.filtreByCategory ?
                                            this.props.movies.filtreByCategory.map(ele => (
                                                <option value={ele}>{ele}</option>
                                            )) : null
                                    }
                                </Form.Control>

                        </Form.Group>

                </Row>

                <Row>
                    <Col xs="2" sm="2" md="8"  lg="12" xl="12" >
                        {
                            movies.newMovies.length > 0 ?
                                movies.newMovies.filter((val) => {
                                    if (this.props.movies&& this.props.movies.valueMultiselect && this.props.movies.valueMultiselect.length === 0){
                                        return val;
                                    }else if (this.props.movies && this.props.movies.valueMultiselect && this.props.movies.valueMultiselect.indexOf(val.category) >= 0){
                                        return val;
                                    }
                                }).map((ele, key) => (
                                    <CardMovie key={key} movie={ele} />
                                )): null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" sm="" md="8"  lg="12" xl="12">
                        <div className="container-pagination">
                            <Pagination totalPages={this.props.movies.totalPages} handelClickPagination={this.handelClickPagination}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const  mapStateToProps = (state) => ({
    movies: state.movies,
    currentPage: state.currentPage,
    moviesPerPage: state.moviesPerPage,
    totalPages: state.totalPages,
    newMoviesT: state.newMoviesT,
    filtreByCategory: state.filtreByCategory,
    valueMultiselect: state.valueMultiselect,
});

export default connect(mapStateToProps, {getMovies, changedPerPage, handleMultiSelect, changedCurrentPage})(ListOfMovies);
