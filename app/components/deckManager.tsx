//planechase: "https://api.scryfall.com/cards/search?q=set%3Aohop&unique=cards"
//pc-cardback: "https://backs.scryfall.io/large/7/8/7840c131-f96b-4700-9347-2215c43156e6.jpg?1665006192"

interface Card {
  name: string
  oracleId: string
  oracleText: string
  imgUrl: string
}

const fetchDeck = async (url: string) => {
  const response = await fetch(url)

  const { data: objectList } = await response.json()

  const deck = objectList.map((object: any) => {
    const card: Card = {
      name: object.name,
      oracleId: object.oracle_id,
      oracleText: object.oracle_text,
      imgUrl: object.image_uris.normal,
    }
    return card
  })

  return deck
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const coverDeck = (deck: Card[], url: string) => {
  deck.unshift({
    name: "TOPDECK",
    oracleId: "",
    oracleText: "",
    imgUrl: url,
  })
}

export { type Card, fetchDeck, coverDeck, shuffleArray }
