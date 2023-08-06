'use client';

import useStore from '@/app/store';
import {Button} from '@nextui-org/button';
import {Input} from '@nextui-org/input';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@nextui-org/modal';
import {EyeFilledIcon, EyeSlashFilledIcon} from '@nextui-org/shared-icons';
import React from 'react';

interface PasswordVisibilityToggleProps {
    isVisible: boolean;
    toggleVisibility: () => void;
}

const PasswordVisibilityToggle = ({
    isVisible,
    toggleVisibility
}: PasswordVisibilityToggleProps) => {
    return (
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
            ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
            )}
        </button>
    );
};

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const USERNAME_REGEX = /^[a-zA-Z0-9._-]{4,50}$/;

export const MIN_PASSWORD_LENGTH = 4;

const AuthModal = () => {

    const {
        isAuthDialogOpen: isOpen,
        closeAuthDialog: onOpenChange
    } = useStore();

    const [isLogin, setIsLogin] = React.useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

    const [genericErrorMessage, setGenericErrorMessage] = React.useState('');

    const title = isLogin ? 'Log In' : 'Sign Up';
    const switchFormText = isLogin ? 'Don\'t have an account yet? Sign Up!' :
        'Already have an account? Log In!';

    const togglePasswordVisibility = () => setIsPasswordVisible((state) => !state);

    const emailValidationState = React.useMemo(() => {
        if (email === '') return undefined;
        return EMAIL_REGEX.test(email) ? 'valid' : 'invalid';
    }, [email]);

    const usernameValidationState = React.useMemo(() => {
        if (username === '') return undefined;
        return USERNAME_REGEX.test(username) ? 'valid' : 'invalid';
    }, [username]);

    const passwordValidationState = React.useMemo(() => {
        if (password === '') return undefined;
        return password.length >= MIN_PASSWORD_LENGTH ? 'valid' : 'invalid';
    }, [password]);

    const passwordConfirmationValidationState = React.useMemo(() => {
        if (password === '' || passwordConfirmation === '') return undefined;
        return password === passwordConfirmation ? 'valid' : 'invalid';
    }, [password, passwordConfirmation]);

    const submit = () => {
        if (![emailValidationState, usernameValidationState, passwordValidationState,
            passwordConfirmationValidationState].every((v) => v === 'valid')) {
            setGenericErrorMessage('Oops! Please fix!');
            return;
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>

                        <ModalBody>
                            <Input
                                isRequired
                                label="Email"
                                description={!isLogin && 'Your email will never be shared with third-parties.'}
                                type="email"
                                value={email}
                                onValueChange={(value) => setEmail(value || '')}
                                validationState={emailValidationState}
                                errorMessage={emailValidationState === 'invalid' && genericErrorMessage}
                            />
                            {!isLogin && (
                                <Input
                                    isRequired
                                    label="Username"
                                    description={!isLogin && 'A display name that other players can see. Does not need to be unique.'}
                                    type="text"
                                    value={username}
                                    onValueChange={(value) => setUsername(value || '')}
                                    validationState={usernameValidationState}
                                    errorMessage={usernameValidationState === 'invalid' && genericErrorMessage}
                                />
                            )}
                            <Input
                                isRequired
                                label="Password"
                                type={isPasswordVisible ? 'text' : 'password'}
                                endContent={(
                                    <PasswordVisibilityToggle
                                        isVisible={isPasswordVisible}
                                        toggleVisibility={togglePasswordVisibility}
                                    />
                                )}
                                value={password}
                                onValueChange={(value) => setPassword(value || '')}
                                validationState={passwordValidationState}
                                errorMessage={passwordValidationState === 'invalid' && genericErrorMessage}
                            />
                            {!isLogin && (
                                <Input
                                    isRequired
                                    label="Confirm Password"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    endContent={(
                                        <PasswordVisibilityToggle
                                            isVisible={isPasswordVisible}
                                            toggleVisibility={togglePasswordVisibility}
                                        />
                                    )}
                                    value={passwordConfirmation}
                                    onValueChange={(value) => setPasswordConfirmation(value || '')}
                                    validationState={passwordConfirmationValidationState}
                                    errorMessage={passwordConfirmationValidationState === 'invalid' && genericErrorMessage}
                                />
                            )}
                        </ModalBody>

                        <ModalFooter className="flex flex-col gap-4">

                            <Button
                                className="text-xs font-normal text-default-400"
                                onClick={() => setIsLogin((state) => !state)}
                                size="sm"
                                variant="light"
                            >
                                {switchFormText}
                            </Button>

                            <div className="flex justify-between">
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={submit}>
                                    Submit
                                </Button>
                            </div>

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;
