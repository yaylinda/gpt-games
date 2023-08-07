'use client';

import useProfileStore from '@/components/users/store';
import { Profile, UserMetadata } from '@/components/users/types';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { User } from '@nextui-org/user';
import React from 'react';
import { PiUserCircleDuotone } from 'react-icons/pi';

interface FriendRequestProfileProps {
    profile: Profile;
}

const FriendRequestProfile = ({ profile }: FriendRequestProfileProps) => {
    return (
        <Card isHoverable>
            <CardBody className="flex flex-row items-center">
                <div className="flex flex-row items-center gap-4">
                    <Avatar isBordered size="sm" icon={<PiUserCircleDuotone />} />
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center">
                            <p className="text-sm font-semibold">{profile.username}</p>
                            <p className="text-sm font-semibold text-default-500">
                                #{profile.discriminator}
                            </p>
                        </div>
                        <p className="text-sm font-light text-default-500">blah blah blah</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default FriendRequestProfile;
