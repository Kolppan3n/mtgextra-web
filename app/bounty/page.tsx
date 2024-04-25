"use client"

import React, { useEffect, useState } from "react"
import { useLocalStorage, shuffleArray } from "../useLocalStorage"
import { Card, fetchDeck } from "../deckManager"

const Bounty = () => {
  const cardback = "https://backs.scryfall.io/large/2/2/222b7a3b-2321-4d4c-af19-19338b134971.jpg?1677416389"
  const rulesImg = "https://cards.scryfall.io/large/back/a/c/acd27632-4c28-4dc3-90ad-b94fe176b91a.jpg?1712319002"

  const [bountyDeck, setBountyDeck] = useLocalStorage<Card[]>("bountyDeck", [])
  const [bountyIndex, setBountyIndex] = useLocalStorage("bountyIndex", -1)
  const [topCard, setTopCard] = useState(cardback)

  const createBountyDeck = async () => {
    const temp = await fetchDeck(
      "https://api.scryfall.com/cards/search?q=is%3Atoken+o%3A%22collect+your+reward%22&unique=cards"
    )
    shuffleArray(temp)
    setBountyDeck(temp)
  }

  useEffect(() => {
    if (!(Array.isArray(bountyDeck) && bountyDeck.length)) createBountyDeck()
  }, [])

  useEffect(() => {
    setTopCard(bountyDeck[bountyIndex]?.front.imgUrl ?? cardback)
  }, [bountyIndex])

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
    if (Array.isArray(bountyDeck) && bountyDeck.length) {
      const temp: Card[] = [...bountyDeck]
      const firstCard: String = temp[0].front.name

      //Sekotetaan niin monta kertaa että alkaa eri kortilla
      while (temp[0].front.name === firstCard) shuffleArray(temp)

      setBountyDeck(temp)
      setBountyIndex(-1)
    }
  }

  return (
    <div className="flex flex-grow items-center justify-center">
      <div key="bountyRules">
        <img className="rounded-3xl" key="rules" src={rulesImg} />
      </div>
      <div key="bountyDeck" className="">
        <img className="rounded-3xl" key="topdeck" src={topCard} />
      </div>
    </div>
  )
}

export default Bounty
