'use client';

import FriendRequestProfile from '@/components/friends/FriendRequestProfile';
import useFriendStore from '@/components/friends/store';
import ModalWrapper from '@/components/modal/ModalWrapper';
import useProfileStore from '@/components/users/store';
import { Profile } from '@/components/users/types';
import { siteConfig } from '@/config/site';
import { DialogType } from '@/types';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/react';
import React from 'react';
import { PiMagnifyingGlassDuotone } from 'react-icons/pi';

const NewFriendModal = () => {
    const { sendFriendRequest, requesting } = useFriendStore();

    const [searchInput, setSearchInput] = React.useState<string>('');
    const [searchError, setSearchError] = React.useState<string>('');

    const validationState = React.useMemo(() => {
        if (searchInput === '') return undefined;
        return siteConfig.regex.usernameWithDiscriminator.test(searchInput) ? 'valid' : 'invalid';
    }, [searchInput]);

    const afterClose = () => {
        setSearchInput('');
        setSearchError('');
    };

    const onValueChange = (value: string | undefined) => {
        setSearchInput(value || '');
        setSearchError('');
    };

    const onSubmit = async () => {
        const { success, message } = await sendFriendRequest(searchInput);

        if (!success && message) {
            setSearchError(message);
        }

        return success;
    };

    return (
        <ModalWrapper
            type={DialogType.NEW_FRIEND}
            headerText="Send Friend Request"
            color="danger"
            errorMessage={searchError}
            onSubmit={onSubmit}
            submitDisabled={requesting || validationState !== 'valid'}
            afterClose={afterClose}
        >
            <Input
                isRequired
                isDisabled={requesting}
                isClearable
                placeholder="username#1234"
                type="text"
                startContent={
                    <PiMagnifyingGlassDuotone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={searchInput}
                onValueChange={onValueChange}
                validationState={validationState}
            />
        </ModalWrapper>
    );
};

export default NewFriendModal;
