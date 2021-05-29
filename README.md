# Sudoku
This application allows the user to solve sudoku puzzles of varying difficulty. It utilizes a backtracking algorithm to provide solutions of any sudoku board and gives the user the option to visualize the algorithm at work.

# How the Backtracking Algorithm works
The first empty square in the board is found (row wise search) and is filled with the first valid value for that square. This becomes the new board and the proccess is repeated. If a situation where no valid values are possible for a given square is encountered, the algorithm goes back to the previously filled square, fills in the next valid value for that square and continues. This process is repeated until there are no empty squares on the board - the board is solved - or if all possible valid values are exhausted and empty squares still exist - the board is unsolvable.

```javascript
function solve(bd){
    let empty;
    let copy;

    if(solved(bd)){
        if(show){
            fillBoard(bd, false);
        }
        return true
    }else empty = findCordEmpty(bd); //returns coordinates of first empty cell (row wise search)

    for(let i = 1; i < 10; i++){
        if(valid(bd, empty, i)){
            bd[empty.r][empty.c] = i;
            copy = $.extend(true, [], bd); //copy of board
            triedBoards.push(copy); //copy added to triedBoards

            if(solve(bd)){
                return true;
            }

            bd[empty.r][empty.c] = 0; //backtrack and fill with next valid value
            copy = $.extend(true, [], bd);
            triedBoards.push(copy); //copy added to triedBoards
        }
    }

    return false; //board is unsolvable
}

```

# Visualization
The visualization works by keeping track of all changes made to the board in an array. Whenever a number is filled to the board, a copy of the board is made and added to an array. When the user clicks on the visualize button, all boards in this array are shown with an interval.

```javascript
let currIndex = 0;
function visualize(){
    if(currIndex < triedBoards.length){
        clearBoard(false);
        fillBoard(triedBoards[currIndex], false);
        currIndex++;
    } else clearInterval(interval);
}

```

# To-Do
Add OCR to enable user to upload photo of sudoku puzzle and the app can overlay the solution over the uploaded picture.

