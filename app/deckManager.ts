type Card = {
  name: string;
  oracleId: string;
  oracleText: string;
  imgUrl: string;
};

const fetchDeck = async (url: string) => {
  const response = await fetch(url);

  const { data: objectList } = await response.json();

  const deck = objectList.map((object: any) => {
    const card: Card = {
      name: object.name,
      oracleId: object.oracle_id,
      oracleText: object.oracle_text,
      imgUrl: object.image_uris.normal,
    };
    return card;
  });

  console.log("! A New deck has been created !");

  return deck;
};

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  console.log("! The Array has been shuffled !");
  return array;
};

export { type Card, fetchDeck, shuffleArray };
