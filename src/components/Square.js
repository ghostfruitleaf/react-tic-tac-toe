// EVERY React component needs this import statement. 
import React from 'react';
// here, the project is importing prop(erty) types so that it can strictly define 
// what the format/data type/object type of each Square component prop(erty)
// should be. 
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

// this segment of code defines each REQUIRED prop(erty) that Square needs in 
// order to properly render, and what the format of the prop(erty) should be.
Square.propTypes = {
  // representing 'x', 'o', or '' -- MUST be a string
  value: PropTypes.string.isRequired,
  // representing what happens when Square is clicked. MUST be a function
  onClickCallback: PropTypes.func.isRequired,
  // representing the unique id of this Square component, corresponding to 
  // the matching {id: , value: } object in the 'squares' prop(erty) of Board 
  // (see src/components/Board.js line 81), which turn contains  values as 
  // defined and controlled by App (see src/components/App.js line 80)
  id: PropTypes.number.isRequired,
};

export default Square;
// ^ confession, i added the semicolon while writing this up... shh... 

// IF READING ON GITHUB:
//
// DISCLAIMER AND NAVIGATION: 
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/WALKTHOUGH_DISCLAIMER.md
//
// GO HERE TO WALK THROUGH App.js:
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/App.js
//
// GO HERE TO WALK THOUGH Board.js
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Board.js
//
// please let me know if this helps! i am happy to do the same (albeit in a more
// readable format) for Inspiration Board. 


