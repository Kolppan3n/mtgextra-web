type Card = {
    name: string
    oracleId: string
    oracleText: string
    imgUrl: string
}

const fetchDeck = async (url: string) => {
  const response = await fetch(url, {next: {revalidate: 60}})

  const { data: cardArrayJSON } = await response.json()

  const deck: Card[] = cardArrayJSON.map((card: any) => (
    {
      name: card.card_faces ? card.card_faces[0].name : card.name,
      oracleId: card.oracle_id,
      oracleText: card.card_faces ? card.card_faces[0].oracle_text : card.oracle_text,
      imgUrl: card.card_faces ? card.card_faces[0].image_uris.large : card.image_uris.large
    }
  ))

  console.log("! A New deck has been created !")

  return deck
}

export { type Card, fetchDeck }
