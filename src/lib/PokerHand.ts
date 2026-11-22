import Card from './Card';

class PokerHand {
    public currentCards: Card[] = [];

    constructor(currentCards: Card[]) {
        this.currentCards = currentCards;
    }
    getOutCome(): string {
        let combination: string = '';

        const rankCounters: Record<string, number> = {};

        for ( const card of this.currentCards ) {
            if ( rankCounters[card.rank] === undefined ) {
                rankCounters[card.rank] = 1;
            } else {
                rankCounters[card.rank]++;
            }
        }

        const ranks = Object.values(rankCounters);
        const pairsCounter = ranks.filter(c => c === 2).length;

        if (ranks.includes(3)) {
            combination += 'three of a kind ';
        }
        else if (pairsCounter === 1) { combination += 'one pair ' }
        else if (pairsCounter === 2) { combination += 'two pair ' }
        else if (this.currentCards.every((c) => {
            return this.currentCards[0].suit === c.suit;
        })) {
            combination += 'flush ';
        } else {
            combination = 'high card ';
        }
        return combination;
    }
}
export default PokerHand;