import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ handleMovieSelection, title, rotten_tomatoes_rating, imdb_rating, imdb_votes }) => (
    <tr onClick={handleMovieSelection}>
        <td>{title ? title : '-'}</td>
        <td>{rotten_tomatoes_rating ? rotten_tomatoes_rating : '-'}</td>
        <td>{imdb_rating ? imdb_rating : '-'}</td>
        <td>{imdb_votes ? imdb_votes : '-'}</td>
    </tr>
);

Row.propTypes = {
    handleMovieSelection: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    rotten_tomatoes_rating: PropTypes.number,
    imdb_rating: PropTypes.number,
    imdb_votes: PropTypes.number,
};

export default Row;
