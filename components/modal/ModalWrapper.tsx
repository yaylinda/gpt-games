'use client';

import useStore from '@/app/store';
import { title } from '@/components/primitives';
import { DialogType } from '@/types';
import { Button } from '@nextui-org/button';
import { Code } from '@nextui-org/code';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React from 'react';

interface ModalWrapperProps {
    type: DialogType;
    headerText: string;
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
    onSubmit?: () => Promise<boolean>;
    submitDisabled?: boolean;
    children: React.ReactNode;
    errorMessage: string;
    afterClose?: () => void;
}

const ModalWrapper = ({
    type,
    headerText,
    color,
    onSubmit,
    submitDisabled = false,
    children,
    errorMessage,
    afterClose,
}: ModalWrapperProps) => {
    const { activeDialog, closeDialog } = useStore();

    const [loading, setLoading] = React.useState(false);

    const close = () => {
        closeDialog();
        afterClose?.();
    };

    const submit = async () => {
        if (!onSubmit) {
            return;
        }

        try {
            setLoading(true);
            const success = await onSubmit();
            if (success) {
                close();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={activeDialog === type} onOpenChange={close}>
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

                        <ModalBody>
                            {children}
                            {errorMessage && (
                                <Code
                                    className="flex flex-row justify-center mt-4 mb-2"
                                    color="danger"
                                >
                                    {errorMessage}
                                </Code>
                            )}
                        </ModalBody>

                        <ModalFooter className="flex justify-between">
                            <Button variant="light" onClick={onClose}>
                                Cancel
                            </Button>
                            {onSubmit && (
                                <Button
                                    color={color}
                                    onPress={submit}
                                    isLoading={loading}
                                    isDisabled={submitDisabled}
                                >
                                    Submit
                                </Button>
                            )}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalWrapper;
