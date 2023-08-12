'use client';

import ModalWrapper from '@/components/_common/ModalWrapper';
import { ResponseWithStatusAndMessage } from '@/components/friends/types';
import useGameStore from '@/components/games/store';
import { CreateGameInput, GameType } from '@/components/games/types';
import { siteConfig } from '@/_common/constants';
import { DialogType } from '@/_common/types';
import useFormFields, { FieldRules } from '@/hooks/useFormFields';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { Switch } from '@nextui-org/switch';
import React from 'react';
import { PiTextAaDuotone, PiUserFill, PiUsersFill } from 'react-icons/pi';

const getInitialInput = (): CreateGameInput => ({
    name: '',
    type: null,
    isMultiplayer: false,
    participants: [],
});

const getRules = (): FieldRules<CreateGameInput> => ({
    name: [
        {
            rule: (v) => !!v,
            message: 'Required',
        },
        {
            rule: (v) => siteConfig.regex.username.test(v),
            message: `${siteConfig.regex.username}`,
        },
    ],
    type: [
        {
            rule: (v) => !!v,
            message: 'Required',
        },
    ],
    isMultiplayer: [],
    participants: [],
});

const getGameTypeDescription = (gameType: GameType) => {
    switch (gameType) {
        case GameType.MOVIE:
            return 'Describe movies for the AI to guess';
    }
};

const NewGameModal = () => {
    const { getFields, updateField, validate, errors } = useFormFields<CreateGameInput>(
        getInitialInput(),
        getRules()
    );

    const { creating, createGame } = useGameStore();

    const [responseMsg, setResponseMsg] = React.useState<ResponseWithStatusAndMessage | undefined>(
        undefined
    );

    const afterClose = () => {
        setResponseMsg(undefined);
    };

    const onSubmit = async (): Promise<boolean> => {
        console.log(`onSubmit, fields=${JSON.stringify(getFields())}`);

        const isValid = validate();

        if (!isValid) {
            return false;
        }

        const response = await createGame(getFields());

        if (response.success && response.id) {
            setResponseMsg({
                success: response.success,
                message: (
                    <p>
                        {response.message}{' '}
                        <Link
                            className="text-sm"
                            href={`/games/${response.id}`}
                            underline="always"
                            color="success"
                        >
                            Start playing!
                        </Link>
                    </p>
                ),
            });
        } else {
            setResponseMsg(response);
        }

        return response.success;
    };

    return (
        <ModalWrapper
            type={DialogType.NEW_GAME}
            headerText="Start New Game"
            color="success"
            response={responseMsg}
            onSubmit={responseMsg?.success ? undefined : () => onSubmit()}
            submitDisabled={creating}
            afterClose={afterClose}
            autoCloseDisabled
        >
            <Input
                isRequired
                isDisabled={creating || responseMsg?.success}
                isClearable
                placeholder="Game Name"
                type="text"
                startContent={
                    <PiTextAaDuotone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                onValueChange={(value) => updateField('name', value || '')}
                validationState={errors['name'] ? 'invalid' : 'valid'}
                errorMessage={errors['name']}
            />

            <RadioGroup
                label="What game do you want to play?"
                color="success"
                onValueChange={(value) => updateField('type', value as GameType)}
                validationState={errors['type'] ? 'invalid' : 'valid'}
                errorMessage={errors['type']}
                isDisabled={creating || responseMsg?.success}
            >
                <Radio value={GameType.MOVIE} description={getGameTypeDescription(GameType.MOVIE)}>
                    {GameType.MOVIE}
                </Radio>
            </RadioGroup>

            <Switch
                color="success"
                thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                        <PiUsersFill className={className} />
                    ) : (
                        <PiUserFill className={className} />
                    )
                }
                onValueChange={(value) => updateField('isMultiplayer', value)}
                isDisabled={creating || responseMsg?.success}
            >
                Multiplayer?
            </Switch>
        </ModalWrapper>
    );
};

export default NewGameModal;
