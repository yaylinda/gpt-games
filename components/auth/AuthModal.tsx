'use client';

import PasswordVisibilityToggle from '@/components/auth/PasswordVisibilityToggle';
import ModalWrapper from '@/components/_common/ModalWrapper';
import { UserMetadata } from '@/components/users/types';
import { DialogType } from '@/_common/types';
import { generateDiscriminator } from '@/_common/utils';
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
import { Tab, Tabs } from '@nextui-org/tabs';

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
    username: [],
    passwordConfirmation: [],
});

const usernameRule = (isLogin: boolean) => [
    {
        rule: (v?: string) => isLogin || !!v,
        message: 'Required',
    },
    {
        rule: (v?: string) => isLogin || USERNAME_REGEX.test(v || ''),
        message: `${USERNAME_REGEX}`,
    },
];

const passwordConfirmationRule = (isLogin: boolean, password: string) => [
    {
        rule: (v?: string) => isLogin || !!v,
        message: 'Required',
    },
    {
        rule: (v?: string) => isLogin || password === v,
        message: 'Passwords do not match',
    },
];

const AuthModal = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const [selected, setSelected] = React.useState<React.Key>('login');
    const isLogin = selected === 'login';

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible((state) => !state);

    const [authErrorMessage, setAuthErrorMessage] = React.useState('');

    const { getFields, updateField, validate, errors, reset } = useFormFields<AuthInput>(
        getInitialInput(),
        getRules()
    );

    const switchTab = React.useCallback(
        (tabKey: React.Key) => {
            setSelected(tabKey);
            reset();
        },
        [reset]
    );

    const afterClose = React.useCallback(() => {
        setSelected('login');
        setAuthErrorMessage('');
        reset();
    }, [reset]);

    const handleSignUp = React.useCallback(async () => {
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
    }, [getFields, supabase.auth]);

    const handleSignIn = React.useCallback(async () => {
        const { email, password } = getFields();
        console.log('signing in...');
        return await supabase.auth.signInWithPassword({
            email,
            password,
        });
    }, [getFields, supabase.auth]);

    const onSubmit = React.useCallback(async () => {
        const fieldValues = getFields();

        console.log(`onSubmit, fields=${JSON.stringify(fieldValues)}`);

        const isValid = validate({
            username: usernameRule(isLogin),
            passwordConfirmation: passwordConfirmationRule(isLogin, fieldValues.password),
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

        router.refresh();

        return true;
    }, [getFields, handleSignIn, handleSignUp, isLogin, router, validate]);

    const emailInput = React.useMemo(
        () => (
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
                validationState={errors.email ? 'invalid' : 'valid'}
                errorMessage={errors.email}
            />
        ),
        [errors.email, isLogin, updateField]
    );

    const usernameInput = React.useMemo(
        () => (
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
                validationState={errors.username ? 'invalid' : 'valid'}
                errorMessage={errors.username}
            />
        ),
        [errors.username, isLogin, updateField]
    );

    const passwordInput = React.useMemo(
        () => (
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
                validationState={errors.password ? 'invalid' : 'valid'}
                errorMessage={errors.password}
            />
        ),
        [errors.password, isPasswordVisible, updateField]
    );

    const passwordConfirmationInput = React.useMemo(
        () => (
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
                validationState={errors.passwordConfirmation ? 'invalid' : 'valid'}
                errorMessage={errors.passwordConfirmation}
            />
        ),
        [errors.passwordConfirmation, isPasswordVisible, updateField]
    );

    return (
        <ModalWrapper
            type={DialogType.AUTH}
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
            <Tabs
                fullWidth
                radius="full"
                variant="bordered"
                color="primary"
                selectedKey={selected}
                onSelectionChange={switchTab}
            >
                <Tab key="login" title="Login" className="flex flex-col gap-4">
                    {emailInput}
                    {passwordInput}
                </Tab>
                <Tab key="signup" title="Sign Up" className="flex flex-col gap-4">
                    {emailInput}
                    {usernameInput}
                    {passwordInput}
                    {passwordConfirmationInput}
                </Tab>
            </Tabs>
        </ModalWrapper>
    );
};

export default AuthModal;
