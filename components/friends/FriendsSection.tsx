'use client';

import FriendsList from '@/components/friends/FriendsList';
import useFriendStore from '@/components/friends/store';
import { FriendListType } from '@/components/friends/types';
import { Card, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Tab, Tabs } from '@nextui-org/tabs';
import React from 'react';

const FriendsSection = () => {
    const { initInfo, fetchFriends } = useFriendStore();

    const [selected, setSelected] = React.useState<React.Key>('friends');

    React.useEffect(() => {
        if (initInfo) {
            fetchFriends();
        }
    }, [fetchFriends, initInfo]);

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
                    <Card>
                        <CardBody className="gap-4">
                            <FriendsList listType={FriendListType.FRIENDS} />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="received" title="Received">
                    <Card>
                        <CardBody className="gap-4">
                            <FriendsList listType={FriendListType.RECEIVED} />
                            <Divider />
                            <FriendsList listType={FriendListType.USER_DENIED} />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="sent" title="Sent">
                    <Card>
                        <CardBody className="gap-4">
                            <FriendsList listType={FriendListType.SENT} />
                            <Divider />
                            <FriendsList listType={FriendListType.OTHER_DENIED} />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};

export default FriendsSection;
