// EVERY React component needs this import statement. 
import React from 'react';
// here, the project is importing prop(erty) types so that it can strictly define 
// what the format/data type/object type of each Square component prop(erty)
// should be. 
import PropTypes from 'prop-types';

import './Square.css'

// you will notice that Square just uses "props" instead of defining specific
// props the way that Board does (src/components/Board.js line 83). These are
// essentially two different ways to do the same thing. 
//
// if React sees (props), it already knows that this component will have props 
// as defined by line 74. 
//
// likewise, if React sees something like (value, onClickCallback, id), it still
// needs to verify that we have actually defined those as usable props for this 
// component, we're just very specific here. 
//
// that said, i can't find a source that explains using one over the other.
// what i do know is that it seems to depend on whether you're using pure React
// or something like React Redux that can be more particular about this.
//
// IN ANY CASE, here we define the Square component, and pass in as input 
// the props as defined by line 74.
const Square = (props) => {
  
  // updatedSquare doesn't take any additional input, but fires whenever 
  // Square is clicked. 
  // 
  // updatedSquare is a wrapper function that passes in the value of a Square
  // component's 'id' prop(erty) to the function that is assigned as 
  // the Square component's 'onClickCallback' property and runs that function.
  //
  // you ABSOLUTELY need updatedSquare wrapped around props.onClickCallback(props.id)!!!
  // 
  // if you directly place props.onClickCallback(props.id) after onClick = in line 66,
  // when Square first renders it will run onClickCallback only ONCE and never
  // again unless you refresh and have to restart everything since you have to pass 
  // in a parameter. as such, it thinks it's a script it needs to run to show 
  // the app to the user, NOT something the app needs to remember to do when 
  // Square is clicked. 
  //
  // IF props.onClickback didn't need a parameter passed in (but it does), THEN  
  // it can be added directly after onClick so long as there are NO parentheses 
  // (ex) using props.onClickCallback, NOT props.onClickCallback())
  //
  // wrapping props.onClickCallback(props.id) in updatedSquare GUARANTEES that 
  // the onClickCallback function is only called SPECIFICALLY when clicked.
  const updatedSquare = () => {

    // Please see src/App.js line 469 which explains two possible functions 
    // that are passed as the function representing onClickCallback and what they do. 
    props.onClickCallback(props.id); // id is id we passed in for the square component 
  };

  // Square will render a button that is styled according to the "square" 
  // property in src/components/Square.css, then onClick states that if Square
  // is clicked, it will fire updatedSquare as explained in line 29.
  //
  // when rendered, Square will display the value stored in its 'value' 
  // prop(erty).
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

// NOTE: YOU NEED THIS LINE SO THAT src/components/Board.js CAN IMPORT AND USE 
// SQUARE.
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


