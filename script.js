let numbers = document.getElementsByClassName('box');
let reset = document.querySelector('.reset');
let cells = document.getElementsByClassName('cell');
let solveBtn = document.querySelector('.solve');
let clickedNum;
const SIZE = 9;

const updateBackgroundColor = (number)=>{
    Array.from(numbers).forEach(element=>{
        element.style.backgroundColor = 'seagreen';
    })
    number.style.backgroundColor = 'lawngreen';
}

const updateSudokuGrid = ()=>{
    Array.from(cells).forEach(cell=>{
        cell.addEventListener('click', ()=>{
            if (clickedNum !== '❌' && clickedNum != 0) {
                cell.innerText = Number(clickedNum);
                cell.style.backgroundColor = 'lightgray';
            }
            else {
                cell.innerText = '';
                cell.style.backgroundColor = 'white';
            }
        })
    })
}

const isValid = (matrix, n, row, col)=>{
    let x = row - row % 3;
    let y = col - col % 3;
    for (let i = 0; i < SIZE; i++) {
        if (matrix[row][i] == n)
            return false;
    }
    for (let i = 0; i < SIZE; i++) {
        if (matrix[i][col] == n)
            return false;
    }
    for (let i = x; i < x + 3; i++) {
        for (let j = y; j < y + 3; j++) {
            if (matrix[i][j] == n)
                return false;
        }
    }
    return true;
}

const isTerminated = (matrix)=>{
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (matrix[i][j] == '')
                return false;
        }
    }
    return true;
}

const solveSudoku = (matrix)=>{
    if (isTerminated(matrix))
        return true;
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (matrix[i][j] === '') {
                for (let num = 1; num < 10; num++) {
                    if (isValid(matrix, num, i, j)) {
                        matrix[i][j] = num;
                        let status = solveSudoku(matrix);
                        if (status === true)
                            return true;
                    }
                }
                matrix[i][j] = '';
                return false;
            }
        }
    }
}

const isValidSudokuGrid = (matrix)=>{
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (matrix[i][j] !== '') {
                let n = matrix[i][j];
                let status = ()=>{
                    let x = i - i % 3;
                    let y = j - j % 3;
                    for (let m = 0; m < SIZE; m++) {
                        if (m != j && matrix[i][m] == n)
                            return false;
                    }
                    for (let m = 0; m < SIZE; m++) {
                        if (m != i && matrix[m][j] == n)
                            return false;
                    }
                    for (let p = x; p < x + 3; p++) {
                        for (let q = y; q < y + 3; q++) {
                            if (p != i && q != j && matrix[p][q] == n)
                                return false;
                        }
                    }
                    return true;
                }
                if (status() == false)
                    return false;
            }
        }
    }
    return true;
}

Array.from(numbers).forEach(number=>{
    number.addEventListener('click', ()=>{
        clickedNum = number.innerText;
        updateBackgroundColor(number);
        updateSudokuGrid();
    })
})

solveBtn.addEventListener('click', ()=>{
    let matrix = [];
    let row = [];
    let k = 0;
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            row.push(document.getElementsByClassName('cell')[k].innerText);
            k++;
        }
        matrix.push(row);
        row = [];
    }
    k = 0;
    let result = isValidSudokuGrid(matrix);
    if (result === true) {
        let isSolvable = solveSudoku(matrix);
        if (!isSolvable) {
            alert("This Sudoku can't be solved");
            return;
        }
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                document.getElementsByClassName('cell')[k].innerText = matrix[i][j];
                k++;
            }
        }
    }
    else {
        alert("This Sudoku can't be solved");
    }
})

reset.addEventListener('click', ()=>{
    Array.from(document.getElementsByClassName('cell')).forEach(cell=>{
        cell.innerText = '';
        cell.style.backgroundColor = 'white';
    })
    Array.from(document.getElementsByClassName('box')).forEach(element=>{
        element.style.backgroundColor = 'seagreen';
    })
    clickedNum = String('');
})