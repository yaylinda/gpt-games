'use client';

import FriendsList from '@/components/friends/FriendsList';
import useFriendStore from '@/components/friends/store';
import { FriendListType } from '@/components/friends/types';
import { Divider } from '@nextui-org/divider';
import { Tab, Tabs } from '@nextui-org/tabs';
import React from 'react';

const FriendsSection = () => {
    const { fetchFriends } = useFriendStore();

    const [selected, setSelected] = React.useState<React.Key>('friends');

    React.useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    return (
        <div className="w-full">
            <Tabs
                fullWidth
                radius="full"
                variant="bordered"
                color="danger"
                selectedKey={selected}
                onSelectionChange={setSelected}
            >
                <Tab key="friends" title="Friends">
                    <FriendsList listType={FriendListType.FRIENDS} />
                </Tab>
                <Tab key="received" title="Received" className="gap-4">
                    <FriendsList listType={FriendListType.RECEIVED} />
                    <Divider />
                    <FriendsList listType={FriendListType.USER_DENIED} />
                </Tab>
                <Tab key="sent" title="Sent" className="gap-4">
                    <FriendsList listType={FriendListType.SENT} />
                    <Divider />
                    <FriendsList listType={FriendListType.OTHER_DENIED} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default FriendsSection;
