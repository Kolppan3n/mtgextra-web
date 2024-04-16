"use client"

import React, { useEffect, useState } from "react"
import useLocalStorage from "../useLocalStorage"
import { GiLaurelCrown, GiTemplarShield, GiFist, GiTripleSkulls, GiPlainDagger } from "react-icons/gi"

const Usurper = () => {
  type Role = "King" | "Guard" | "Usurper" | "Assassin" | "Traitor"

  type RoleCard = { title: Role; name: string }

  const initRoster: RoleCard[] = []

  const [roster, setRoster] = useLocalStorage("roster", initRoster)
  const [commenced, setCommenced] = useLocalStorage("commenced", false)
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    switch (roster.length) {
      case 0:
        return setRoster([...roster, { title: "King", name: input }])
      case 1:
        return setRoster([...roster, { title: "Guard", name: input }])
      case 2:
        return setRoster([...roster, { title: "Usurper", name: input }])
      case 3:
        return setRoster([...roster, { title: "Assassin", name: input }])
      case 4:
        return setRoster([...roster, { title: "Assassin", name: input }])
      case 5:
        return setRoster([...roster, { title: "Traitor", name: input }])
      case 6:
        return setRoster([...roster, { title: "Assassin", name: input }])
      default:
        return console.log("The Roster is full already")
    }
  }

  const startGame = () => {
    /*setCommenced(true)*/
    if (roster.length >= 5) console.log("JEEEEEEEEE")
  }

  const resetRoster = () => {
    setRoster(initRoster)
  }

  const getIcon = (title: Role) => {
    switch (title) {
      case "King":
        return <GiLaurelCrown className="size-28 text-background -mb-1" />
      case "Guard":
        return <GiTemplarShield className="size-28 text-background py-2" />
      case "Usurper":
        return <GiFist className="size-28 text-background py-2" />
      case "Traitor":
        return <GiPlainDagger className="size-28 text-background py-2" />
      default:
        return <GiTripleSkulls className="size-28 text-background py-2" />
    }
  }

  const getRoleCard = (card: RoleCard, index: number) => {
    return card.title === "King" ? (
      <div key={index} className="relative w-40 h-56 justify-center items-center bg-brass rounded-xl">
        <div className="absolute flex justify-center left-0 right-0 bottom-1/3">{getIcon(card.title)}</div>
        <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl ">{card.name}</p>
      </div>
    ) : (
      <div key={index} className="group w-40 h-56 [perspective:1000px]">
        <div className="relative w-full h-full transition-all duration-500 group-hover:[transform:rotateY(180deg)] [transform-style:preserve-3d]">
          <div className="absolute w-full h-full bg-brass rounded-xl">
            {/*Front side*/}
            <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl ">{card.name}</p>
          </div>
          <div className="absolute w-full h-full justify-center items-center bg-brass rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
            {/*Back side*/}
            <div className="absolute flex justify-center left-0 right-0 bottom-1/3">{getIcon(card.title)}</div>
            <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl ">{card.title}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="h-screen flex flex-col items-center">
      {!commenced ? (
        <form className="w-full max-w-xs flex flex-col mt-12 rounded-xl py-6 px-4" onSubmit={handleSubmit}>
          <label className="text-center text-xl mb-5">New Game</label>
          <div className="flex flex-col mb-5">
            <label className="mb-2">Player Name</label>
            <input
              className="rounded-full px-4 py-2 bg-background-light"
              type="text"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex justify-evenly">
            <button className="rounded-full px-3 py-1 bg-brass text-text-black" type="submit">
              Add Player
            </button>
            <button className="rounded-full px-3 py-1 bg-brass text-text-black" type="button" onClick={startGame}>
              Start
            </button>
            <button className="rounded-full px-3 py-1 text-text-white border-2" type="button" onClick={resetRoster}>
              Reset
            </button>
          </div>
        </form>
      ) : (
        <div />
      )}

      <div key="Roster" className="flex flex-wrap justify-center max-w-[600px] mt-16 gap-2">
        {roster.map((card: RoleCard, index: number) => {
          return getRoleCard(card, index)
        })}
      </div>
    </main>
  )
}

export default Usurper
