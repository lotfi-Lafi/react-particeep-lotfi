  import React from 'react';
  import {Button} from 'react-bootstrap';
  import '../style/Pagination.css';
const Pagination = ({totalPages, handelClickPagination}) => {
    console.log('totalPages Pagination ==> ', totalPages);
    const pages = [...Array(totalPages).keys()].map(num => num+1);

  return (
    <div>
        {
            pages.map(num => (
                <Button className="pagination" variant="outline-primary" key={num} onClick={e => handelClickPagination(num)} >{num}</Button>
            ))
        }
    </div>
  );
};

export default Pagination;