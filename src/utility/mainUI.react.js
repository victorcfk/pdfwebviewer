const { useState, useEffect } = React;

function mainUI(){
  
  const[PDFLink, setPDFLink]        = useState([{squares: Array(9).fill(null)}]);
  
  useEffect(
    ()=>{
      
    },[PDFLink]);
  
  const jumpToStepFunc = function(stepNum){
    //console.log('jump: ', stepNum);
    
    setStepNumber(stepNum);
    setXIsNext(stepNum%2 === 0);
  }
  
  const calculateWinner = function(squares) {
    
    if(!squares) return null;
    
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
    
  const moves = function(history,jumpToStepFunc){
    const fullHistoryOfMoves = 
          history.map((step, moveIndex)=> {
            const desc = (moveIndex !== 0) ? 
                  `Go to move #${moveIndex}`:
                  `Go to start of game`;

            return (
              <li key={`move${moveIndex}`}> 
                <button 
                  onClick = {() => {jumpToStepFunc(moveIndex);} }>
                  {desc}
                </button>
              </li>);
      });
    
    return fullHistoryOfMoves;
  }
   
  const status = function(winner){
     return winner ? 
          `StepNo.${stepNumber} Winner is ${winner}` : 
          `StepNo.${stepNumber} Next player: ${xIsNext? 'X':'O'}`;
   }
  
  // console.log(`render_stepNum: `,stepNumber);
   return (
     <div className="game">
        <div className="game-board">
          <Board 
            squares={history[stepNumber].squares}
            onSquareClick={setSquareClicked}
            />
        </div>
        <div className="game-info">
          <div>{status(calculateWinner(history[stepNumber].squares))}</div>
          <ol>{moves(history,jumpToStepFunc)}</ol>
        </div>
      </div>
    );
  
}

// ========================================

ReactDOM.render(
  <mainUI />,
  document.getElementById('root')
);
