import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { shuffleArray } from '../utils/shuffle-array'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { Card } from '../typings'
import SingleCard from '../components/single-card'

const cardImages = [
  { src: '/images/img01.png', matched: false },
  { src: '/images/img02.png', matched: false },
  { src: '/images/img03.png', matched: false },
  { src: '/images/img04.png', matched: false },
  { src: '/images/img05.png', matched: false },
  { src: '/images/img06.png', matched: false },
  { src: '/images/img07.png', matched: false },
  { src: '/images/img08.png', matched: false }
]

const Home: NextPage = () => {

  const [cards, setCards] = useState<Card[]>([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState<Card | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
  const [disabled, setDisabled] = useState(false)

  // start new game when app starts
  useEffect(() => {
    startNewGame()
  }, [])

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        // match
        setCards(prevCards => prevCards.map(card => {
          // note that this would also work: if (card.src === choiceOne.src) return {...card, matched: true}
          if (card.id === choiceOne.id || card.id === choiceTwo.id) return { ...card, matched: true }
          return card
        }))
        resetTurn()
      } else {
        // no match
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // start new game
  const startNewGame = () => {
    const shuffledCards = shuffleArray([...cardImages, ...cardImages])
      .map(card => ({ ...card, id: uuidv4() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  return (
    <div className={styles.container}>
      <h1>Match Cards</h1>
      <button onClick={startNewGame}>New Game</button>
      <div className={styles.cardGrid}>
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
      <p>Turns: {turns}</p>
    </div>
  )
}

export default Home
