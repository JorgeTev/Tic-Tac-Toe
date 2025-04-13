import './App.css'
import { useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square.jsx'
import { TURN } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { winnerModal } from './components/WinnerModal.jsx'

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

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
  }


  return(
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <dibujarTabla board={newBoard} updateBoard={updateBoard}></dibujarTabla>

      <section className='turn'>
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>

      <winnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App