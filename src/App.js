import React, { useState } from 'react'; // you need this code so that React sees that this does React things
import './App.css';
import Board from './components/Board'; // this will allow App to use the Board component defined in src/components/Board.js

// INTRO 
// hello! i was informed that it would be helpful to walk through a solution 
// for react tic tac toe, so i (pauline) have created this branch to walk 
// though the solution we ended up submitting for this project!

// THE REACT + COOKING/BAKING ANALOGY (skip if you don't want/need this)
// okay, so THIS was the project where we came up with this amazing analogy
// for explaining react:
//
// * think of your favorite recipe -- it has ingredients
// you have to put together to make the dish, right? 
//
// * in react, the app is your final dish.
//
// * as such, the components are the ingredients. 
//
//   just like each ingredient has its own variant (ex. using elbow pasta or 
//   spiral pasta for a mac and cheese recipe), each component has their own 
//   "props" (aka properties), whose values are stored in the app state. 
//
// * think of rendering your app like cooking your dish. you may follow the 
//   recipe to the tee, you may swap an ingredient or two, you may add some more 
//   of an ingredient or take something out. but more or less it will 
//   hopefully come out as the final fish.
// 
// * in react, this would be the same as re-rending your app to reflect the 
//   app's current state. what the user sees on the screen as a result of the 
//   app's state is equivalent to the "final dish"
//
// * when you re-render in react, you are "re-cooking the dish," and that is 
//   essentially what useState () is helping you control. 
//
// * if you use an egg to make a cheese omelette, for instance, you can't use 
//   that egg again to make a spinach omelette, because you already used it -- 
//   so you still need to use an egg, but you have to grab a new egg for the
//   spinach omelette. it might be a brown egg, a duck egg, or an animal-free
//   egg substitute, but it will still be serve the purpose of the egg or 
//   egg substitute in your omelette
//
// * similarly, when you update React's app state, you have to re-render ALL the 
//   components along with the information you updated. so in the line: 
// 
//   const [squares, setSquares] = useState(generateSquares());
//
//   useState(generateSquares) informs your app that the first time you render/
//   cook your dish, the 'squares' from const [squares, setSquares], will come 
//   from the output of generateSquares().
//   
//   in turn, squares will tell your App what "kind" of squares you will send 
//   into your Board component: 
// 
//   <Board squares={squares} onClickCallback={checkForWinner() ? () => {} : updateSquare}/>
//   
//   setSquares from const[squares, setSquares] is the function you use to 
//   tell your app to re-render (cook a new batch of your recipe), and it updates
//   your app to re-render with the new squares in your Board component (aka 
//   cook a new batch of your recipe with a variation). 
//
//   this is why setSquares has to regenerate the ENTIRE board, instead of just 
//   needing to update the square that changed
//
//   hopefully this analogy helps someone out with understanding state in React!
//   if i can remember to do it, i'd like to turn this into a medium article, which 
//   will be easier to read.


// SETTING UP FUNCTIONS AND VARIABLES 
// for default variables and functions that do the same thing regardless of 
// the current app state. 

// if i recall, player 1 always started with 'x' and player 2 always started
// with 'o'
const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

// this function generates an array of 3-element arrays of object as below: 
//
// [ [ {id: 0, value: ''}, {id: 0, value: ''}, {id: 0, value: ''} ],
//   [ {id: 0, value: ''}. {id: 0, value: ''}, {id: 0, value: ''} ],
//   [ {id: 0, value: ''}, {id: 0, value: ''}, {id: 0, value: ''} ] ]
//
// in each object: 
//
// {
//    id: <what square this object represents>
//    value: <either 'x' or 'o' depending on which player clicked it>
// }
//
// the ids correspond to a 3x3 square as follows: 
// 
// [ 0, 1, 2 ]
// [ 3, 4, 5 ]
// [ 6, 7, 8 ]
//
// this is used to generate the initial empty "board" before the game starts,
// as well as reset the board to its initial empty "board" state after a game is
// finished. 
// 
const generateSquares = () => {
  // start with an empty array
  const squares = [];

  // for consistency with javascript being 0-indexed
  let currentId = 0;

  // the outer loop will add each row of squares
  for (let row = 0; row < 3; row += 1) {
    squares.push([]);

    // within each row, the inner loop to add the individual "squares"
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1; // only updates after adding a single square
    }
  }

  return squares;
}

