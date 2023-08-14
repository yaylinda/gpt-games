'use client';

import useClientStore from '@/components/client/store';
import { UserMetadata } from '@/components/users/types';
import { DialogType } from '@/_common/types';
import { Avatar } from '@nextui-org/avatar';
import { Dropdown, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Button, DropdownItem } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/gotrue-js';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { PiUserCircleDuotone } from 'react-icons/pi';

interface NavbarProps {
    session: Session | null;
}

export const Navbar = ({ session }: NavbarProps) => {
    const router = useRouter();

    const { openDialog } = useClientStore();

    const supabase = createClientComponentClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    console.log(`[Navbar] session=${JSON.stringify(session)}`);

    return (
        <NextUINavbar position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold">GPT Games</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
                {session ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name={(session.user.user_metadata as UserMetadata).username}
                                size="sm"
                                icon={<PiUserCircleDuotone />}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem className="gap-2">
                                <span className="flex flex-row">
                                    <p className="font-semibold">
                                        {(session.user.user_metadata as UserMetadata).username}
                                    </p>
                                    <p className="font-semibold text-default-500">
                                        #
                                        {(session.user.user_metadata as UserMetadata).discriminator}
                                    </p>
                                </span>
                                <p className="font-normal text-default-500">{session.user.email}</p>
                            </DropdownItem>
                            <DropdownItem onClick={handleSignOut}>
                                <p className="font-semibold text-danger">Log Out</p>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <NavbarItem className="md:flex">
                        <Button
                            color="primary"
                            variant="ghost"
                            onClick={() => openDialog(DialogType.AUTH)}
                        >
                            Log In
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </NextUINavbar>
    );
};
