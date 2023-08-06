'use client';

import ModalWrapper from '@/components/modal/ModalWrapper';
import { DialogType } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';

const NewGameModal = () => {
    const supabase = createClientComponentClient();

    const submit = () => {
        // TODO
    };

    return (
        <ModalWrapper
            type={DialogType.NEW_GAME}
            headerText="New Game"
            color="success"
            onSubmit={submit}
        >
            game
        </ModalWrapper>
    );
};

export default NewGameModal;
