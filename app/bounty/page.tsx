"use client"

import React, { useEffect, useState } from "react"
import { useLocalStorage, shuffleArray } from "../useLocalStorage"
import { Card, fetchDeck } from "../deckManager"
import { MdKeyboardBackspace, MdOutlineRestartAlt } from "react-icons/md"
import { GiWantedReward } from "react-icons/gi"

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
    setBountyIndex(-1)
    initBountyDeck()
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div key="archenemyDeck" className="relative select-none">
        <img
          className="rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] lg:rounded-[2.5rem] w-screen md:w-[750px] md:h-[1050px]"
          src={topCard}
          key="topdeck"
        />
        <div className="absolute top-0 left-0 w-full flex justify-between p-3">
          <button
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass disabled:invisible"
            onClick={prevCard}
          >
            <MdKeyboardBackspace className="size-16 sm:size-24 fill-brass active:fill-black" />
          </button>
          <button
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
            onClick={nextCard}
          >
            <MdKeyboardBackspace className="size-16 sm:size-24 rotate-180 fill-brass active:fill-black" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-between p-3">
          <button
            className="size-16 sm:size-24 rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
            onClick={increaseBounty}
          >
            <p className="text-brass text-6xl sm:text-8xl active:fill-black">{bountyLevel}</p>
          </button>
          <button className="bg-gradient-radial from-black active:from-brass active:to-brass" onClick={showRules}>
            <GiWantedReward className="size-16 sm:size-24 fill-brass active:fill-black" />
          </button>
          <button
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
            onClick={newGame}
          >
            <MdOutlineRestartAlt className="size-16 sm:size-24 fill-brass active:fill-black" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bounty
