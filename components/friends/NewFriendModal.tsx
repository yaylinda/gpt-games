'use client';

import ModalWrapper from '@/components/modal/ModalWrapper';
import { DialogType } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';

const NewFriendModal = () => {
    const supabase = createClientComponentClient();

    const submit = () => {
        // TODO
    };

    return (
        <ModalWrapper
            type={DialogType.NEW_FRIEND}
            headerText="New Friend"
            color="danger"
            onSubmit={submit}
        >
            friend
        </ModalWrapper>
    );
};

export default NewFriendModal;
