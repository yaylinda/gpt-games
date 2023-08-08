'use client';

import NewChatModal from '@/components/chats/NewChatModal';
import FriendsSection from '@/components/friends/FriendsSection';
import NewFriendModal from '@/components/friends/NewFriendModal';
import useFriendStore from '@/components/friends/store';
import { FriendRow } from '@/components/friends/types';
import GamesSection from '@/components/games/GamesSection';
import NewGameModal from '@/components/games/NewGameModal';
import Section from '@/components/section/Section';
import useProfileStore from '@/components/users/store';
import { ProfileRow } from '@/components/users/types';
import { DialogType, Tables } from '@/types';
import { Database } from '@/types/db';
import { Spacer } from '@nextui-org/spacer';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';

const ClientApp = ({ userId }: { userId: string }) => {
    const supabase = createClientComponentClient<Database>();

    const { upsertProfile, init: initProfileStore } = useProfileStore();
    const { upsertFriends, init: initFriendStore } = useFriendStore();

    React.useEffect(() => {
        if (!userId) {
            return;
        }

        initProfileStore(userId, supabase);
        initFriendStore(userId, supabase);

        console.log(`[ClientApp][useEffect] subscribing on channel='user_${userId}'`);

        const userSubscriptions = supabase
            .channel(`user_${userId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: Tables.PROFILES,
                    filter: `id=eq.${userId}`,
                },
                (payload) => {
                    upsertProfile(payload.new as ProfileRow);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: Tables.CHATS,
                },
                (payload) => {
                    // upsertChat(payload.new as Chats);
                    console.log(
                        `[chatsStore][upsertChat] got chat insert, but temporarily disabled`
                    );
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: Tables.CHATS,
                },
                (payload) => {
                    // upsertChat(payload.new as Chats);
                    console.log(
                        `[chatsStore][upsertChat] got chat insert, but temporarily disabled`
                    );
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: Tables.FRIENDS,
                },
                (payload) => upsertFriends(payload.new as FriendRow)
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: Tables.FRIENDS,
                },
                (payload) => upsertFriends(payload.new as FriendRow)
            )
            .subscribe();

        return () => {
            `[ClientApp][useEffect] UN-subscribing on channel='user_${userId}'`;
            supabase.removeChannel(userSubscriptions);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <>
            <Section color="success" titleText="Games" dialogType={DialogType.NEW_GAME}>
                <GamesSection />
            </Section>
            <Spacer y={10} />
            <Section color="primary" titleText="Chats" dialogType={DialogType.NEW_CHAT} />
            <Spacer y={10} />
            <Section color="danger" titleText="Friends" dialogType={DialogType.NEW_FRIEND}>
                <FriendsSection />
            </Section>
            <NewChatModal />
            <NewFriendModal />
            <NewGameModal />
        </>
    );
};

export default ClientApp;
