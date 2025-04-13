import './App.css'
import { useState } from 'react'
import confetti from "canvas-confetti"


const TURN ={
  'X':'x',
  'O':'o'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


const Square = ({children,isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () =>{
    updateBoard(index)
  }

  return(
    <div onclick= {handleClick} className = {className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = Status(Array(9).fill(null))
  const [turn, setTurn] = Status(TURN.X)
  const [winner, setWinner] = Status(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)


    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const checkEndGame = (newBoard) => {
    return board.every((square) => square !== null)
  }

  const checkWinner = (boardToCheck) => {
    for (const combos of WINNER_COMBOS){
      const [a,b,c]= combos
      if (
        boardToCheck[a] && boardToCheck[a]===boardToCheck[b] && boardToCheck[a]===boardToCheck[c]
      ){return boardToCheck[a]}
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
  }


  return(
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'> 
              <h2>
                {
                  winner === false ? 'Empate' : 'Gano: '
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onclick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App