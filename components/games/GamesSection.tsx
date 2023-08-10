'use client';

import GamesList from '@/components/games/GamesList';
import useGameStore from '@/components/games/store';
import { Card, CardBody } from '@nextui-org/card';
import { Tab, Tabs } from '@nextui-org/tabs';
import React from 'react';

const GamesSection = () => {
    const { fetchGames, active, waiting, completed } = useGameStore();

    const [selected, setSelected] = React.useState<React.Key>('active');

    React.useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    return (
        <div className="w-full">
            <Tabs
                fullWidth
                radius="full"
                variant="bordered"
                color="success"
                selectedKey={selected}
                onSelectionChange={setSelected}
            >
                <Tab key="active" title="Active">
                    <GamesList games={active} />
                </Tab>
                <Tab key="waiting" title="Waiting">
                    <GamesList games={waiting} />
                </Tab>
                <Tab key="completed" title="Completed">
                    <GamesList games={completed} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default GamesSection;
