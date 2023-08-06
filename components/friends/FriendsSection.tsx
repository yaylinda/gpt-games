'use client';

import { Card, CardBody } from '@nextui-org/card';
import { Tab, Tabs } from '@nextui-org/tabs';
import React from 'react';

const FriendsSection = () => {
    const [selected, setSelected] = React.useState<string>('friends');

    return (
        <div>
            <Tabs
                fullWidth
                radius="full"
                variant="bordered"
                color="danger"
                selectedKey={selected}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onSelectionChange={setSelected}
            >
                <Tab key="friends" title="Friends">
                    <Card>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="received" title="Received">
                    <Card>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="sent" title="Sent">
                    <Card>
                        <CardBody>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};

export default FriendsSection;
