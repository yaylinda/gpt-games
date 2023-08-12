'use client';

import useGameStore from '@/components/games/store';
import React from 'react';

const GamePage = ({ gameId }: { gameId: string }) => {
    // const game = useGameStore((state) => state.games[gameId]);
    // console.log(`game: ${JSON.stringify(game)}`);

    const [game, setGame] = React.useState(null);
    // const [game, setGame] = React.useState(null);

    return (
        <div>
            <p>
                {game.name} - {game.type}
            </p>
            <div>
                <p>Players:</p>
                {game.participants.map()}
            </div>
            {}
        </div>
    );
};

export default GamePage;
