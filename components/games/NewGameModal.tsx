'use client';

import useStore from '@/app/store';
import { DialogType } from '@/types';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';

const NewGameModal = () => {
    const supabase = createClientComponentClient();
    const { activeDialog, closeDialog } = useStore();

    const [loading, setLoading] = React.useState(false);

    const submit = () => {
        setLoading(true);
        // TODO
        setLoading(false);
    };

    return (
        <Modal isOpen={activeDialog === DialogType.NEW_GAME} onOpenChange={closeDialog}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex">New Game</ModalHeader>

                        <ModalBody></ModalBody>

                        <ModalFooter className="flex justify-between">
                            <Button color="danger" variant="light" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={submit} isLoading={loading}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default NewGameModal;
