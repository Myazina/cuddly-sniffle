import React, { useEffect, useState } from 'react';
import "./components/App.css";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import Timer from "./components/Timer";
import { Board } from "./models/Boadr";
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';

const App = () => {
  const [board, setBoard]= useState(new Board());
  const [whitePlayer, setWhitePlayer] =  useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] =  useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player|null>(null)
    

  useEffect(()=>{
    restart()
    setCurrentPlayer(whitePlayer);
  },[])

  function restart(){ 
    const newBoard= new Board();
    newBoard.initCells()
    newBoard.addFigure()
    setBoard(newBoard)
   }
   function swapPlayer(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE? blackPlayer:whitePlayer)
  }

  return (
    <div className = "app">
     <Timer
     restart={restart}
     currentPlayer={currentPlayer}
     />
     <BoardComponent 
     board={board}
     setBoard={setBoard}
     currentPlayer={currentPlayer}
     swapPlayer={swapPlayer}
     />
      <div>
        <LostFigures
         title="Cerne Figure"
         figures={board.lostBlackFigure}
        />
        <LostFigures
        title="Bile Figure"
        figures={board.lostWhiteFigure}
       />
      </div>
    </div>
  );
};
export default App;
