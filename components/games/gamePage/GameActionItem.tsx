import { formatMoment } from '@/_common/utils';
import ListItem, { ListItemProps } from '@/components/_common/ListItem';
import { GameAction, GameActionType } from '@/components/games/types';
import useProfileStore from '@/components/users/store';
import React from 'react';
import {
    PiFlagCheckeredDuotone,
    PiMagicWandDuotone,
    PiPlayCircleDuotone,
    PiPlayDuotone,
    PiSealQuestionDuotone,
    PiStopCircleDuotone,
    PiUserCirclePlusDuotone,
} from 'react-icons/pi';

interface GameActionItemProps {
    action: GameAction;
}

const getTitle = (text: string) => <p className={'text-sm font-bold'}>{text}</p>;

const getSubtitle = (text: string) => <p className="text-sm font-light text-default-500">{text}</p>;

const GameActionItem = ({ action }: GameActionItemProps) => {
    const { getUsername } = useProfileStore();

    const { action: type, userId, createdAt } = action;

    const username = getUsername(userId);

    const actionTime = formatMoment(createdAt);

    const props: ListItemProps = React.useMemo(() => {
        const subtitle = getSubtitle(actionTime);

        switch (type) {
            case GameActionType.CREATED:
                return {
                    icon: PiMagicWandDuotone,
                    iconColor: 'green',
                    title: getTitle(`${username} created the game`),
                    subtitle,
                };
            case GameActionType.READY:
                return {
                    icon: PiUserCirclePlusDuotone,
                    iconColor: 'green',
                    title: getTitle(`${username} joined the game`),
                    subtitle,
                };
            case GameActionType.STARTED:
                return {
                    icon: PiPlayDuotone,
                    iconColor: 'green',
                    title: getTitle(`${username} started the game`),
                    subtitle,
                };
            case GameActionType.START_TURN:
                return {
                    icon: PiPlayCircleDuotone,
                    iconColor: 'green',
                    title: getTitle(`${username} started their turn`),
                    subtitle,
                };
            case GameActionType.END_TURN:
                return {
                    icon: PiStopCircleDuotone,
                    iconColor: 'orange',
                    title: getTitle(`${username} ended their turn`),
                    subtitle,
                };
            case GameActionType.END_GAME:
                return {
                    icon: PiFlagCheckeredDuotone,
                    iconColor: 'red',
                    title: getTitle(`${username} ended the game`),
                    subtitle,
                };
            default:
                return {
                    icon: PiSealQuestionDuotone,
                    iconColor: 'black',
                    title: getTitle('Unknown'),
                    subtitle: getSubtitle('Unknown'),
                };
        }
    }, [actionTime, type, username]);

    return <ListItem {...props} />;
};

export default GameActionItem;
