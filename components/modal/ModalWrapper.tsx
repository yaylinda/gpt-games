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
    children: React.ReactNode;
    errorMessage: string;
}

const ModalWrapper = ({
    type,
    headerText,
    color,
    onSubmit,
    children,
    errorMessage,
}: ModalWrapperProps) => {
    const { activeDialog, closeDialog } = useStore();

    const [loading, setLoading] = React.useState(false);

    const submit = async () => {
        if (!onSubmit) {
            return;
        }

        setLoading(true);
        const success = await onSubmit();
        setLoading(false);

        if (success) {
            closeDialog();
        }
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
                                <Button color={color} onPress={submit} isLoading={loading}>
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
