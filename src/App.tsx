import './App.css'
import CardDeck from "./lib/CardDeck.ts";
import Card from "./lib/Card.ts";
import CardEl from './Card/Card.tsx';
import PokerHand from "./lib/PokerHand.ts";
import {useState} from "react";

function App() {
    const [cards, setCards] = useState<Card[]>([]);
    const [outCome, setOutCome] = useState<string>('');
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [cardDeck, setCardDeck] = useState<CardDeck | null>(null);

    const dealCards = () => {
        const cardDeck = new CardDeck();
        setCardDeck(cardDeck);

        const randomDeck = cardDeck.getCards(5);
        setCards(randomDeck);

        const pokerHand = new PokerHand(randomDeck);
        setOutCome(pokerHand.getOutCome());

        setSelectedCards([]);
    };

    const handleChange = (card:Card, isChecked:boolean) => {
        if(isChecked) {
            setSelectedCards([...selectedCards, card]);
        } else {
            setSelectedCards(selectedCards.filter(c => c !== card));
        }
    };

    const replaceCards = () => {
        if (selectedCards.length === 0) return;
        if (cardDeck) {
            if (cardDeck.cardDeck.length < selectedCards.length) {
                alert('В текущей колоде не хватает карт для замены!');
                return;
            }
            const newCards = cards.map((c: Card) => {
                if (selectedCards.includes(c)) {
                    return cardDeck.getCard();
                } else { return c }
            });
            if (newCards.length !== 0) {
                setCards(newCards);

                const newPokerHand = new PokerHand(newCards);
                setOutCome(newPokerHand.getOutCome());

                setSelectedCards([]);
            }
        }

    };

  return (
    <>
        <div className="main-container">
            <h1>Video-poker</h1>
            <button className="btn" type="button" id="deal-cards" onClick={dealCards}>Deal cards</button>
            {(cards.length !== 0 &&
                <div className = "playingCards faceImages">
                    <div className = "cards-wrap">
                        {cards.map((card) => (
                            <div key={`${card.suit}-${card.rank}`}>
                                <input type="checkbox" onChange={(e) => handleChange(card, e.target.checked)}/>
                                <CardEl suit={card.suit} rank={card.rank} />
                            </div>
                        ))}
                    </div>

                    <p className="poker-hand">{outCome}</p>
                    <button className="btn" type="button" onClick={replaceCards}>Change cards</button>
                </div>
            )}
        </div>

    </>
  )
}

export default App
