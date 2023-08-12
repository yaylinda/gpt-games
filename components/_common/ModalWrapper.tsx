'use client';

import useClientStore from '@/components/client/store';
import { ResponseWithStatusAndMessage } from '@/components/friends/types';
import { title } from '@/components/primitives';
import { DialogType } from '@/_common/types';
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
    response?: ResponseWithStatusAndMessage;
    afterClose?: () => void;
    autoCloseDisabled?: boolean;
}

const ModalWrapper = ({
    type,
    headerText,
    color,
    onSubmit,
    submitDisabled = false,
    children,
    response,
    afterClose,
    autoCloseDisabled = false,
}: ModalWrapperProps) => {
    const { activeDialog, closeDialog } = useClientStore();

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
            if (success && !autoCloseDisabled) {
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
                            {response && (
                                <Code
                                    className="flex flex-row justify-center mt-4 mb-2 overflow-x-auto whitespace-pre-wrap break-words"
                                    color={response.success ? 'success' : 'danger'}
                                >
                                    {response.message}
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
