'use client';

import ModalWrapper from '@/components/modal/ModalWrapper';
import { DialogType } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';

const NewChatModal = () => {
    const supabase = createClientComponentClient();

    const submit = () => {
        // TODO
    };

    return (
        <ModalWrapper
            type={DialogType.NEW_CHAT}
            headerText="New Chat"
            color="primary"
            onSubmit={submit}
        >
            chat
        </ModalWrapper>
    );
};

export default NewChatModal;
