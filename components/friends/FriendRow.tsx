'use client';

import useFriendStore from '@/components/friends/store';
import { FriendListType } from '@/components/friends/types';
import { Person } from '@/components/users/types';
import { formatMoment } from '@/utils';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/react';
import moment from 'moment';
import React from 'react';
import { PiCheckCircle, PiUserCircleDuotone, PiXCircle } from 'react-icons/pi';

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
    [FriendListType.RECEIVED]: 'From:',
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
    const { respondToFriendRequest } = useFriendStore();

    const action = React.useMemo(() => {
        if (rowType !== FriendListType.RECEIVED && rowType !== FriendListType.USER_DENIED) {
            return null;
        }

        return (
            <div className="flex flex-row items-center gap-4">
                <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => respondToFriendRequest(personId, false)}
                >
                    <PiXCircle className="text-3xl" />
                </Button>
                <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => respondToFriendRequest(personId, true)}
                >
                    <PiCheckCircle className="text-3xl" />
                </Button>
            </div>
        );
    }, [personId, rowType]);

    return (
        <Card isHoverable>
            <CardBody className="flex flex-row items-center">
                <div className="flex flex-row items-center gap-4">
                    <Avatar isBordered size="sm" icon={<PiUserCircleDuotone />} />
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center">
                            <p className="text-sm font-semibold">{namePrefix[rowType]}</p>
                            <p className="text-sm font-semibold">{person.username}</p>
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
