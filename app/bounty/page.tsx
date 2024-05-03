"use client"

import React, { useEffect, useState } from "react"
import { useLocalStorage, shuffleArray } from "../useLocalStorage"
import { Card, fetchDeck } from "../deckManager"
import { MdKeyboardBackspace, MdOutlineRestartAlt } from "react-icons/md"

const Bounty = () => {
  const cardback = "https://backs.scryfall.io/large/2/2/222b7a3b-2321-4d4c-af19-19338b134971.jpg?1677416389"
  const rulesImg = "https://cards.scryfall.io/large/back/a/c/acd27632-4c28-4dc3-90ad-b94fe176b91a.jpg?1712319002"

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
    setBountyIndex(-1)
    initBountyDeck()
  }

  return (
    <div className="flex items-center justify-center" key="bountyGroup">
      <div key="bountyRules" className="relative">
        <img className="rounded-3xl" key="rules" src={rulesImg} />
        <button
          className="absolute top-6 left-6 border-4 border-leather-light border-dashed shadow-lg shadow-leather-dark rounded-full bg-leather-dark"
          onClick={prevCard}
        >
          <MdKeyboardBackspace className="size-20 sm:size-16 fill-leather-light active:fill-black" />
        </button>
        <button
          className="absolute top-6 right-6 border-4 border-leather-light border-dashed shadow-lg shadow-leather-dark rounded-full bg-leather-dark"
          onClick={nextCard}
        >
          <MdKeyboardBackspace className="size-20 sm:size-16 fill-leather-light active:fill-black rotate-180" />
        </button>
        <button
          className="absolute bottom-6 left-6 w-[4.4rem] h-[4.4rem] border-4 border-leather-light border-dashed shadow-lg shadow-leather-dark rounded-full bg-leather-dark"
          onClick={increaseBounty}
        >
          <p className="text-orange-100 text-6xl active:fill-black">{bountyLevel}</p>
        </button>
        <button
          className="absolute bottom-6 right-6 border-4 border-leather-light border-dashed shadow-lg shadow-leather-dark rounded-full bg-leather-dark"
          onClick={newGame}
        >
          <MdOutlineRestartAlt className="size-20 sm:size-16 fill-leather-light active:fill-black" />
        </button>
      </div>
      <div key="bountyDeck" className="" onClick={nextCard}>
        <img className="rounded-3xl" key="topdeck" src={topCard} />
      </div>
    </div>
  )
}

export default Bounty
