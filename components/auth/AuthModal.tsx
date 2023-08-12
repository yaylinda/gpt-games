'use client';

import PasswordVisibilityToggle from '@/components/auth/PasswordVisibilityToggle';
import ModalWrapper from '@/components/_common/ModalWrapper';
import { UserMetadata } from '@/components/users/types';
import { DialogType } from '@/_common/types';
import { generateDiscriminator } from '@/_common/utils';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';
import { PiEnvelopeSimpleDuotone, PiPasswordDuotone, PiUserCircleDuotone } from 'react-icons/pi';
import useFormFields, { FieldRules } from '@/hooks/useFormFields';
import { AuthInput } from '@/components/auth/types';
import {
    APP_PLATFORM,
    AUTH_ERROR_MESSAGES,
    EMAIL_REGEX,
    GENERIC_ERROR_MESSAGE,
    MIN_PASSWORD_LENGTH,
    USERNAME_REGEX,
} from '@/_common/constants';

const getInitialInput = (): AuthInput => ({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
});

const getRules = (): FieldRules<AuthInput> => ({
    email: [
        {
            rule: (v) => !!v,
            message: 'Required',
        },
        {
            rule: (v) => EMAIL_REGEX.test(v),
            message: `${EMAIL_REGEX}`,
        },
    ],
    username: [
        {
            rule: (v) => !!v,
            message: 'Required',
        },
        {
            rule: (v) => USERNAME_REGEX.test(v),
            message: `${USERNAME_REGEX}`,
        },
    ],
    password: [
        {
            rule: (v) => !!v,
            message: 'Required',
        },
        {
            rule: (v) => v.length >= MIN_PASSWORD_LENGTH,
            message: `Must be ${MIN_PASSWORD_LENGTH} characters for longer`,
        },
    ],
    passwordConfirmation: [],
});

const passwordConfirmationRule = (isLogin: boolean, password: string) => ({
    rule: (v: string) => isLogin || password === v,
    message: 'Passwords do not match',
});

const AuthModal = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const [isLogin, setIsLogin] = React.useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const [authErrorMessage, setAuthErrorMessage] = React.useState('');

    const title = isLogin ? 'Log In' : 'Sign Up';
    const switchFormText = isLogin
        ? "Don't have an account yet? Sign Up!"
        : 'Already have an account? Log In!';

    const togglePasswordVisibility = () => setIsPasswordVisible((state) => !state);

    const { getFields, updateField, validate, errors } = useFormFields<AuthInput>(
        getInitialInput(),
        getRules()
    );

    const afterClose = () => {
        // TODO
    };

    const handleSignUp = async () => {
        const { username, email, password } = getFields();
        console.log('signing up...');

        const userMetadata: UserMetadata = {
            username,
            discriminator: generateDiscriminator(),
            platform: APP_PLATFORM,
        };

        return await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                data: userMetadata,
            },
        });
    };

    const handleSignIn = async () => {
        const { email, password } = getFields();
        console.log('signing in...');
        return await supabase.auth.signInWithPassword({
            email,
            password,
        });
    };

    const onSubmit = async () => {
        const fieldValues = getFields();

        console.log(`onSubmit, fields=${JSON.stringify(fieldValues)}`);

        const isValid = validate({
            passwordConfirmation: [passwordConfirmationRule(isLogin, fieldValues.password)],
        });

        if (!isValid) {
            return false;
        }

        const { error } = isLogin ? await handleSignIn() : await handleSignUp();

        if (error) {
            console.log(`**** errorrrr: ${JSON.stringify(error)}`);

            setAuthErrorMessage(AUTH_ERROR_MESSAGES[error.message] || GENERIC_ERROR_MESSAGE);

            return false;
        }

        // TODO - reset state variables
        // TODO - on signup, show banner/alert for user to confirm email
        // TODO - on login, show banner/alert for successful login

        router.refresh();

        return true;
    };

    return (
        <ModalWrapper
            type={DialogType.AUTH}
            headerText={title}
            color="primary"
            onSubmit={onSubmit}
            response={
                authErrorMessage
                    ? {
                          success: false,
                          message: authErrorMessage,
                      }
                    : undefined
            }
            afterClose={afterClose}
        >
            <Input
                isRequired
                placeholder="email@email.com"
                label="Email"
                labelPlacement="outside"
                description={!isLogin && 'Your email will never be shared with third-parties.'}
                type="email"
                startContent={
                    <PiEnvelopeSimpleDuotone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                onValueChange={(value) => updateField('email', value || '')}
                validationState={errors['email'] ? 'invalid' : 'valid'}
                errorMessage={errors['email']}
            />
            {!isLogin && (
                <Input
                    isRequired
                    label="Username"
                    labelPlacement="outside"
                    placeholder="cool_user_123"
                    description={!isLogin && 'A display name that other players can see.'}
                    type="text"
                    startContent={
                        <PiUserCircleDuotone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    onValueChange={(value) => updateField('username', value || '')}
                    validationState={errors['username'] ? 'invalid' : 'valid'}
                    errorMessage={errors['username']}
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
                onValueChange={(value) => updateField('password', value || '')}
                validationState={errors['password'] ? 'invalid' : 'valid'}
                errorMessage={errors['password']}
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
                    onValueChange={(value) => updateField('passwordConfirmation', value || '')}
                    validationState={errors['passwordConfirmation'] ? 'invalid' : 'valid'}
                    errorMessage={errors['passwordConfirmation']}
                />
            )}

            <Button
                className="text-xs font-normal text-default-400"
                onClick={() => setIsLogin((state) => !state)}
                size="sm"
                variant="light"
            >
                {switchFormText}
            </Button>
        </ModalWrapper>
    );
};

export default AuthModal;
