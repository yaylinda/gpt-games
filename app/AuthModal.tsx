'use client';

import PasswordVisibilityToggle from '@/app/PasswordVisibilityToggle';
import useStore from '@/app/store';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React from 'react';
import { PiEnvelopeSimpleDuotone, PiPasswordDuotone, PiUserCircleDuotone } from 'react-icons/pi';

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const USERNAME_REGEX = /^[a-zA-Z0-9._-]{4,50}$/;

export const MIN_PASSWORD_LENGTH = 4;

const AuthModal = () => {
    const { isAuthDialogOpen: isOpen, closeAuthDialog: onOpenChange } = useStore();

    const [isLogin, setIsLogin] = React.useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

    const [genericErrorMessage, setGenericErrorMessage] = React.useState('');

    const title = isLogin ? 'Log In' : 'Sign Up';
    const switchFormText = isLogin
        ? "Don't have an account yet? Sign Up!"
        : 'Already have an account? Log In!';

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
        if (
            ![
                emailValidationState,
                usernameValidationState,
                passwordValidationState,
                passwordConfirmationValidationState,
            ].every((v) => v === 'valid')
        ) {
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
                                placeholder="email@email.com"
                                label="Email"
                                labelPlacement="outside"
                                description={
                                    !isLogin &&
                                    'Your email will never be shared with third-parties.'
                                }
                                type="email"
                                startContent={
                                    <PiEnvelopeSimpleDuotone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                value={email}
                                onValueChange={(value) => setEmail(value || '')}
                                validationState={emailValidationState}
                                errorMessage={
                                    emailValidationState === 'invalid' && genericErrorMessage
                                }
                            />
                            {!isLogin && (
                                <Input
                                    isRequired
                                    label="Username"
                                    labelPlacement="outside"
                                    placeholder="cool_user_123"
                                    description={
                                        !isLogin &&
                                        'A display name that other players can see. Does not need to be unique.'
                                    }
                                    type="text"
                                    startContent={
                                        <PiUserCircleDuotone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    value={username}
                                    onValueChange={(value) => setUsername(value || '')}
                                    validationState={usernameValidationState}
                                    errorMessage={
                                        usernameValidationState === 'invalid' && genericErrorMessage
                                    }
                                />
                            )}
                            <Input
                                isRequired
                                label="Password"
                                labelPlacement="outside"
                                placeholder={isPasswordVisible ? 'password' : '********'}
                                type={isPasswordVisible ? 'text' : 'password'}
                                startContent={
                                    <PiPasswordDuotone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                endContent={
                                    <PasswordVisibilityToggle
                                        isVisible={isPasswordVisible}
                                        toggleVisibility={togglePasswordVisibility}
                                    />
                                }
                                value={password}
                                onValueChange={(value) => setPassword(value || '')}
                                validationState={passwordValidationState}
                                errorMessage={
                                    passwordValidationState === 'invalid' && genericErrorMessage
                                }
                            />
                            {!isLogin && (
                                <Input
                                    isRequired
                                    label="Confirm Password"
                                    labelPlacement="outside"
                                    placeholder={isPasswordVisible ? 'password' : '********'}
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    startContent={
                                        <PiPasswordDuotone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    endContent={
                                        <PasswordVisibilityToggle
                                            isVisible={isPasswordVisible}
                                            toggleVisibility={togglePasswordVisibility}
                                        />
                                    }
                                    value={passwordConfirmation}
                                    onValueChange={(value) => setPasswordConfirmation(value || '')}
                                    validationState={passwordConfirmationValidationState}
                                    errorMessage={
                                        passwordConfirmationValidationState === 'invalid' &&
                                        genericErrorMessage
                                    }
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
