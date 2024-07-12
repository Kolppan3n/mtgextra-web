"use client"

import React, { useEffect, useState } from "react"
import { useLocalStorage, shuffleArray } from "../hooks/useLocalStorage"
import { Card, fetchDeck } from "../deckManager"
import MagicButton from "../components/MagicButton"

const Archenemy = () => {
  const cardback = "https://backs.scryfall.io/large/1/b/1b2396d4-9048-439d-96bd-354288518841.jpg?1665006146"

  const [archenemyDeck, setArchenemyDeck] = useLocalStorage<Card[]>("archenemyDeck", [])
  const [archenemyIndex, setArchenemyIndex] = useLocalStorage("archenemyIndex", -1)
  const [pinnedScheme, setPinnedScheme] = useLocalStorage("pinnedScheme", "")
  const [topCard, setTopCard] = useState(cardback)

  const initArchenemyDeck = async () => {
    const temp = await fetchDeck(`https://api.scryfall.com/cards/search?q=type%3Ascheme`)
    setArchenemyDeck(shuffleArray(temp))
  }

  useEffect(() => {
    if (!(Array.isArray(archenemyDeck) && archenemyDeck.length)) initArchenemyDeck()
  }, [])

  useEffect(() => {
    setTopCard(archenemyDeck[archenemyIndex]?.imgUrl ?? cardback)
  }, [archenemyIndex])

  const nextCard = () => {
    if (archenemyIndex < archenemyDeck.length - 1) {
      setArchenemyIndex((prev: number) => prev + 1)
    }
  }

  const prevCard = () => {
    if (archenemyIndex > -1) {
      setArchenemyIndex((prev: number) => prev - 1)
    }
  }

  const updatePin = () => {
    pinnedScheme == "" ? setPinnedScheme(topCard) : setPinnedScheme("")
  }

  const newGame = () => {
    setArchenemyIndex(-1)
    initArchenemyDeck()
  }

  return (
    <div key="archenemyDeck" className="relative select-none w-full max-w-[750px] max-h-[1050px]">
      <img
        className="rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] lg:rounded-[2.5rem] w-full h-full"
        src={topCard}
        key="topdeck"
      />
      <img className="absolute top-0 bottom-1/4 left-0 right-0 m-auto w-[30vh]" src={pinnedScheme} key="ongoing" />
      <div className="absolute top-0 left-0 w-full flex justify-between p-3">
        <MagicButton btnType="back" onClick={prevCard} />
        <MagicButton btnType="next" onClick={nextCard} />
      </div>
      <div className="absolute bottom-0 left-0 w-full  flex justify-between p-3">
        <MagicButton btnType={pinnedScheme == "" ? "pin" : "unpin"} onClick={updatePin} />
        <MagicButton btnType="reset" onClick={newGame} />
      </div>
    </div>
  )
}

export default Archenemy
