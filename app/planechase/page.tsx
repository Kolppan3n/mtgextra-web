"use client"

import React, { useEffect, useState } from "react"
import { MdKeyboardBackspace, MdOutlineRestartAlt } from "react-icons/md"
import useLocalStorage from "../components/useLocalStorage"
import { Card, fetchDeck, shuffleArray } from "../components/deckManager"

const Planechase = () => {
  const cardback = "https://backs.scryfall.io/large/7/8/7840c131-f96b-4700-9347-2215c43156e6.jpg?1665006192"

  const [deck, setDeck] = useLocalStorage("deck", "")
  const [index, setIndex] = useLocalStorage("index", -1)
  const [topdeck, setTopdeck] = useLocalStorage("url", cardback)

  const createPlanarDeck = async () => {
    console.log("!FETCHING A DECK FROM THE INTERNET!")
    const temp = await fetchDeck("https://api.scryfall.com/cards/search?q=set%3Aohop&unique=cards")
    shuffleArray(temp)
    setDeck(temp)
  }

  useEffect(() => {
    if (deck === "") createPlanarDeck()
  }, [])

  useEffect(() => {
    index >= 0 ? setTopdeck(deck[index].imgUrl) : setTopdeck(cardback)
  }, [index])

  const nextCard = () => {
    if (index < deck.length - 1) {
      setIndex(index + 1)
    }
  }

  const prevCard = () => {
    if (index > -1) {
      setIndex(index - 1)
    }
  }

  const newGame = () => {
    console.log(deck)
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div key="deck" className="relative lg:rotate-90">
        <img key="topdeck" src={topdeck} className="rounded-[3.7rem] lg:rounded-[2.5rem] w-screen lg:w-auto" />
        <div className="absolute top-0 left-0 w-full flex justify-between p-3">
          <button
            onClick={nextCard}
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
          >
            <MdKeyboardBackspace className="size-24 rotate-90 fill-brass active:fill-black" />
          </button>
          <button
            onClick={newGame}
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
          >
            <MdOutlineRestartAlt className="size-24 -rotate-90 fill-brass active:fill-black" />
          </button>
        </div>
        <div onClick={prevCard} className="absolute bottom-0 left-0 w-full  flex justify-between p-3">
          <button className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass">
            <MdKeyboardBackspace className="size-24 -rotate-90 fill-brass active:fill-black" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Planechase
