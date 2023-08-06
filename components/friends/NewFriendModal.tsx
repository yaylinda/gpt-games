'use client';

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
    const { searchProfiles } = useProfileStore();

    const [searchInput, setSearchInput] = React.useState<string>('');
    const [profileResults, setProfileResults] = React.useState<Profile[]>([]);
    const [searching, setSearching] = React.useState<boolean>(false);
    const [searchError, setSearchError] = React.useState<string>('');

    const validationState = React.useMemo(() => {
        if (searchInput === '') return undefined;
        return siteConfig.regex.username.test(searchInput) ||
            siteConfig.regex.usernameWithDiscriminator.test(searchInput)
            ? 'valid'
            : 'invalid';
    }, [searchInput]);

    const onValueChange = (value: string | undefined) => {
        setSearchInput(value || '');
        setSearchError('');
        setProfileResults([]);
    };

    const searchUsers = async () => {
        console.log(`doing search!!! searchInput=${searchInput}`);

        setSearching(true);
        setSearchError('');
        setProfileResults([]);

        try {
            const profiles = await searchProfiles(searchInput);
            console.log(`search results: profiles=${JSON.stringify(profiles)}`);
            setProfileResults(profiles);
        } catch (e) {
            console.log(`errrorrrr doing search: e=${JSON.stringify(e)}`);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setSearchError(e?.message || 'Oops! Something went wrong. Please try again.');
        } finally {
            setSearching(false);
        }
    };

    return (
        <ModalWrapper
            type={DialogType.NEW_FRIEND}
            headerText="Send Friend Request"
            color="danger"
            errorMessage={searchError}
        >
            <span className="flex flex-row items-center gap-4">
                <Input
                    isRequired
                    isDisabled={searching}
                    isClearable
                    label="Search for a user"
                    placeholder="username or username#1234"
                    type="text"
                    startContent={
                        <PiMagnifyingGlassDuotone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    value={searchInput}
                    onValueChange={onValueChange}
                    validationState={validationState}
                    errorMessage={validationState === 'invalid' && ''}
                />
                <Button
                    isIconOnly
                    isDisabled={searching || validationState !== 'valid'}
                    isLoading={searching}
                    color="danger"
                    variant="ghost"
                    onClick={searchUsers}
                >
                    <PiMagnifyingGlassDuotone className="text-3xl" />
                </Button>
            </span>
            {profileResults.map((p) => p.username)}
        </ModalWrapper>
    );
};

export default NewFriendModal;
