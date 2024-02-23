import React from "react"

const getSymbols = async () => {
  //const response = await fetch('https://api.scryfall.com/symbology')
  const response = await fetch("https://api.scryfall.com/cards/search?q=legal%3Aedh&unique=cards&as=grid&order=name")

  const { data: symbolData } = await response.json()

  const filtered = symbolData.map((ob: any) => {
    const mc: string = JSON.stringify(ob.mana_cost)
    let fart = 0
    try {
      if (mc.includes("W")) fart++
      if (mc.includes("U")) fart++
      if (mc.includes("B")) fart++
      if (mc.includes("R")) fart++
      if (mc.includes("G")) fart++
    } catch (error) {
      console.log(error)
    }

    if (fart >= 3) return ob
  })

  filtered.map((ob: any) => {
    console.log(ob)
  })

  return symbolData
}

const Archenemy = async () => {
  const symbolData = await getSymbols()
  return (
    <>
      <div className="grid grid-cols-12">
        {symbolData.map((object: any) => {
          //return <img key={object.name} src={""} className="size-20" />
          return <p key={object.name}>{object.name}</p>
        })}
      </div>
    </>
  )
}

export default Archenemy
