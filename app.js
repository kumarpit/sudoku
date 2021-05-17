const grid = document.querySelectorAll(".grid-container div");
const gridDim  = 9;
const sbutton = document.querySelector(".solve")
const vbutton = document.querySelector(".visual")
let interval = 0
let board;
let triedBoards =  []
let currIndex = 0

document.addEventListener("DOMContentLoaded", function() {
     //fetch board from heroku
     fetch("https://sugoku.herokuapp.com/board?difficulty=easy")
     .then(response => {
         return response.json();
     })
     .then(response => {
         board = response.board;
         console.log(board)
         fillBoard(board)
     })
})

function fillBoard(bd){
    for(let i = 0; i < bd.length; i++){
        for(let j = 0; j < bd[i].length; j++){
            //set numbers from board in correct positions
            //disable input
            if(bd[i][j] !== 0){
                grid[j + i*gridDim].children[0].value = bd[i][j];
                // grid[j + i*gridDim].children[0].disabled = true;
            }
        }
    }
}

function solve(bd){
    let empty;

    if(solved(bd)){
        fillBoard(bd)
        return true
    }else empty = findCordEmpty(bd) //returns coordinates of first empty cell (row wise search)

    for(let i = 1; i < 10; i++){
        if(valid(bd, empty, i)){
            bd[empty.r][empty.c] = i
            // triedBoards.push(bd)

            if(solve(bd)){
                return true
            }

            bd[empty.r][empty.c] = 0
            // triedBoards.push(bd)
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

sbutton.onclick = function(){
    solve(board)
} 

vbutton.onclick = function(){
    interval = setInterval(visualize, 100)
}

function visualize(){
    if(currIndex < triedBoards.length){
        fillBoard(triedBoards[currIndex])
        currIndex++
    } else clearInterval(interval)
}


