import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

function Pagination(props) {
    const { totalRecords, perPage, onPageChange } = props;
    const pageCount = Math.ceil(totalRecords / perPage);

    return (
        <ReactPaginate
            previousLabel="‹"
            nextLabel="›"
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakLabel={'...'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={({ selected }) => onPageChange(selected + 1)}
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
    );
}

export default Pagination;
