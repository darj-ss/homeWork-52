import Card from './Card';
import CardDeck from "./CardDeck.ts";

class PokerHand {
    public currentCards: Card[] = [];
    private royalCards: string[] = ['10', 'J', 'Q', 'K', 'A'];
    private cardDeck: CardDeck;

    constructor(currentCards: Card[], cardDeck: CardDeck) {
        this.currentCards = currentCards;
        this.cardDeck = cardDeck;
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

        const ranks: number[] = Object.values(rankCounters);
        const pairsCounter: number = ranks.filter(c => c === 2).length;

        const sortedRanks: number[] = this.currentCards
            .map((card): number => this.cardDeck.getRankIndex(card.rank))
            .sort((a, b) => a - b);

        let isStraight: boolean = sortedRanks.every((rank, index) => {
            return index === 0 || rank === sortedRanks[index - 1] + 1;
        });

        if (sortedRanks.join(', ') === '0, 1, 2, 3, 12') {
            isStraight = true;
        }

        const isFlash: boolean = this.currentCards.every((c) => c.suit === this.currentCards[0].suit);

        if (isFlash && this.royalCards.every((r) => {
            return this.currentCards.some((card) => card.rank === r);
        })) { combination += 'royal flush ' }

        else if (isStraight && isFlash) { combination += 'straight flush '}

        else if (ranks.includes(4)) { combination += 'four of a kind ' }

        else if (ranks.includes(3) && ranks.includes(2)) {
            combination += 'full house ';
        }

        else if (isFlash) { combination += 'flush ' }

        else if (isStraight) { combination += 'straight ' }

        else if (ranks.includes(3)) { combination += 'three of a kind ' }

        else if (pairsCounter === 2) { combination += 'two pair ' }

        else if (pairsCounter === 1) { combination += 'one pair ' }

        else { combination = 'high card ' }

        return combination;
    }
}
export default PokerHand;