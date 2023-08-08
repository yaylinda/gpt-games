import ListItem from '@/components/_common/ListItem';
import useGameStore from '@/components/games/store';
import { stringToColor } from '@/utils';
import React from 'react';
import { PiGameController } from 'react-icons/pi';

interface GameListItemProps {
    gameId: string;
}

const GameListItem = ({ gameId }: GameListItemProps) => {
    const game = useGameStore((state) => state.games[gameId]);

    return <ListItem icon={PiGameController} iconColor={stringToColor(gameId)} title={game.name} />;
};

export default GameListItem;
