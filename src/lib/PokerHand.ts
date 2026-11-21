import Card from './Card';

class PokerHand {
    public currentCards: Card[] = [];

    constructor(currentCards: Card[]) {
        this.currentCards = currentCards;
    }
    getOutCome(): string {
        let combination: string = '';
        //let pairsCounter ;
        //let suitCounter = 0;

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

        if (pairsCounter === 1) { combination += 'one pair ' }
        else if (pairsCounter === 2) { combination += 'two pair ' }

        console.log(combination);
        return combination;
    }
}
export default PokerHand;