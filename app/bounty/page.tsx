"use client"

import React, { useEffect, useState } from "react"
import { useLocalStorage, shuffleArray } from "../hooks/useLocalStorage"
import { Card, fetchDeck } from "../deckManager"
import MagicButton from "../components/MagicButton"

const Bounty = () => {
  const cardback = "https://cards.scryfall.io/large/back/a/c/acd27632-4c28-4dc3-90ad-b94fe176b91a.jpg?1712319002"

  const [bountyDeck, setBountyDeck] = useLocalStorage<Card[]>("bountyDeck", [])
  const [bountyIndex, setBountyIndex] = useLocalStorage("bountyIndex", -1)
  const [bountyLevel, setBountyLevel] = useLocalStorage("bountyLevel", 1)
  const [topCard, setTopCard] = useState(cardback)

  const initBountyDeck = async () => {
    const temp = await fetchDeck("https://api.scryfall.com/cards/search?q=is%3Atoken+o%3A%22collect+your+reward%22")
    shuffleArray(temp)
    setBountyDeck(temp)
  }

  useEffect(() => {
    if (!(Array.isArray(bountyDeck) && bountyDeck.length)) initBountyDeck()
  }, [])

  useEffect(() => {
    setTopCard(bountyDeck[bountyIndex]?.imgUrl ?? cardback)
  }, [bountyIndex])

  const increaseBounty = () => {
    if (bountyLevel < 4) {
      setBountyLevel((prev: number) => prev + 1)
    } else {
      setBountyLevel(1)
    }
  }

  const showRules = () => {
    topCard != cardback ? setTopCard(cardback) : setTopCard(bountyDeck[bountyIndex]?.imgUrl ?? cardback)
  }

  const nextCard = () => {
    if (bountyIndex < bountyDeck.length - 1) {
      setBountyIndex((prev: number) => prev + 1)
    }
  }

  const prevCard = () => {
    if (bountyIndex > -1) {
      setBountyIndex((prev: number) => prev - 1)
    }
  }

  const newGame = () => {
    setBountyLevel(1)
    setBountyIndex(-1)
    initBountyDeck()
  }

  return (
    <div key="archenemyDeck" className="relative select-none w-full max-w-[750px]">
      <img
        className="rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] lg:rounded-[2.5rem] w-full max-h-[1050px]"
        src={topCard}
        key="topdeck"
      />
      <div className="absolute top-0 left-0 right-0 flex justify-between p-3">
        <MagicButton btnType="back" onClick={prevCard} />
        <MagicButton btnType="next" onClick={nextCard} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3">
        <MagicButton btnType={bountyLevel} onClick={increaseBounty} />
        <MagicButton btnType="wanted" onClick={showRules} />
        <MagicButton btnType="reset" onClick={newGame} />
      </div>
    </div>
  )
}

export default Bounty
