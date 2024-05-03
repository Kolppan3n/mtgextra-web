"use client"

import React, { useEffect, useState } from "react"
import { useLocalStorage, shuffleArray } from "../useLocalStorage"
import { Card, fetchDeck } from "../deckManager"
import { MdKeyboardBackspace, MdOutlineRestartAlt } from "react-icons/md"

const Planechase = () => {
  const cardback = "https://backs.scryfall.io/large/7/8/7840c131-f96b-4700-9347-2215c43156e6.jpg?1665006192"

  const [planarDeck, setPlanarDeck] = useLocalStorage<Card[]>("planarDeck", [])
  const [planarIndex, setPlanarIndex] = useLocalStorage("planarIndex", -1)
  const [topCard, setTopCard] = useState(cardback)

  const OPCA = "set%3Aopca"
  const MOC = "set%3Amoc"
  const WHO = "set%3Awho"
  const or = "+or+"

  const fetchFilter: string = OPCA + or + MOC

  const initPlanarDeck = async () => {
    const temp = await fetchDeck(`https://api.scryfall.com/cards/search?q=t%3Aplane+%28${fetchFilter}%29`)
    setPlanarDeck(shuffleArray(temp))
  }

  useEffect(() => {
    if (!(Array.isArray(planarDeck) && planarDeck.length)) initPlanarDeck()
  }, [])

  useEffect(() => {
    setTopCard(planarDeck[planarIndex]?.imgUrl ?? cardback)
  }, [planarIndex])

  const nextCard = () => {
    if (planarIndex < planarDeck.length - 1) {
      setPlanarIndex((prev: number) => prev + 1)
    }
  }

  const prevCard = () => {
    if (planarIndex > -1) {
      setPlanarIndex((prev: number) => prev - 1)
    }
  }

  const newGame = () => {
    setPlanarIndex(-1)
    initPlanarDeck()
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div key="planarDeck" className="relative lg:rotate-90 select-none">
        <img
          className="rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] lg:rounded-[2.5rem] w-screen lg:w-[750px] lg:h-[1050px]"
          src={topCard}
          key="topdeck"
        />
        <div className="absolute top-0 left-0 w-full flex justify-between p-3">
          <button
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass disabled:invisible"
            onClick={nextCard}
          >
            <MdKeyboardBackspace className="size-16 sm:size-24 rotate-90 fill-brass active:fill-black" />
          </button>
          <button
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
            onClick={newGame}
          >
            <MdOutlineRestartAlt className="size-16 sm:size-24 -rotate-90 fill-brass active:fill-black" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full  flex justify-between p-3">
          <button
            className="rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
            onClick={prevCard}
          >
            <MdKeyboardBackspace className="size-16 sm:size-24 -rotate-90 fill-brass active:fill-black" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Planechase
