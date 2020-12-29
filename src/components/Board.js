import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  let squareGrid = []; 
  // let currentId = 0;
  // iterate over squares 
  // for each ind. element, push <Square/> with data from element as props
  for (let row = 0; row < 3; row += 1) {
    // squares.push([]);
    for (let col = 0; col < 3; col += 1) {

      //squares[row][column] = {}
    //squares[row].push({
    //  id: currentId, => squares[row][column].id
    //  value: ''}) squares[row][column].value 
    // }

    // squareGrid.push(<Square value = {something} id = {something} onClickCallback = {something} />)
  }
  // currentId += 1;
  
  // Complete this for Wave 1
  // squares is a 2D Array, but 
  //  you need to return a 
  
  return squareGrid; 
}

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(squareList);
  return <div className="grid" >
    {squareList}
  </div>
}

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  ),
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
