export const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () =>{
      updateBoard(index)
    }
  
    return(
      <div onClick= {handleClick} className = {className}>
        {children}
      </div>
    )
}

export const dibujarTabla = ({board, updateBoard}) => {
    return (
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
    )
}