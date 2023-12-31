import GameListItem from '@/components/games/GameListItem';
import React from 'react';

interface GamesListProps {
    games: string[];
}

const GamesList = ({ games }: GamesListProps) => {
    return (
        <>
            {games.map((gameId) => (
                <GameListItem key={gameId} gameId={gameId} />
            ))}
        </>
    );
};

export default React.memo(GamesList, (next, prev) => next.games.length === prev.games.length);
