import ListItem from '@/components/_common/ListItem';
import React from 'react';
import { GameParticipant, GameParticipantStatus } from '@/components/games/types';
import { PiCheckFatDuotone, PiHourglassDuotone, PiSealQuestionDuotone } from 'react-icons/pi';
import useProfileStore from '@/components/users/store';

interface GameParticipantItemProps {
    participant: GameParticipant;
}

const GameParticipantItem = ({ participant }: GameParticipantItemProps) => {
    const { getUsername } = useProfileStore();

    const { userId, status } = participant;

    const username = getUsername(userId);

    const iconProps = React.useMemo(() => {
        switch (status) {
            case GameParticipantStatus.INVITED:
                return {
                    icon: PiHourglassDuotone,
                    iconColor: 'orange',
                };
            case GameParticipantStatus.READY:
                return {
                    icon: PiCheckFatDuotone,
                    iconColor: 'green',
                };
            default:
                return {
                    icon: PiSealQuestionDuotone,
                    iconColor: 'black',
                };
        }
    }, [status]);

    return (
        <ListItem
            {...iconProps}
            title={<p className={'text-sm font-bold'}>{username}</p>}
            subtitle={<p className="text-sm font-light text-default-500">{status}</p>}
        />
    );
};

export default GameParticipantItem;
