let selectNum
let errors = 0

//represents : nitial Sudoku board with empty spaces'*' and solution 
let board = [
  '******2**',
  '*8***7*9*',
  '6*2***5**',
  '*7**6****',
  '***9*1***',
  '****2**4*',
  '**5***6*3',
  '*9*4***7*',
  '**6******'
]

let solution = [
  '957613284',
  '483257196',
  '612849537',
  '178364952',
  '524971368',
  '369528741',
  '845792613',
  '291436875',
  '736185429'
]

// dark mode 
function darkMode() {
  let dark = document.body
  dark.classList.toggle('dark-mode')
}

// show and hide game rules
function gameRules() {
  let rules = document.getElementById('gameRules')
  if (rules.style.display === 'none') {
    rules.style.display = 'block'
  } else {
    rules.style.display = 'none'
  }
}

// call the setGame function when winddow load
window.onload = function () {
  setGame()
  document.getElementById('reset').addEventListener('click', resetGame)
  document.getElementById('solve').addEventListener('click', solveGame)
}
// creates numbers 1-9 and added them to the page , creates box element to make sudoku bord 
function setGame() {
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement('div')
    number.id = i
    number.innerText = i
    number.addEventListener('click', selectNumber)
    number.classList.add('number')
    document.getElementById('digits').appendChild(number)
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let box = document.createElement('div')
      box.id = r + '*' + c
      if (board[r][c] != '*') {
        box.innerText = board[r][c]
      }
      if (r == 2 || r == 5) {
        box.classList.add('horizontal-line')
      }
      if (c == 2 || c == 5) {
        box.classList.add('vertical-line')
      }
      box.addEventListener('click', selectbox)
      box.classList.add('box')
      document.getElementById('board').append(box)
    }
  }
}
// 
function selectNumber() {
  if (selectNum != null) {
    selectNum.classList.remove('number-selected')
  }
  selectNum = this
  selectNum.classList.add('number-selected')
}

function selectbox() {
  if (selectNum) {
    if (this.innerText != '') {
      return
    }

    let location = this.id.split('*')
    let r = parseInt(location[0])
    let c = parseInt(location[1])

    if (solution[r][c] == selectNum.id) {
      this.innerText = selectNum.id
    } else {
      errors += 1
      document.getElementById('errors').innerText = errors
    }
  }
}

function solveGame() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let box = document.getElementById(r + '*' + c)
      if (box.innerText === '') {
        box.innerText = solution[r][c]
        box.classList.add('box-solved')
      }
    }
  }
}

function resetGame() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let box = document.getElementById(r + '*' + c)
      if (board[r][c] === '*') {
        box.innerText = ''
      }
    }
  }
  if (selectNum) {
    solution
    selectNum.classList.remove('number-selected')
    selectNum = null
  }

  errors = 0
  document.getElementById('errors').innerText = errors
}
