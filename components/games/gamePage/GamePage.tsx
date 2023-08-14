'use client';

import GameContent from '@/components/games/gamePage/GameContent';
import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/_common/db';
import useGamePageStore from '@/components/games/gamePage/store';
import useClientStore from '@/components/client/store';
import GameParticipantsList from '@/components/games/gamePage/GameParticipantsList';
import GameActionsList from '@/components/games/gamePage/GameActionsList';
import { Button } from '@nextui-org/react';

interface GamePageProps {
    userId: string;
    gameId: string;
}

const GamePage = ({ userId, gameId }: GamePageProps) => {
    const supabase = createClientComponentClient<Database>();

    const { init, isInit } = useClientStore();

    const { loading, error, game, actions, participants, fetchGame } = useGamePageStore();

    const isCreator = userId === game?.createdBy;

    React.useEffect(() => {
        init(userId, supabase);
        fetchGame(gameId);
    }, [fetchGame, gameId, init, supabase, userId]);

    if (loading || !isInit) {
        return <p>loading...</p>;
    }

    if (!game || error) {
        return <p>ERROR</p>;
    }

    return (
        <div className="w-full">
            <p>
                {game.name} - {game.type}
            </p>
            <div className="w-full flex flex-row">
                <GameActionsList />
                <GameContent />
                <GameParticipantsList />
            </div>

            {isCreator && <Button color="success">Start!</Button>}
        </div>
    );
};

export default GamePage;
