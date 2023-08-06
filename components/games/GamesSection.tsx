'use client';

import { Card, CardBody } from '@nextui-org/card';
import { Tab, Tabs } from '@nextui-org/tabs';
import React from 'react';

const GamesSection = () => {
    const [selected, setSelected] = React.useState<string>('active');

    return (
        <Tabs
            fullWidth
            radius="full"
            variant="bordered"
            color="success"
            selectedKey={selected}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSelectionChange={setSelected}
        >
            <Tab key="active" title="Active">
                <Card>
                    <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </CardBody>
                </Card>
            </Tab>
            <Tab key="waiting" title="Waiting">
                <Card>
                    <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </CardBody>
                </Card>
            </Tab>
            <Tab key="completed" title="Completed">
                <Card>
                    <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </CardBody>
                </Card>
            </Tab>
        </Tabs>
    );
};

export default GamesSection;
