window.onload = function () {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    for (let a = 0; a < rows; a++) {
        let row = [];
        for (let b = 0; b < columns; b++){
            row.push(' ');

    // Where the "div tage" was created in code words <div id="0-0" class="Part"></div>
            let part = document.createElement("div");
            part.id = a.toString() + "-" + b.toString();
            part.classList.add("part");
            part.addEventListener("click", setPart);
            document.getElementById("board").append(part);
        }
        board.push(row);
    }
}

function setPart() {
    if (matchOver) {
        return;
    }
    let places = this.id.split("-");
    let a = parseInt(places[0]);
    let b = parseInt(places[1]);

    a = currColumns[b];
    if (a < 0) {
        return;
    }

    board[a][b] = currPlayer;
    let part = document.getElementById(a.toString() + "-" + b.toString());
    if (currPlayer == playerPink) {
        part.classList.add("pink-piece");
        currPlayer = playerBlue;
    }
    else {
        part.classList.add("blue-piece");
        currPlayer = playerPink;
    }
    a -= 1;
// This is updating the array
    currColumns[b] = a;
    checkWinner();
}

function checkWinner() {
    // Checking horizontally for a win
    for (let a = 0; a < rows; a++) {
        for (let b = 0; b < columns - 3; b++) {
            if (board[a][b] != ' ') {
                if (board[a][b] == board[a][b + 1] && board[a][b + 1] == board[a][b + 2] && board[a][b + 2] == board[a][b + 3]) {
                    setWinner(a, b);
                    return;
                }
            }
        }
    }

    //Checking Vertically for a win
    for (let b = 0; b < columns; b++) {
        for (let a = 0; a < rows - 3; a++) {
            if (board[a][b] != ' ') {
                if (board[a][b] == board[a + 1][b] && board[a + 1][b] == board[a + 2][b] && board[a + 2][b] == board[a + 3][b]) {
                    setWinner(a, b);
                    return;
                }
            }
        }
    }


    // Checking anti diagonally for a win 
    for (let a = 0; a < rows - 3; a++) {
        for (let b = 0; b < columns - 3; b++) {
            if (board[a][b] != ' ') {
                if (board[a][b] == board[a + 1][b + 1] && board[a + 1][b + 1] == board[a + 2][b + 2] && board[a + 2][b + 2] == board[a + 3][b + 3]) {
                    setWinner(a, b);
                    return;
                }
            }
        }
    }

    // Checking for a win diagonally 
    for (let a = 3; a < rows; a++) {
        for (let b = 0; b < columns - 3; b++) {
            if (board[a][b] != ' ') {
                if (board[a][b] == board[a - 1][b + 1] && board[a - 1][b + 1] == board[a - 2][a + 2] && board[a - 2][b + 2] == board[a - 3][b + 3]) {
                    setWinner(a, b);
                    return;
                }
            }
        }
    }
}


function setWinner(a, b) {
    let winner = document.getElementById("winner");
    if (board[a][b] == playerPink) {
        winner.innerText = "You Win GrassHopper";
    } else {
        winner.innerText = "The Sensei Wins";
    }
    matchOver = true;
}

var playerPink = "P"
var playerBlue = "O"
var currPlayer = playerPink;
var currColumns;
var matchOver = false;
var board; 
var rows = 6;
let columns = 7;


