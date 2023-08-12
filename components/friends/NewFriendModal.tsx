'use client';

import ModalWrapper from '@/components/_common/ModalWrapper';
import useFriendStore from '@/components/friends/store';
import { ResponseWithStatusAndMessage } from '@/components/friends/types';
import { siteConfig } from '@/_common/constants';
import { DialogType } from '@/_common/types';
import { Input } from '@nextui-org/input';
import React from 'react';
import { PiMagnifyingGlassDuotone } from 'react-icons/pi';

const NewFriendModal = () => {
    const { sendFriendRequest, requesting } = useFriendStore();

    const [input, setInput] = React.useState<string>('');
    const [responseMsg, setResponseMsg] = React.useState<ResponseWithStatusAndMessage | undefined>(
        undefined
    );

    const validationState = React.useMemo(() => {
        if (input === '') return undefined;
        return siteConfig.regex.usernameWithDiscriminator.test(input) ? 'valid' : 'invalid';
    }, [input]);

    const afterClose = () => {
        setInput('');
        setResponseMsg(undefined);
    };

    const onValueChange = (value: string | undefined) => {
        setInput(value || '');
        setResponseMsg(undefined);
    };

    const onSubmit = async () => {
        const response = await sendFriendRequest(input);

        setResponseMsg(response);

        return response.success;
    };

    return (
        <ModalWrapper
            type={DialogType.NEW_FRIEND}
            headerText="Send Friend Request"
            color="danger"
            response={responseMsg}
            onSubmit={onSubmit}
            submitDisabled={requesting || validationState !== 'valid'}
            afterClose={afterClose}
            autoCloseDisabled
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
                value={input}
                onValueChange={onValueChange}
                validationState={validationState}
            />
        </ModalWrapper>
    );
};

export default NewFriendModal;
