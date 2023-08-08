import FriendListItem from '@/components/friends/FriendListItem';
import useFriendStore from '@/components/friends/store';
import { Friend, FriendListType, FriendRequest } from '@/components/friends/types';
import { Person } from '@/components/users/types';
import moment from 'moment/moment';
import React from 'react';

interface FriendItem {
    person: Person;
    date: moment.Moment;
}

interface FriendsListProps {
    listType: FriendListType;
}

const FriendsList = ({ listType }: FriendsListProps) => {
    const { [listType]: list } = useFriendStore();
    const numItems = list.length;

    const items: FriendItem[] = React.useMemo(
        () =>
            list.map((f) => {
                switch (listType) {
                    case FriendListType.FRIENDS:
                        return {
                            person: f as Person,
                            date: (f as Friend).acceptedOn,
                        };
                    case FriendListType.SENT:
                        return {
                            person: (f as FriendRequest).requestee,
                            date: (f as FriendRequest).requestedOn,
                        };
                    case FriendListType.RECEIVED:
                        return {
                            person: (f as FriendRequest).requester,
                            date: (f as FriendRequest).requestedOn,
                        };
                    case FriendListType.OTHER_DENIED:
                        return {
                            person: (f as FriendRequest).requestee, // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            date: (f as FriendRequest).respondedOn!,
                        };
                    case FriendListType.USER_DENIED:
                        return {
                            person: (f as FriendRequest).requester, // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            date: (f as FriendRequest).respondedOn!,
                        };
                }
            }), // eslint-disable-next-line react-hooks/exhaustive-deps
        [numItems, listType]
    );

    return (
        <>
            {items.map(({ person, date }: FriendItem) => (
                <FriendListItem key={person.id} person={person} date={date} rowType={listType} />
            ))}
        </>
    );
};

export default FriendsList;
