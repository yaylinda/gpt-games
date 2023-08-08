'use client';

import ModalWrapper from '@/components/_common/ModalWrapper';
import { DialogType } from '@/types';
import React from 'react';

const NewGameModal = () => {
    const submit = () => {
        // TODO
    };

    return (
        <ModalWrapper type={DialogType.NEW_GAME} headerText="New Game" color="success">
            game
        </ModalWrapper>
    );
};

export default NewGameModal;
