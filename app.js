const grid = document.querySelectorAll(".grid-container div");
const gridDim  = 9;
const cbutton = document.querySelector(".create")
const sbutton = document.querySelector(".solve")
const vbutton = document.querySelector(".visual")
const ele = document.getElementsByName("difficulty")
let interval = 0
let board = [];
let triedBoards =  []
let currIndex = 0
let diff;

function fillBoard(bd, ques){
    // clearBoard()
    for(let i = 0; i < bd.length; i++){
        for(let j = 0; j < bd[i].length; j++){
            //set numbers from board in correct positions
            //disable input
            if(bd[i][j] !== 0){
                grid[j + i*gridDim].children[0].value = bd[i][j];
                if(ques){
                    grid[j + i*gridDim].children[0].disabled = true;
                }
            }
        }
    }
}

function clearBoard(ques){
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            if(ques){
                grid[j + i*gridDim].children[0].value = null;
                grid[j + i*gridDim].children[0].disabled = false;

            }else if(!grid[j + i*gridDim].children[0].disabled){
                grid[j + i*gridDim].children[0].value = null;
            }
        }
    }   
}

function solve(bd){
    let empty;
    let copy;

    if(solved(bd)){
        fillBoard(bd, false)
        return true
    }else empty = findCordEmpty(bd) //returns coordinates of first empty cell (row wise search)

    for(let i = 1; i < 10; i++){
        if(valid(bd, empty, i)){
            bd[empty.r][empty.c] = i
            copy = $.extend(true, [], bd);
            triedBoards.push(copy)

            if(solve(bd)){
                return true
            }

            bd[empty.r][empty.c] = 0
            copy = $.extend(true, [], bd);
            triedBoards.push(copy)
        }
    }

    return false //if it reaches here, board is unsolvable
}

function valid(bd, cell, num){
    //check for dupRows
    for(let i = 0; i < bd[0].length; i++){
        if(bd[cell.r][i] == num){
            return false
        }
    }

    //check for dupColumns
    for(let i = 0; i < bd.length; i++){
        if(bd[i][cell.c] == num){
            return false
        }
    }

    //chek for dupBoxes
    let box_x = Math.floor(cell.c / 3)
    let box_y = Math.floor(cell.r / 3)

    for(let i = box_y*3; i < box_y*3 + 3; i++){
        for(let j = box_x*3; j < box_x*3 + 3; j++){
            if(bd[i][j] == num){
                return false
            }
        }
    }
    
    return true
}


//return true if no blank spaces remaining, else false
function solved(bd){
    for(let i = 0; i < bd.length; i++){
        for(let j = 0; j < bd[i].length; j++){
            if(bd[i][j] == 0){
                return false
            }
        }
    }
    return true
}

function findCordEmpty(bd){
    for(let i = 0; i < bd.length; i++){
        for(let j = 0; j < bd[i].length; j++){
            if(bd[i][j] == 0){
                return {r: i, c: j}
            }
        }
    }
}

cbutton.onclick = function(){    
    if(board.length !== 0){
        clearBoard(true)
    }

    for(let i = 0; i < ele.length; i++){
        if(ele[i].checked){
            diff = ele[i].value
            break
        }
    }

    if(diff == null){
        alert("select difficulty")    
        return
    }

     fetch("https://sugoku.herokuapp.com/board?difficulty=" + diff)
     .then(response => {
         return response.json();
     })
     .then(response => {
         board = response.board;
         console.log(board)
         fillBoard(board, true)
     })
}

sbutton.onclick = function(){
    solve(board)
} 

vbutton.onclick = function(){
    interval = setInterval(visualize, 100)
}

function visualize(){
    if(currIndex < triedBoards.length){
        clearBoard(false)
        fillBoard(triedBoards[currIndex], false)
        currIndex++
    } else clearInterval(interval)

}

// function clearBoard(){
//     for(let i = 0; i < board.length; i++){
//         for(let j = 0; j < board[i].length; j++){
//             if(grid[j + i*gridDim].children[0].disabled){
//                 board[i][j] = 0;
//             }
//         }
//     }
// }


