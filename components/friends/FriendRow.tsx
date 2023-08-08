'use client';

import useFriendStore from '@/components/friends/store';
import { FriendListType } from '@/components/friends/types';
import { Person } from '@/components/users/types';
import { formatMoment, stringToColor } from '@/utils';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/react';
import moment from 'moment';
import React from 'react';
import { PiCheckCircleBold, PiUserCircleFill, PiXCircleBold } from 'react-icons/pi';

interface FriendRowProps {
    person: Person;
    date: moment.Moment;
    rowType: FriendListType;
    index: number;
    isFirst: boolean;
    isLast: boolean;
}

const namePrefix = {
    [FriendListType.FRIENDS]: '',
    [FriendListType.RECEIVED]: 'From: ',
    [FriendListType.SENT]: 'To: ',
    [FriendListType.USER_DENIED]: 'From: ',
    [FriendListType.OTHER_DENIED]: 'To: ',
};

const datePrefix = {
    [FriendListType.FRIENDS]: 'Friends since ',
    [FriendListType.RECEIVED]: 'To ',
    [FriendListType.SENT]: 'Sent ',
    [FriendListType.USER_DENIED]: 'Rejected ',
    [FriendListType.OTHER_DENIED]: 'Rejected ',
};

function FriendRow({ person, date, rowType }: FriendRowProps) {
    const personId = person.id;
    const color = stringToColor(personId);
    const textColor = `text-[${color}]`;

    console.log(`textColor=${textColor}`);

    const { respondToFriendRequest } = useFriendStore();

    const action = React.useMemo(() => {
        if (rowType !== FriendListType.RECEIVED && rowType !== FriendListType.USER_DENIED) {
            return null;
        }

        return (
            <div className="flex flex-row items-center gap-1">
                <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => respondToFriendRequest(personId, false)}
                >
                    <PiXCircleBold className="text-3xl" />
                </Button>
                <Button
                    isIconOnly
                    color="success"
                    variant="light"
                    onClick={() => respondToFriendRequest(personId, true)}
                >
                    <PiCheckCircleBold className="text-3xl" />
                </Button>
            </div>
        );
    }, [personId, rowType]);

    return (
        <Card isHoverable shadow="none">
            <CardBody className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-4">
                    <Avatar
                        className="bg-white border-white"
                        isBordered
                        size="sm"
                        icon={<PiUserCircleFill color={color} className="text-3xl bg-white" />}
                    />
                    <div className="flex flex-col gap-0.5">
                        <div className="flex flex-row items-center">
                            <p className={'text-sm font-bold'}>{person.username}</p>
                            <p className="text-sm font-semibold text-default-500">
                                #{person.discriminator}
                            </p>
                        </div>
                        <p className="text-sm font-light text-default-500">
                            {datePrefix[rowType]}
                            {formatMoment(date)}
                        </p>
                    </div>
                </div>
                {action}
            </CardBody>
        </Card>
    );
}

export default FriendRow;
