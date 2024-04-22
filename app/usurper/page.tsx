"use client"

import React, { useEffect, useState } from "react"
import useLocalStorage from "../useLocalStorage"
import { shuffleArray } from "../deckManager"
import { RoleCard, FlipRoleCard } from "../components/RoleCard"

type Role = { title: string; name: string }

const Usurper = () => {
  const roleSheet = ["King", "Guard", "Usurper", "Assassin", "Assassin", "Traitor", "Assassin"]

  const initRoster: Role[] = []
  const initPlayers: string[] = []

  const [commenced, setCommenced] = useLocalStorage("commenced", false)
  const [roster, setRoster] = useLocalStorage("roster", initRoster)
  const [input, setInput] = useState("")
  const [players, setPlayers] = useState(initPlayers)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (players.length < 7) {
      setPlayers([...players, input])
      setInput("")
    }
  }

  const startGame = () => {
    if (players.length >= 5) {
      setCommenced(true)
      const temp: string[] = players
      shuffleArray(temp)
      setPlayers(temp)
      const newRoster: Role[] = players.map((name: string, index: number) => ({ title: roleSheet[index], name }))
      shuffleArray(newRoster)
      setRoster(newRoster)
    }
  }

  const resetRoster = () => {
    setCommenced(false)
    setPlayers(initPlayers)
    setRoster(initRoster)
  }

  return (
    <main className="h-screen flex flex-col items-center">
      {!commenced && (
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
      )}

      {!commenced ? (
        <div key="Mockup" className="flex flex-wrap justify-center max-w-[600px] mt-16 gap-2">
          {players.map((name: string, index: number) => (
            <div key={index} className="relative w-40 h-56 justify-center items-center bg-brass rounded-xl">
              <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl ">{name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div key="Roster" className="flex flex-wrap justify-center max-w-[600px] mt-16 gap-2">
            {roster.map((role: Role, index: number) => (
              <FlipRoleCard key={index} role={role} />
            ))}
          </div>
          <button className="rounded-full px-3 py-1 text-text-white border-2" type="button" onClick={resetRoster}>
            Reset
          </button>
        </div>
      )}
    </main>
  )
}

export default Usurper
