'use client';

import useStore from '@/app/store';
import { title } from '@/components/primitives';
import { DialogType } from '@/types';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React from 'react';

interface ModalWrapperProps {
    type: DialogType;
    headerText: string;
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
    onSubmit: () => void;
    children: React.ReactNode;
}

const ModalWrapper = ({ type, headerText, color, onSubmit, children }: ModalWrapperProps) => {
    const { activeDialog, closeDialog } = useStore();

    const [loading, setLoading] = React.useState(false);

    const submit = () => {
        setLoading(true);
        // TODO
        onSubmit();
        setLoading(false);
    };

    return (
        <Modal isOpen={activeDialog === type} onOpenChange={closeDialog}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader
                            className={title({
                                color,
                                size: 'xs',
                            })}
                        >
                            {headerText}
                        </ModalHeader>

                        <ModalBody>{children}</ModalBody>

                        <ModalFooter className="flex justify-between">
                            <Button variant="light" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button color={color} onPress={submit} isLoading={loading}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalWrapper;
