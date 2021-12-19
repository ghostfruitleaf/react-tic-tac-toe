import React from 'react';
import PropTypes from 'prop-types';

import './Square.css'

const Square = (props) => {
  
  const updatedSquare = () => {
    props.onClickCallback(props.id); // id is id we passed in for the square component 
  };

  return <button
    className="square"
    onClick = {updatedSquare}
  >
    {props.value}
  </button>
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
// ^ confession, i added the semicolon while writing this up... shh... 

// IF READING ON GITHUB:
//
// GO HERE TO WALK THROUGH App.js:
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/App.js
//
// GO HERE TO WALK THOUGH Board.js
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Board.js
//
// please let me know if this helps! i am happy to do the same (albeit in a more
// readable format) for Inspiration Board. 


