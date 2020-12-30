import React from 'react';
import PropTypes from 'prop-types';

import './Square.css'

const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.
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

export default Square