// THE APP FUNCTION ITSELF 
// where the app maintains its state and figures out what to render
const App = () => {
  // the line below takes a variable, "squares", that represents the 3x3
  // grid of squares the Board component will use to check who has selected 
  // what Square, as well as the information it will pass to the Square
  // components it renders. 
  //
  // "setSquares" defines the function that will take the current
  // value of the squares variable and update the app's state. 
  //
  // "useState" informs
  // that the initial state of squares will come from the output of 
  // generateSquares()
  const [squares, setSquares] = useState(generateSquares());
  // the line below takes a variable, "currentSquare", that represents the 
  // current player ('x' or 'o') -- this variable could have been named a lot
  // better. that is to say, it will inform whether the next square clicked will
  // be 'x' or 'o'
  //
  // "setCurrentSquare" defines the function that will change the currentSquare
  // to represent the next player AFTER the current player has chosen their 
  // square
  // 
  // "useState" informs
  // that the initial state of currentSquare will be "false", and that "false"
  // will represent "x", while "true" will represent "o"
  // ^^^ while it makes this easier, i think we could have not used a boolean 
  // to make this clearer
  const [currentSquare, setCurrentSquare] = useState(false); // false = X 

  // this is the callback function -- that is to say, this is the function that 
  // fires/runs after a Square rendered on Board component is clicked. 
  // 
  // the reason the function is defined here in App.js and not Board.js or 
  // Square.js is because due to the useState defined above for the "squares"
  // variable, App.js already has access to the state of "squares", meaning that 
  // the function being defined here can take advantage of that instead of 
  // needing to continually send the squares value to and back between 
  // components. 
  //
  // PARAMETERS:
  // id: the id of the square as defined by "squares," the variable that was 
  // passed down to the Board component, which uses it to generate Square 
  // components, each with a corresponding id. when a Square component is 
  // clicked, it passes its id prop(erty) value to updateSquare. 
  const updateSquare = (id) => { 
    // deep copying (creating an entirely different object with the same values
    // as the object you want to copy, versus just creating an object that acts 
    // sort of like a container to the object you want to copy, think creating 
    // a shortcut to a file or folder on your computer) in javascript is rather 
    // tricky, and normally you would need to download a package to be able to 
    // do so properly. 
    //
    // in this case, i notice that we created a newSquares variable, but we put
    // the corresponding square objects from the old squares variable in instead
    // of making an entirely new object. 
    //
    // we weren't too experienced with javascript when we did this project, so 
    // we basically brute forced it. looking at this code, i THINK it's because
    // squares is an array of an array of objects, so the reference React looks
    // for in updateSquares to know it's a new object is whether the ARRAY 
    // holding the array of objects is a different array from the current one. 
    // so it's fine to push everything else inside squares into newSquares
    //
    // this will pretty much be the same as generateSquares() except for a few
    // differences, which i will point out throughout the code.
    //
    // we are ALSO assuming that this function will only be called during a game
    // and NEVER when a game has been finished.  
    let newSquares = []; 

    // once again, we need to set each row up
    for (let row = 0; row < 3; row += 1) {
      newSquares.push([]); 
      
      // however, the way we handle columns will be different
      for (let col = 0; col < 3; col += 1) {

        // first we need to check if we're about to push in the object
        // represent the square that was clicked
        if (id === squares[row][col].id) {

          // if it has been clicked, we next need to check if there's already 
          // an 'x' or 'o' in this square according to the 'squares' variable.
          // since we're assuming this function is only called during an 
          // unfinished game, we don't want to accidentally change an 'x' or
          // 'o' that was already placed 
          if (!squares[row][col].value) {

            // at this point, the value of the square is empty so we know we 
            // can change the square, and we also established in line 156 that
            // that 'x' corresponds to FALSE and 'o' corresponds to TRUE for 
            // THIS particular solution. 
            //
            // so !currentSquare is NOT checking for 'x' or 'o' -- again, the
            // choice of variable data type and variable here was not our best 
            // call. rather, it is checking if currentSquare's value is FALSE,
            // corresponding to 'x' (PLAYER_1), or if currentSquare's value is
            // TRUE, corresponding to 'o' (PLAYER_2)
            if (!currentSquare) {
              squares[row][col].value = PLAYER_1; 
            } else { 
              squares[row][col].value = PLAYER_2; 
            }

            // so THIS line here is why i realize treating 'x' and 'o' as 
            // a boolean was actually not a good idea, because here, 
            // !currentSquare is doing something entirely different.
            //
            // if currentSquare === true, !currentSquare === false, therefore
            // setCurrentSquare will update the value of currentSquare to false.
            //
            // conversely, if currentSquare === false, !currentSquare === true, 
            // so setCurrentSquare will update the value of currentSquare to 
            // true. 
            setCurrentSquare(!currentSquare);
          }
        } 

        // once we've checked that each square is in the desired state (has 'x'
        // 'o', or '' where it needs to), we push it into newSquares in the 
        // corresponding row
        newSquares[row].push(squares[row][col])
      }
    }


    // at this point, we have put the new state of squares into newSquares to 
    // be updated to by setSquares. please see line 174 onwards for the full 
    // length explanation of why we needed newSquares to begin with. 
    setSquares(newSquares);
  }

  // checkForWinner is used to validate whether the game is finished or still
  // in progress.
  //
  // if the game is still in progress, checkForWinner will return an empty 
  // string, which is treated as a "falsy" value in javascript. 
  //
  // if the game is finished, checkForWinner also will check to see if PLAYER_1
  // (x) won, returning 'x' PLAYER_2 (o) won, returning 'o' or if it's a tie,
  // returning 'TIED'. all return values from checkForWinner will be strings. 
  const checkForWinner = () => {

    // credit to Ansel (when he was a TA!!) for this idea. this is an array 
    // of arrays. each subarray within WINNING_INDEX contains a set of three 
    // 2-element arrays, each represent the row and column of a square to check.
    // 
    // if all squares corresponding to the row/col of each 2-element array in 
    // a sub-array have the same value (all 'x' or all 'o'), this means that 
    // a WINNING SET is found and the game is over, and someone has won. 
    
    // if checkForWinner checks against every subarray in WINNING_INDEX and does
    // NOT find a WINNING SET:
    //
    // 1) the game is in progress (meaning that checkForWinner has found a 
    // Square with an empty string for a value instead of 'x' or 'o')
    //
    // 2) the game is tied (all Square components have either an 'x' or 'o')
    //
    const WINNING_INDEX = [
      [[0, 0], [0, 1], [0, 2]], 
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    // we start by assuming that the board is finished unless proven otherwise,
    // and we will use hasBlank to see if there is at least ONE empty square 
    // in the event that no WINNING SETS are identified through WINNING index.
    let hasBlank = false; // if the square is blank or not

    // as mentioned in the comment starting at line line 271, checkForWinner
    // iterates through every subarray (winSet) of WINNING_INDEX
    //
    // note that WINNING_INDEX is a constant and will ALWAYS have the same 
    // number of elements. as such, this solution is in fact an O(1) solution.
    // however, using WINNING_INDEX means it is more difficult to expand this 
    // solution to, say, a 4x4 tic tac toe board since solutions will have to be
    // manually added to WINNING_INDEX with the way this code is written. 
    for (const winSet of WINNING_INDEX) {
      
      // to track all the values in a winSet and the corresponding squares, 
      // an empty array was generated to track the values obtained from 
      // each square associated with a winSet
      const currentRow = []

      // now, check through every Square associated with each winPos of the
      // current winSet
      for (const winPos of winSet) {

        // where x = row, and y = column of the Square to look for
        const [x, y] = winPos;

        // first check to see if the value of the corresponding Square is 
        // an empty string. this means that if the code exits both for loops, 
        // the game is still in progress. 
        // 
        // so long as there is ONE square without an 'x' or 'o' the above 
        // statement applies. as such, we only need to check for a blank square 
        // once. we thought this code did that, but reading through i realize
        // it actually does not, and should have been optimized to:
        //
        // if(!squares[x][y].value && !hasBlank){
        //
        // which would prevent the code from entering this if block EVERY single
        // time it found a Square without an 'x' or 'o'
        if(!squares[x][y].value){
          hasBlank = true; // we don't need to check for blank after since we check it here already
        }

        // after the above check, current Row will receive either an 'x', 'o',
        // or empty string based on the value prop(erty) value in the 
        // corresponding Square. 
        currentRow.push(squares[x][y].value);  
      }

      // the moment we find a winSet where the corresponding Squares all have
      // 'x' or 'o', the game is OVER and someone has won, so we wouldn't
      // need to check any remaining winSet rows that follow.
      // 
      // note that the if block first checks for currentRow[0], since if 
      // currentRow[0] returns false, it's an empty string -- 'x' or 'o' 
      // would return a truthy value. 
      // THEN it checks that all other values in currentRow match the first, 
      // which would prevent the code from entering the if-block if any other
      // elements of currentRow was an empty string
      //
      // if BOTH of the above conditions pass, the function returns 'x' or
      // 'o' (depending on which character is in currentRow) and exits. 
      if(currentRow[0] && (currentRow[0] === currentRow[1] && currentRow[1] === currentRow[2] && currentRow[0])){ // ['x', 'o', 'x']

        // ABOUT NON-PYTHON SWITCH STATEMENTS 
        // 
        // a switch statement is essentially an abbreviated way to write 
        // an if-else statement. this is often used to keep code short, and in
        // the olden days, make the code run /slightly/ faster. 
        //
        // (back in the day memory was NOT cheap, so EVERY byte was precious. 
        // every character of code you typed was a byte of memory being 
        // processed, so it was important to not only make code easy to 
        // understand for humans, but also give machines running it as little 
        // work to do so as possible.)
        //
        // python does NOT have a switch statement capability the way that many 
        // other languages, including javascript. this was only briefly 
        // covered in c14's curriculum for ruby, which DOES have switch 
        // statements, so i'll overview what the code below is doing here: 
        //
        // IF (currentRow[0] === 'x'){ return 'x';} ELSE { return 'o'; }; 
        //
        // or, formatted: 
        //
        // if (currentRow[0] === 'x') {
        //  return 'x';
        // } else {
        //  return 'o';
        // }
        //
        // essentially, the '?' marks the end of the if statement you want to 
        // check, the ':' marks what should happen if the if statement is 
        // false.
        return currentRow[0] === 'x' ? 'x' : 'o';
      }
    }

    // if the code reaches this return statement, the game is either in progress
    // or tied. if hasBlank is true, at least one Square doesn't have an 'x' or
    // 'o' and the game is not finished yet, hence it returns an empty string. 
    // 
    // if hasBlank is false, all Squares have an 'x' or 'o' and the game is 
    // finished with a tie, hence returning 'TIED'
    //
    // please see line 364 for an in-depth explanation on the line's syntax
    // (aka it's using a "switch statement")
    return hasBlank ? '' : 'TIED';

  }

  // resetGame, when called, uses setSquares to update the state of the squares
  // variable to its initial state, so NO Square has an 'x' or an 'o' just like 
  // useState(generateSquares()) does to set the inital state of the squares
  // variable in line 141. 
  // 
  // resetGame is fired every time a user clicks the <button> element in the 
  // return value, hence it is assigned to onClick, as shown below: 
  //
  // <button onClick = {resetGame}>Reset Game</button>
  //
  // to review, {resetGame} is put in curly brackets to indicate this is 
  // javascript code to run and NOT JSX/HTML to render. 
  const resetGame = () => {
    setSquares(generateSquares());
  }

  // the return statement below now renders what the user will see.
  // className tells App.js to look for the corresponding property
  // in src/App.css
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* 
            in the curly brackets below, a string will always be returned, 
            since checkForWinner() will also always return a string. 
            
            see line 261 for more details. 
        */}
        <h2>Winner is {!checkForWinner() ? 'IN-PROGRESS' : checkForWinner()}</h2>
        
        {/* 
            the onClick property in <button> can be assigned a callback function
            that runs every time the <button> rendered below is clicked (hence,
            onClick). 
            
            see line 411 for more details on the callback function used here.  
        */}
        <button onClick = {resetGame}>Reset Game</button>
      </header>
      <main>

        {/* 
            here is where we render the Board component, which we imported 
            in line 3. 

            since Board already does the work of rendering, all the Square
            components, we don't need to import Square. 

            Board has a prop(erty), "squares", that we want to set equal to the 
            values of the "squares" variable we defined in line 141. this means 
            that every time "squares" is updated by setSquares, the app 
            re-renders and sends the new "squares" value to Board.

            the app will also send a different function to be assigned to the
            onClickCallback prop(erty) depending on the outcome of 
            checkForWinner(). 

            The code snippet below uses a SWITCH STATEMENT (see line 364):

            onClickCallback = {checkForWinner() ? () => {} : updateSquare}

            ^^^ what this is doing is: 
            1) checks for the outcome of checkForWinner().

            2) if checkForWinner() returns a TRUTHY value (in this case, 'x' or 
            'o'), assign onClickCallback an empty function, or () => {}, which 
            tells the app that when a Square is clicked, nothing will happen 
            because the game is finished. 

            3) if checkForWinner() returns a FALSY value (in this case, ''), we 
            need a Square to use updateSquare() as defined in line 173 to 
            update its current state and trigger the app to re-render to reflect
            the change IF that Square is clicked. 

            NOTE ON onClickCallback: 
            you'll see that Board looks for an onClickCallback -- this is 
            because the function you assign onClickCallback to is passed to 
            Board, then from Board to Square also onClickCallback. A Square 
            component has a prop(erty) called onClickCallback that was defined 
            beforehand in the assignment that represents a function it fires  
            when it is clicked. so we didn't have a choice i don't think... 

            note that <button> is an existing HTML/JSX element, hence it already
            has an onClick property defined. Board is a React component, so 
            by convention its properties are known as props. even though it's 
            functionally the same thing, though i guess they're referred to as
            props to explicitly note that React components handle their 
            properties different from HTML/JSX (?).     
            
            please visit src/components/Board.js to see what Board is doing OR
            if you are viewing this on GitHub, follow this link: 

            https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Board.js
        */}
        <Board squares={squares} onClickCallback={checkForWinner() ? () => {} : updateSquare}/> 
      </main>
    </div>
  );
}

// PLEASE NEVER FORGET THIS PART AT THE END. THIS TELLS THE CODE THAT OTHER
// FILES CAN USE THE CODE ABOVE, AS DEFINED IN LINE 129. 
//
// SOURCE: HAVE TOTALLY DONE IT BEFORE 
export default App;

// CONGRATS YOU HAVE MADE IT TO END OF App.js !!! there are two more files we 
// were required to edit: src/components/Board.js and src/components/Square.js
//
// tests, i believe, were optional or already provided. 
//
// IF READING ON GITHUB:
//
// DISCLAIMER AND NAVIGATION: 
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/WALKTHOUGH_DISCLAIMER.md
//
// GO HERE TO WALK THROUGH Board.js:
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Board.js
//
// GO HERE TO WALK THOUGH Square.js
// https://github.com/ghostfruitleaf/react-tic-tac-toe/blob/solution-walkthrough/src/components/Square.js
//
// please let me know if this helps! i am happy to do the same (albeit in a more
// readable format) for Inspiration Board. 

