type Card = {
  front: {
    name: string
    oracleId: string
    oracleText: string
    imgUrl: string
  }
  back: {
    name: string
    oracleId: string
    oracleText: string
    imgUrl: string
  } | null
}

const fetchDeck = async (url: string) => {
  const response = await fetch(url)

  const { data: cardArrayJSON } = await response.json()

  const frontCardArray = cardArrayJSON.card_faces ? cardArrayJSON.card_faces[0] : cardArrayJSON
  const backCardData = cardArrayJSON.card_faces ? cardArrayJSON.card_faces[1] : null

  console.log("RAW")
  console.log(cardArrayJSON)
  console.log("PICKED")
  console.log(frontCardArray)

  const deck: Card[] = frontCardArray.map((cardJSON: any) => {
    const card: Card = {front: {
      name: cardJSON.name,
      oracleId: cardJSON.oracle_id,
      oracleText: cardJSON.oracle_text,
      imgUrl: cardJSON.image_uris.normal,
    }, back: null}
    return card
  })

  console.log("! A New deck has been created !")

  return deck
}

export { type Card, fetchDeck }
