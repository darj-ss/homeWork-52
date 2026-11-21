interface Props {
    rank: string;
    suit: string;
}

const Card = ({rank, suit}:Props) => {
    const cardClass = `card rank-${rank.toLocaleLowerCase()} ${suit.toLocaleLowerCase()}`;
    let suitSymbol = '';
    if (suit === 'diams') {
        suitSymbol = '♦';
    } else if (suit === 'hearts') {
        suitSymbol = '♥';
    } else if (suit === 'clubs') {
        suitSymbol = '♣';
    } else if (suit === 'spades') {
        suitSymbol = '♠';
    }

    return(
        <span className={cardClass}>
            <span className="rank">{rank}</span>
            <span className="suit">{suitSymbol}</span>
        </span>
    );
};

export default Card;