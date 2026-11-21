import './App.css'
import CardDeck from "./lib/CardDeck.ts";
import Card from "./lib/Card.ts";
import CardEl from './Card/Card.tsx';
import {useState} from "react";

function App() {
    const [cards, setCards] = useState<Card[]>([]);
    const cardDeck = new CardDeck();
    const dealCards = () => {
        setCards(cardDeck.getCards(5));
    };

  return (
    <>
      <button type="button" id="deal-cards" onClick={dealCards}>Раздать карты</button>
        {(cards.length !== 0 &&
            <div className = "playingCards faceImages">
                {cards.map((card) => (
                    <CardEl suit={card.suit} rank={card.rank} key={`${card.suit}-${card.rank}`}/>
                ))}
            </div>
            )}
    </>
  )
}

export default App
