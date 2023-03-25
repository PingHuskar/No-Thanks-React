import { useState, useEffect } from 'react'
import gsap from 'gsap'
import './App.css'

function App() {
  const startNum = 3
  const numOfCard = 33
  const leftCard = 3
  const [arr, setArr] = useState(localStorage.getItem(`cardOnBoard`)?.split(',').map(x=> parseInt(x)) || [...Array(numOfCard).keys()].map(i => i+startNum))
  const [topCard, setTopCard] = useState(localStorage.getItem(`topCard`) || '')
  const [gameLog, setGameLog] = useState(localStorage.getItem(`gameLog`)?.split(',') || '')
  const draw = () => {
    if (arr.length > leftCard) {
        const rmItem = arr[Math.floor(Math.random()*arr.length)]
        localStorage.setItem(`cardOnBoard`, arr.filter(item => item !== rmItem).toString())
        localStorage.setItem(`topCard`, rmItem.toString())
        localStorage.setItem(`gameLog`, [...gameLog, rmItem].toString())
        setGameLog(localStorage.getItem(`gameLog`)?.split(',') || '')
        setTopCard(localStorage.getItem(`topCard`) || '???')
        setArr(localStorage.getItem(`cardOnBoard`)?.split(',').map(x=> parseInt(x)) || [...Array(numOfCard).keys()].map(i => i+startNum))
    }
  }
  const reset = () => {
    localStorage.removeItem(`topCard`)
    localStorage.removeItem(`cardOnBoard`)
    localStorage.removeItem(`gameLog`)

    setTopCard('')
    setArr([...Array(numOfCard).keys()].map(i => i+startNum))
    setGameLog([])
  }

  useEffect(() => {
    gsap.fromTo(`#topCardLetter`,{
      x: 0,
      y: 0,
      fontSize: 0,
    },{
      x: 0,
      y: 0,
      fontSize: 72,
      duration: .5,
      delay: 0,
      stagger: .25,
    })
  },[topCard])
  return (
    <div className="App">
      <h1>No Thanks! RNG</h1>
      {
        topCard ? 
        <h2>Current Card <span id="topCard">{topCard.split('').map((l: string) => {
          return <span id='topCardLetter'>{l}</span>
        })}</span></h2>
        : 
        ''
      }
        <div className="board">
          <div>
            {arr.map((i,index) => {
              return <span>{i}</span>
            })}
          </div>
        </div>
        <div className="gamelog">
          { gameLog && gameLog.length !== 0 ? `Game Log :` : `` }
          {
            [...gameLog].map((element) => {
              return <span key={element}>{element}</span>
            })
          }
          {/* {gameLog ?? gameLog.join(',')} */}
        </div>
        <div className="btn">
            <button className={arr.length > leftCard ? '' : `hide`} onClick={draw}>Open a Card</button>
            <button className={topCard ? `` : `hide`} type='reset' onClick={reset}>Reset</button>
        </div>
    </div>
  )
}

export default App
