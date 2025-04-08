import React, { useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { FC} from 'react';
import { start } from "repl";
import { Colors } from "../models/Colors";

interface TimerProps { 
    currentPlayer:Player|null;
    restart: () => void;
 }

 const Timer: FC<TimerProps>=({currentPlayer,restart})=>{
    const [blackTime, setBlackTime]= useState(300)
    const [whiteTime, setWhiteTime]= useState(300)
    const timer = useRef<null| ReturnType<typeof setInterval>>(null)

    useEffect(()=>{
        startTimer()
    },[currentPlayer])
    
    function startTimer(){
      if(timer.current){
        clearInterval(timer.current)        
      }
      const callBack = currentPlayer?.color===Colors.WHITE? decrementWhiteTimer:decrementBlackTimer
      timer.current = setInterval(callBack, 1000)
    }
    function decrementBlackTimer(){
      setBlackTime((c) => Math.max(c-1, 0))
    }
    function decrementWhiteTimer(){
      setWhiteTime((c) => Math.max(c-1, 0))     
    }
    const handleRestart = () =>{
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }            
    return (
       <div>
         <div>
           <button onClick={handleRestart}>Restart Game</button>
         </div>
         <h2>Black-{blackTime}</h2>
         <h2>White-{whiteTime}</h2> 
         {blackTime ===  0 ? <div><h2>Game over for Black</h2></div> : null }
         {whiteTime ===  0 ? <div><h2>Game over for White</h2></div> : null }
       </div>
    )    
 }
 export default Timer;