"use client"

import React, { useState } from "react"
import { useLocalStorage, shuffleArray } from "../hooks/useLocalStorage"
import { RoleCard } from "../components/RoleCard"

export type Role = (typeof roleSheet)[number]
type Player = { name: string; role: Role | null }

const roleSheet = ["King", "Guard", "Usurper", "Assassin", "Assassin", "Traitor", "Assassin"] as const

const Usurper = () => {
  const [players, setPlayers] = useLocalStorage<Player[]>("players", [])
  const [input, setInput] = useState("")
  const commenced = players.some((player) => player.role !== null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (players.length < 7) {
      setPlayers([...players, { name: input, role: null }])
      setInput("")
    }
  }

  const startGame = () => {
    if (players.length >= 5) {
      const shuffledRoles = shuffleArray(roleSheet.slice(0, players.length))

      setPlayers(
        shuffleArray(players).map((player, index) => ({
          ...player,
          role: shuffledRoles[index],
        }))
      )
    }
  }

  const resetGame = () => {
    setPlayers([])
  }

  return (
    <main className="h-screen flex flex-col items-center">
      {!commenced && (
        <form
          className="scale-[0.6] sm:scale-100 w-full max-w-xs flex flex-col -mt-14 sm:mt-12 rounded-xl py-6 px-4"
          onSubmit={handleSubmit}
        >
          <label className="text-center text-xl mb-5">New Game</label>
          <div className="flex flex-col mb-5">
            <label className="mb-2">Player Name</label>
            <input
              className="rounded-full px-4 py-2 bg-background-light disabled:bg-red-300"
              type="text"
              required
              value={input}
              disabled={players.length > 6}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex justify-evenly">
            <button
              className="rounded-full px-3 py-1 bg-brass text-text-black disabled:bg-red-300"
              type="submit"
              disabled={players.length > 6}
            >
              Add Player
            </button>
            <button
              className="rounded-full px-3 py-1 bg-brass text-text-black disabled:bg-red-300"
              type="button"
              disabled={players.length < 5 || players.length > 7}
              onClick={startGame}
            >
              Start
            </button>
            <button className="rounded-full px-3 py-1 text-text-white border-2" type="button" onClick={resetGame}>
              Reset
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap justify-center max-w-[600px] sm:mt-16 gap-2">
        {players.map((player, index) => (
          <RoleCard key={index} player={player} />
        ))}
      </div>
      {commenced && (
        <button className="rounded-full px-3 py-1 text-text-white border-2 mt-4" type="button" onClick={resetGame}>
          Reset
        </button>
      )}
    </main>
  )
}

export default Usurper
