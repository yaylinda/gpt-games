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
import { CreateGameInput } from '@/components/games/types';
import { FieldRules } from '@/hooks/useFormFields';
import { AuthInput } from '@/components/auth/types';
import { AUTH_ERROR_MESSAGES, GENERIC_ERROR_MESSAGE } from '@/_common/constants';

const getInitialInput = (): AuthInput => ({
    name: '',
    type: null,
    isMultiplayer: false,
    participants: [],
});

const getRules = (): FieldRules<AuthInput> => ({
    name: [
        {
            rule: (v) => !!v,
            message: 'Required',
        },
        {
            rule: (v) => siteConfig.regex.username.test(v),
            message: `${siteConfig.regex.username}`,
        },
    ],
});

const AuthModal = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const [isLogin, setIsLogin] = React.useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

    const [genericErrorMessage, setGenericErrorMessage] = React.useState('');
    const [authErrorMessage, setAuthErrorMessage] = React.useState('');

    const title = isLogin ? 'Log In' : 'Sign Up';
    const switchFormText = isLogin
        ? "Don't have an account yet? Sign Up!"
        : 'Already have an account? Log In!';

    const togglePasswordVisibility = () => setIsPasswordVisible((state) => !state);

    const emailValidationState = React.useMemo(() => {
        if (email === '') return undefined;
        return siteConfig.regex.email.test(email) ? 'valid' : 'invalid';
    }, [email]);

    const usernameValidationState = React.useMemo(() => {
        if (isLogin) return 'valid';
        if (username === '') return undefined;
        return siteConfig.regex.username.test(username) ? 'valid' : 'invalid';
    }, [isLogin, username]);

    const passwordValidationState = React.useMemo(() => {
        if (password === '') return undefined;
        return password.length >= MIN_PASSWORD_LENGTH ? 'valid' : 'invalid';
    }, [password]);

    const passwordConfirmationValidationState = React.useMemo(() => {
        if (isLogin) return 'valid';
        if (password === '' || passwordConfirmation === '') return undefined;
        return password === passwordConfirmation ? 'valid' : 'invalid';
    }, [isLogin, password, passwordConfirmation]);

    const afterClose = () => {
        setIsLogin(true);
        setAuthErrorMessage('');
        setPassword('');
        setIsPasswordVisible(false);
        setUsername('');
        setEmail('');
        setPasswordConfirmation('');
        setGenericErrorMessage('');
    };

    const handleSignUp = async () => {
        console.log('signing up...');

        const userMetadata: UserMetadata = {
            username,
            discriminator: generateDiscriminator(),
            platform: 'gpt-games',
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
        console.log('signing in...');
        return await supabase.auth.signInWithPassword({
            email,
            password,
        });
    };

    const submit = async () => {
        console.log('******** SUBMITTING!!!!');
        setAuthErrorMessage('');

        if (
            ![
                emailValidationState,
                usernameValidationState,
                passwordValidationState,
                passwordConfirmationValidationState,
            ].every((v) => v === 'valid')
        ) {
            console.log('something is invalid, cannot submit');
            setGenericErrorMessage('Oops! Please fix!');
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
            onSubmit={submit}
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
                value={email}
                onValueChange={(value) => setEmail(value || '')}
                validationState={emailValidationState}
                errorMessage={emailValidationState === 'invalid' && genericErrorMessage}
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
                    value={username}
                    onValueChange={(value) => setUsername(value || '')}
                    validationState={usernameValidationState}
                    errorMessage={usernameValidationState === 'invalid' && genericErrorMessage}
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
                errorMessage={passwordValidationState === 'invalid' && genericErrorMessage}
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
                        passwordConfirmationValidationState === 'invalid' && genericErrorMessage
                    }
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
