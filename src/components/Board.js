import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  let squareGrid = []; 
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const currentSquare = 
      <Square
        id={squares[row][col].id}
        value={squares[row][col].value}
        key={squares[row][col].id}
        onClickCallback={onClickCallback}
      />
      squareGrid.push(currentSquare); 
    }
  }
  
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
