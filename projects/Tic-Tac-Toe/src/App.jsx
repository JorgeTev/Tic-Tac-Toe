import './App.css'

const TURN = {
  X:'x',
  O:'o'
}


const Square = ({children, isSelected, updateBoard, index}) => {
  const className= `square ${isSelected ? 'is-selected': ''}`

  const handleClick = () =>{
    updateBoard()
  }
  return (
    <div className="square">
      {children}
    </div>
  )
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

function App() {
  const [board, setBoard]= useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURN.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ){return boardToCheck[a]}
    }
    return null
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner((prevWinner)=>{
        console.log(`Ganador: ${newWinner}, el anterior era ${prevWinner}`)
        return newWinner
      })
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((turn, index) => {
            return (
              <Square
                key = {index}
                index = {index}
                updateBoard={updateBoard}
              >
                {index}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURN.X}> {TURN.X} </Square>
        <Square isSelected={turn === TURN.O}> {TURN.O} </Square>
      </section>
    </main>
  )
}

export default App