'use client';

import ListItem from '@/components/_common/ListItem';
import useFriendStore from '@/components/friends/store';
import { FriendListType } from '@/components/friends/types';
import { Person } from '@/components/users/types';
import { formatMoment, stringToColor } from '@/_common/utils';
import { Button } from '@nextui-org/react';
import moment from 'moment';
import React from 'react';
import { PiCheckCircleBold, PiUserCircleFill, PiXCircleBold } from 'react-icons/pi';

const datePrefix = {
    [FriendListType.FRIENDS]: 'Friends since ',
    [FriendListType.RECEIVED]: 'To ',
    [FriendListType.SENT]: 'Sent ',
    [FriendListType.USER_DENIED]: 'Rejected ',
    [FriendListType.OTHER_DENIED]: 'Rejected ',
};

interface FriendListItem {
    person: Person;
    date: moment.Moment;
    rowType: FriendListType;
}

function FriendListItem({ person, date, rowType }: FriendListItem) {
    const personId = person.id;
    const color = stringToColor(personId);

    const { respondToFriendRequest } = useFriendStore();

    const action = React.useMemo(() => {
        if (rowType !== FriendListType.RECEIVED && rowType !== FriendListType.USER_DENIED) {
            return null;
        }

        return (
            <>
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
            </>
        );
    }, [personId, respondToFriendRequest, rowType]);

    return (
        <ListItem
            icon={PiUserCircleFill}
            iconColor={color}
            title={
                <>
                    <p className={'text-sm font-bold'}>{person.username}</p>
                    <p className="text-sm font-semibold text-default-500">
                        #{person.discriminator}
                    </p>
                </>
            }
            subtitle={
                <p className="text-sm font-light text-default-500">
                    {datePrefix[rowType]}
                    {formatMoment(date)}
                </p>
            }
            actions={action}
        />
    );
}

export default FriendListItem;
