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

// IF READING ON GITHUB:
//
// GO HERE TO WALK THROUGH App.js:
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/App.js
//
// GO HERE TO WALK THOUGH Square.js
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Square.js
//
// please let me know if this helps! i am happy to do the same (albeit in a more
// readable format) for Inspiration Board. 