import NewChatModal from '@/components/chats/NewChatModal';
import FriendsSection from '@/components/friends/FriendsSection';
import NewFriendModal from '@/components/friends/NewFriendModal';
import GamesSection from '@/components/games/GamesSection';
import NewGameModal from '@/components/games/NewGameModal';
import { subtitle, title } from '@/components/primitives';
import Section from '@/components/section/Section';
import { DialogType } from '@/types';
import { Database } from '@/types/db';
import { Spacer } from '@nextui-org/spacer';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
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
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="flex flex-col max-w-lg text-center justify-center gap-4">
                <span>
                    <h1 className={title()}>Play&nbsp;</h1>
                    <h1 className={title({ color: 'success' })}>games</h1>
                </span>

                <span>
                    <h1 className={title()}>&&nbsp;</h1>
                    <h1 className={title({ color: 'primary' })}>chat</h1>
                </span>

                <span>
                    <h1 className={title()}>w/&nbsp;</h1>
                    <h1 className={title({ color: 'danger' })}>friends</h1>
                </span>

                <span className="mt-4">
                    <h2 className={subtitle()}>Powered by&nbsp;</h2>
                    <h2 className={subtitle({ color: 'secondary' })}>GPT</h2>
                </span>
            </div>
        </section>
    );
}
