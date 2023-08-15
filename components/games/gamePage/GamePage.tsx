'use client';

import GameContent from '@/components/games/gamePage/GameContent';
import { title } from '@/components/primitives';
import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/_common/db';
import useGamePageStore from '@/components/games/gamePage/store';
import useClientStore from '@/components/client/store';
import GameParticipantsList from '@/components/games/gamePage/GameParticipantsList';
import GameActionsList from '@/components/games/gamePage/GameActionsList';

interface GamePageProps {
    userId: string;
    gameId: string;
}

const GamePage = ({ userId, gameId }: GamePageProps) => {
    const supabase = createClientComponentClient<Database>();

    const { init, isInit } = useClientStore();

    const { loading, error, game, fetchGame } = useGamePageStore();

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
        <div className="flex flex-col w-full gap-4">
            <div className="flex flex-row items-center gap-2">
                <p
                    className={title({
                        color: 'success',
                        size: 'md',
                    })}
                >
                    {game.name}
                </p>
                <p
                    className={title({
                        color: 'default',
                        size: 'xs',
                    })}
                >
                    ({game.type})
                </p>
            </div>

            <div className="w-full flex flex-col justify-between gap-4">
                <GameContent />
                <div className="w-full flex flex-row justify-between gap-4">
                    <GameActionsList />
                    <GameParticipantsList />
                </div>
            </div>
        </div>
    );
};

export default GamePage;
