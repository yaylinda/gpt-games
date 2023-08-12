'use client';

import useGameStore from '@/components/games/store';

const GamePageComponent = ({ gameId }: { gameId: string }) => {
    const game = useGameStore((state) => state.games[gameId]);

    return (
        <div>
            {gameId}
            {JSON.stringify(game)}
        </div>
    );
};

export default GamePageComponent;
