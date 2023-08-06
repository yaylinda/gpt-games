'use client';

import useStore from '@/app/store';
import {Avatar} from '@nextui-org/avatar';
import {Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem,} from '@nextui-org/navbar';
import {Button} from '@nextui-org/react';
import NextLink from 'next/link';
import {PiUserCircleDuotone} from 'react-icons/pi';

export const Navbar = () => {

    const {isLoggedIn, openAuthDialog} = useStore();

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold">GPT Games</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="md:flex">
                    {isLoggedIn ? (
                        <Avatar icon={<PiUserCircleDuotone/>}/>
                        // TODO - show menu options when clicking on user avatar
                    ) : (
                        <Button color="primary" onClick={openAuthDialog}>
                            Log In
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
};
