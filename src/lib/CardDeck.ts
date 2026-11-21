import Card from "./Card";

class CardDeck {
    public cardDeck: Card[] = [];
    private suites: string[] = ['spades', 'diams', 'hearts', 'clubs'];
    private ranks: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    constructor() {
        for (let i = 0; i < this.suites.length; i++) {
            for (let j = 0; j < this.ranks.length; j++) {
                const card = new Card(this.ranks[j], this.suites[i]);
                this.cardDeck.push(card);
            }
        }
    }
    getCard():Card {
        const randomIndex = Math.floor(Math.random() * this.cardDeck.length);
        const cardToDelete:Card[] = this.cardDeck.splice(randomIndex, 1);

        return cardToDelete[0];
    }
    getCards(howMany: number):Card[] {
        const cardsArr: Card[] = [];
        for (let i = 0; i < howMany; i++) {
            cardsArr.push(this.getCard());
        }
        return cardsArr;
    }
}
export default CardDeck;