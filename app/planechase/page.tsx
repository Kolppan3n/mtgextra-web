"use client"

import React, { useEffect, useState } from "react"
import useLocalStorage from "../useLocalStorage"
import { Card, fetchDeck, shuffleArray } from "../deckManager"
import { MdKeyboardBackspace, MdOutlineRestartAlt } from "react-icons/md"

const Planechase = () => {
  const cardback = "https://backs.scryfall.io/large/7/8/7840c131-f96b-4700-9347-2215c43156e6.jpg?1665006192"

  const [deck, setDeck] = useLocalStorage("deck", "")
  const [index, setIndex] = useLocalStorage("index", -1)
  const [topCard, setTopCard] = useState(cardback)

  const createPlanarDeck = async () => {
    const temp = await fetchDeck("https://api.scryfall.com/cards/search?q=set%3Aohop&unique=cards")
    shuffleArray(temp)
    setDeck(temp)
  }

  useEffect(() => {
    if (deck === "") createPlanarDeck()
  }, [])

  useEffect(() => {
    setTopCard(deck[index]?.imgUrl ?? cardback)
  }, [index])

  const nextCard = () => {
    if (index < deck.length - 1) {
      setIndex((prev: number) => prev + 1)
    }
  }

  const prevCard = () => {
    if (index > -1) {
      setIndex((prev: number) => prev - 1)
    }
  }

  const newGame = () => {
    if (deck !== "") {
      const temp: Card[] = [...deck]
      const firstCard: String = temp[0].name

      //Sekotetaan niin monta kertaa että alkaa eri kortilla
      while (temp[0].name === firstCard) shuffleArray(temp)

      setDeck(temp)
      setIndex(-1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div key="deck" className="relative lg:rotate-90">
        <img
          key="topdeck"
          src={topCard}
          className="rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] lg:rounded-[2.5rem] w-screen lg:w-auto"
        />
        <div className="absolute top-0 left-0 w-full flex justify-between p-3">
          <button
            onClick={nextCard}
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
          >
            <MdKeyboardBackspace className="size-16 sm:size-24 rotate-90 fill-brass active:fill-black" />
          </button>
          <button
            onClick={newGame}
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
          >
            <MdOutlineRestartAlt className="size-16 sm:size-24 -rotate-90 fill-brass active:fill-black" />
          </button>
        </div>
        <div onClick={prevCard} className="absolute bottom-0 left-0 w-full  flex justify-between p-3">
          <button className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass">
            <MdKeyboardBackspace className="size-16 sm:size-24 -rotate-90 fill-brass active:fill-black" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Planechase
