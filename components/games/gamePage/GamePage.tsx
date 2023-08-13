'use client';

import useGameStore from '@/components/games/store';
import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/_common/db';
import { Tables } from '@/_common/types';
import useGamePageStore from '@/components/games/gamePage/store';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;
import useClientStore from '@/components/client/store';

interface GamePageProps {
    userId: string;
    gameId: string;
}

const GamePage = ({ userId, gameId }: GamePageProps) => {
    const supabase = createClientComponentClient<Database>();

    const { init, isInit } = useClientStore();

    const { loading, error, game, actions, participants, fetchGame } = useGamePageStore();

    React.useEffect(() => {
        init(userId, supabase);
        fetchGame(gameId);
    }, [fetchGame, gameId, init, supabase, userId]);

    if (loading || !isInit) {
        return 'loading...';
    }

    if (!game || error) {
        return 'ERROR';
    }

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
