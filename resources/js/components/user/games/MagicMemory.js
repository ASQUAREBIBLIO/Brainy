import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import SingleCard from './SingleCard';
import '../../../../css/app.css';

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png",matched: false},
  {"src": "/img/ring-1.png",matched: false},
  {"src": "/img/scroll-1.png",matched: false},
  {"src": "/img/shield-1.png",matched: false},
  {"src": "/img/sword-1.png",matched: false}
]

function MagicMemory() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = ()=> {
    const shuffleCards = [...cardImages,...cardImages]
    .sort(()=>Math.random()- 0.5)
    .map((card)=>({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }
// handle a choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

//compare 2 selected cards
useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if(card.src ===choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else {
      setTimeout(() => resetTurn(),1000)
    }
  }
}, [choiceOne, choiceTwo])

console.log(cards)

//reset choices and increase turn
const resetTurn= () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}
// start the game automatically
useEffect(() => {
   shuffleCards()
}, [])


  return (
    <div className="body mt-0 mb-2">
        <div className="App">
            <div>
                <h4>Games</h4>
                <h6>Magic Memory</h6>
            </div>

            <div className="display-flex">
                <button className="shuffle_btn" onClick={shuffleCards}>New Game</button>
                <a href="/user/index/play" className="p-2 ml-2">Finish the game</a>
            </div>

            <div className="card-grid">
                {cards.map(card => (
                    <SingleCard
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                    />
                ))}
            </div>
            <p> Turns: {turns}</p>
        </div>
    </div>
  );
}


export default MagicMemory;
if (document.getElementById('magic_memory')) {
    ReactDOM.render(<MagicMemory />, document.getElementById('magic_memory'));
}
