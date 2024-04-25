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

  const allPlanesUrl = "q=t%3Aplane&unique=cards"
  const onlyMagicUrl = "q=set%3Aopca&unique=cards"

  const createPlanarDeck = async () => {
    const temp = await fetchDeck("https://api.scryfall.com/cards/search?" + allPlanesUrl)
    shuffleArray(temp)
    setPlanarDeck(temp)
  }

  useEffect(() => {
    if (!(Array.isArray(planarDeck) && planarDeck.length)) createPlanarDeck()
  }, [])

  useEffect(() => {
    setTopCard(planarDeck[planarIndex]?.front.imgUrl ?? cardback)
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
    if (Array.isArray(planarDeck) && planarDeck.length) {
      const temp: Card[] = [...planarDeck]
      const firstCard: String = temp[0].front.name

      //Sekotetaan niin monta kertaa että alkaa eri kortilla kuin viime peli
      while (temp[0].front.name === firstCard) shuffleArray(temp)

      setPlanarDeck(temp)
      setPlanarIndex(-1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div key="planarDeck" className="relative lg:rotate-90 select-none">
        <img
          className="rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] lg:rounded-[2.5rem] w-screen lg:w-auto"
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
